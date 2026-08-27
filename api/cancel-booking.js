// =====================================================================
// /api/cancel-booking — пациент отменяет свою запись. Проверяем, что
// запись действительно принадлежит этому Telegram-пользователю (иначе
// кто угодно мог бы отменить чужую запись, зная только её id).
// После отмены уведомляем врачей/администраторов.
// =====================================================================

const { createClient } = require("@supabase/supabase-js");
const { verifyTelegramWebAppData } = require("../lib/verify-telegram");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { initData, bookingId } = req.body;
    const tgUser = verifyTelegramWebAppData(initData, process.env.TELEGRAM_BOT_TOKEN);
    if (!tgUser || !bookingId) {
      res.status(401).json({ error: "Не удалось подтвердить пользователя Telegram" });
      return;
    }

    const { data: booking, error: fetchErr } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (fetchErr || !booking || booking.telegram_user_id !== tgUser.id) {
      res.status(403).json({ error: "Запись не найдена или недоступна" });
      return;
    }

    const { error: updateErr } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", bookingId);

    if (updateErr) throw updateErr;

    // Уведомляем персонал клиники об отмене
    try {
      const { data: staff } = await supabase.from("staff_telegram").select("telegram_user_id");
      const text =
        `❌ Пациент отменил запись\n\n` +
        `Пациент: ${booking.name}\n` +
        `Телефон: ${booking.phone}\n` +
        `Услуга: ${booking.service}\n` +
        `Дата: ${booking.appointment_date}\n` +
        `Время: ${booking.appointment_time}`;

      await Promise.all(
        (staff || []).map((s) =>
          fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: s.telegram_user_id, text }),
          })
        )
      );
    } catch (notifyErr) {
      console.error("Cancel notify error:", notifyErr);
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("cancel-booking.js error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
