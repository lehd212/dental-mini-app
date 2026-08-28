// =====================================================================
// /api/doctor-cancel-booking — врач отменяет запись пациента (например,
// если у него не оказалось времени). Защищено паролем. Пациенту сразу
// приходит уведомление в Telegram, что приём отменён врачом.
// =====================================================================

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { password, bookingId } = req.body;

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      res.status(401).json({ error: "Неверный пароль" });
      return;
    }
    if (!bookingId) {
      res.status(400).json({ error: "Не указана запись" });
      return;
    }

    const { data: booking, error: fetchErr } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (fetchErr || !booking) {
      res.status(404).json({ error: "Запись не найдена" });
      return;
    }

    const { error: updateErr } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", bookingId);

    if (updateErr) throw updateErr;

    // Уведомляем пациента, что врач отменил его запись
    try {
      const text =
        `❗ К сожалению, ваш приём отменён клиникой\n\n` +
        `Услуга: ${booking.service}\n` +
        (booking.doctor ? `Врач: ${booking.doctor}\n` : "") +
        `Дата: ${booking.appointment_date}\n` +
        `Время: ${booking.appointment_time}\n\n` +
        `Пожалуйста, запишитесь на другое удобное время через приложение. Приносим извинения за неудобства.`;

      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: booking.telegram_chat_id, text }),
      });
    } catch (notifyErr) {
      console.error("Patient notify error:", notifyErr);
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("doctor-cancel-booking.js error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
