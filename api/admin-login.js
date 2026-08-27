// =====================================================================
// /api/admin-login — проверяет общий пароль врача/администратора.
// При успехе сохраняет Telegram-аккаунт вошедшего в таблицу
// staff_telegram — именно этим людям будут приходить уведомления
// о новых записях на приём (см. api/book.js).
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
    const { password, initData } = req.body;

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      res.status(401).json({ error: "Неверный пароль" });
      return;
    }

    const tgUser = verifyTelegramWebAppData(initData, process.env.TELEGRAM_BOT_TOKEN);
    if (!tgUser) {
      res.status(401).json({ error: "Не удалось подтвердить пользователя Telegram" });
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
