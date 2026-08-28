// =====================================================================
// /api/config — отдаёт фронтенду и ассистенту актуальные данные клиники
// (адрес, телефоны, часы, цены на услуги) и список занятых слотов времени.
// Источник правды — таблица clinic_settings в Supabase, редактируемая из
// "Кабинета врача" в приложении. Если строка в базе ещё не создана
// (первый запуск) — отдаются значения по умолчанию из lib/clinic-config.js.
//
// "Занятые" слоты — это объединение двух источников: то, что врач вручную
// закрыл в расписании (blocked_slots), и то, что уже реально забронировано
// пациентами (bookings) — иначе форма записи предлагала бы уже занятое
// время повторно.
// =====================================================================

const { createClient } = require("@supabase/supabase-js");
const defaultConfig = require("../lib/clinic-config");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

function defaults() {
  return {
    clinicName: defaultConfig.clinicName,
    address: defaultConfig.address,
    phones: defaultConfig.phones,
    hours: defaultConfig.hours,
    lunch: defaultConfig.lunch,
    dayOff: defaultConfig.dayOff,
    reminderHoursBefore: defaultConfig.reminderHoursBefore,
    treatments: defaultConfig.treatments,
  };
}

module.exports = async (req, res) => {
  try {
    const { data: settingsRow } = await supabase.from("clinic_settings").select("data").eq("id", 1).single();
    const settings = settingsRow?.data || defaults();

    const blockedSlots = {};

    const { data: blocked } = await supabase.from("blocked_slots").select("doctor_id, slot_date, slot_time");
    (blocked || []).forEach((b) => {
      blockedSlots[`${b.doctor_id}__${b.slot_date}__${b.slot_time}`] = true;
    });

    // Только будущие подтверждённые записи — прошедшие не мешают
    // новым слотам, их можно не учитывать.
    const today = new Date().toISOString().slice(0, 10);
    const { data: booked } = await supabase
      .from("bookings")
      .select("doctor_id, appointment_date, appointment_time")
      .eq("status", "confirmed")
      .gte("appointment_date", today)
      .not("doctor_id", "is", null);

    (booked || []).forEach((b) => {
      blockedSlots[`${b.doctor_id}__${b.appointment_date}__${b.appointment_time}`] = true;
    });

    // Считаем, сколько пациентов уже записано на каждое сочетание
    // дата+время (независимо от врача) — в клинике ограниченное число
    // кресел, и если оно уже занято полностью, слот нужно закрыть
    // у ВСЕХ врачей сразу, а не только у того, к кому уже записались.
    const slotCounts = {};
    (booked || []).forEach((b) => {
      const key = `${b.appointment_date}__${b.appointment_time}`;
      slotCounts[key] = (slotCounts[key] || 0) + 1;
    });
    Object.entries(slotCounts).forEach(([key, count]) => {
      if (count >= defaultConfig.chairsCapacity) {
        const [date, time] = key.split("__");
        defaultConfig.doctors.forEach((d) => {
          blockedSlots[`${d.id}__${date}__${time}`] = true;
        });
      }
    });

    res.status(200).json({ settings, blockedSlots });
  } catch (err) {
    console.error("config.js error:", err);
    res.status(200).json({ settings: defaults(), blockedSlots: {} });
  }
};
