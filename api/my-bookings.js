// =====================================================================
// /api/my-bookings — возвращает список предстоящих записей текущего
// пациента (определяется по его Telegram-аккаунту через initData).
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
    const { initData } = req.body;
    const tgUser = verifyTelegramWebAppData(initData, process.env.TELEGRAM_BOT_TOKEN);
    if (!tgUser) {
      res.status(401).json({ error: "Не удалось подтвердить пользователя Telegram" });
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("telegram_user_id", tgUser.id)
      .eq("status", "confirmed")
      .gte("appointment_date", today)
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true });

    if (error) throw error;

    res.status(200).json({ bookings: data || [] });
  } catch (err) {
    console.error("my-bookings.js error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
