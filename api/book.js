// =====================================================================
// /api/book — принимает данные формы записи, проверяет, что запрос
// реально пришёл из Telegram (initData), сохраняет запись в Supabase
// и сразу отправляет пациенту подтверждение в Telegram.
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
    const { initData, name, phone, service, doctor: doctorPreference, date, time } = req.body;

    if (!initData || !name || !phone || !service || !date || !time) {
      res.status(400).json({ error: "Заполнены не все поля" });
      return;
    }

    const tgUser = verifyTelegramWebAppData(initData, process.env.TELEGRAM_BOT_TOKEN);
    if (!tgUser) {
      res.status(401).json({ error: "Не удалось подтвердить пользователя Telegram" });
      return;
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        telegram_user_id: tgUser.id,
        telegram_chat_id: tgUser.id, // для личных чатов chat_id совпадает с user_id
        name,
        phone,
        service,
        doctor: doctorPreference || null,
        appointment_date: date, // формат YYYY-MM-DD
        appointment_time: time, // формат HH:MM
        reminder_sent: false,
        status: "confirmed",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      res.status(500).json({ error: "Не удалось сохранить запись" });
      return;
    }

    // Отправляем подтверждение пациенту прямо в Telegram
    const confirmText =
      `✅ Вы записаны!\n\n` +
      `Услуга: ${service}\n` +
      (doctorPreference ? `Врач: ${doctorPreference}\n` : "") +
      `Дата: ${date}\n` +
      `Время: ${time}\n\n` +
      `Если планы изменятся — напишите нам, пожалуйста, заранее.`;

    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: tgUser.id, text: confirmText }),
    });

    // Уведомляем всех врачей/администраторов, которые хотя бы раз
    // заходили в "Кабинет врача" — им приходит сообщение о новой записи
    // сразу в момент, когда пациент записался.
    try {
      const { data: staff } = await supabase.from("staff_telegram").select("telegram_user_id");
      const staffText =
        `🆕 Новая запись на приём\n\n` +
        `Пациент: ${name}\n` +
        `Телефон: ${phone}\n` +
        `Услуга: ${service}\n` +
        (doctorPreference ? `Врач: ${doctorPreference}\n` : "") +
        `Дата: ${date}\n` +
        `Время: ${time}`;

      await Promise.all(
        (staff || []).map((s) =>
          fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: s.telegram_user_id, text: staffText }),
          })
        )
      );
    } catch (notifyErr) {
      // Если уведомление врачу не ушло — это не должно ломать саму запись пациента
      console.error("Staff notify error:", notifyErr);
    }

    res.status(200).json({ success: true, booking: data });
  } catch (err) {
    console.error("book.js error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
