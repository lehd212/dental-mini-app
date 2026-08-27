// =====================================================================
// /api/config — отдаёт фронтенду и ассистенту актуальные данные клиники
// (адрес, телефоны, часы, цены на услуги) и список заблокированных
// врачами слотов времени. Источник правды — таблица clinic_settings в
// Supabase, редактируемая из "Кабинета врача" в приложении. Если строка
// в базе ещё не создана (первый запуск) — отдаются значения по умолчанию
// из lib/clinic-config.js.
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

    const { data: blocked } = await supabase.from("blocked_slots").select("doctor_id, slot_date, slot_time");
    const blockedSlots = {};
    (blocked || []).forEach((b) => {
      blockedSlots[`${b.doctor_id}__${b.slot_date}__${b.slot_time}`] = true;
    });

    res.status(200).json({ settings, blockedSlots });
  } catch (err) {
    console.error("config.js error:", err);
    res.status(200).json({ settings: defaults(), blockedSlots: {} });
  }
};
