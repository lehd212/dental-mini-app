// =====================================================================
// /api/remind — вызывается по расписанию внешним планировщиком
// (cron-job.org) каждые 15-30 минут. Находит записи, до которых
// осталось меньше reminderHoursBefore часов и по которым напоминание
// ещё не отправлено, шлёт сообщение в Telegram и помечает как отправленное.
//
// Защищена секретным ключом REMINDER_SECRET, чтобы её не мог вызвать
// кто попало — только наш планировщик, знающий секрет.
// =====================================================================

const { createClient } = require("@supabase/supabase-js");
const clinicConfig = require("../lib/clinic-config");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function getReminderSettings() {
  try {
    const { data } = await supabase.from("clinic_settings").select("data").eq("id", 1).single();
    if (data?.data) {
      return {
        reminderHoursBefore: data.data.reminderHoursBefore ?? clinicConfig.reminderHoursBefore,
        clinicName: data.data.clinicName ?? clinicConfig.clinicName,
        address: data.data.address ?? clinicConfig.address,
      };
    }
  } catch (e) {
    // используем значения по умолчанию ниже
  }
  return {
    reminderHoursBefore: clinicConfig.reminderHoursBefore,
    clinicName: clinicConfig.clinicName,
    address: clinicConfig.address,
  };
}

module.exports = async (req, res) => {
  // Проверка секрета — берём из query-параметра ?secret=...
  if (req.query.secret !== process.env.REMINDER_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const cfg = await getReminderSettings();
    const now = new Date();
    const windowEnd = new Date(now.getTime() + cfg.reminderHoursBefore * 60 * 60 * 1000);

    // Берём неотправленные напоминания по подтверждённым записям
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("reminder_sent", false)
      .eq("status", "confirmed");

    if (error) {
      console.error("Supabase select error:", error);
      res.status(500).json({ error: "DB error" });
      return;
    }

    let sentCount = 0;

    for (const booking of bookings || []) {
      const appointmentDateTime = new Date(`${booking.appointment_date}T${booking.appointment_time}:00`);

      // Напоминаем, если приём попадает в окно (now .. windowEnd) и ещё не прошёл
      if (appointmentDateTime > now && appointmentDateTime <= windowEnd) {
        const text =
          `⏰ Напоминание о приёме!\n\n` +
          `Услуга: ${booking.service}\n` +
          (booking.doctor ? `Врач: ${booking.doctor}\n` : "") +
          `Дата: ${booking.appointment_date}\n` +
          `Время: ${booking.appointment_time}\n\n` +
          `Ждём вас в клинике "${cfg.clinicName}"!\n` +
          `Адрес: ${cfg.address}`;

        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: booking.telegram_chat_id, text }),
        });

        await supabase.from("bookings").update({ reminder_sent: true }).eq("id", booking.id);
        sentCount++;
      }
    }

    res.status(200).json({ checked: (bookings || []).length, remindersSent: sentCount });
  } catch (err) {
    console.error("remind.js error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
