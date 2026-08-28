// =====================================================================
// /api/admin-login — проверяет общий пароль врача/администратора.
// При успехе сохраняет Telegram-аккаунт вошедшего в таблицу
// staff_telegram — именно этим людям будут приходить уведомления
// о новых записях на приём (см. api/book.js).
//
// Защита от подбора пароля: если один и тот же Telegram-аккаунт
// ошибся с паролем 5 раз подряд за последние 15 минут — временно
// блокируем попытки для этого аккаунта.
// =====================================================================

const { createClient } = require("@supabase/supabase-js");
const { verifyTelegramWebAppData } = require("../lib/verify-telegram");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 15;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { password, initData } = req.body;

    // Сначала проверяем Telegram — без этого мы вообще не знаем, кого
    // ограничивать по попыткам.
    const tgUser = verifyTelegramWebAppData(initData, process.env.TELEGRAM_BOT_TOKEN);
    if (!tgUser) {
      res.status(401).json({ error: "Не удалось подтвердить пользователя Telegram" });
      return;
    }

    const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("admin_login_attempts")
      .select("id", { count: "exact", head: true })
      .eq("telegram_user_id", tgUser.id)
      .gte("attempted_at", windowStart);

    if ((count || 0) >= MAX_ATTEMPTS) {
      res.status(429).json({ error: `Слишком много неверных попыток. Попробуйте снова через ${WINDOW_MINUTES} минут.` });
      return;
    }

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      await supabase.from("admin_login_attempts").insert({ telegram_user_id: tgUser.id });
      res.status(401).json({ error: "Неверный пароль" });
      return;
    }

    await supabase
      .from("staff_telegram")
      .upsert({ telegram_user_id: tgUser.id, name: [tgUser.first_name, tgUser.last_name].filter(Boolean).join(" ") });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("admin-login.js error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
