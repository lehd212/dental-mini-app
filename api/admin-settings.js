// =====================================================================
// /api/admin-settings — сохраняет отредактированные врачом настройки
// клиники (адрес, телефон, часы работы, цены на услуги, список врачей)
// в таблицу clinic_settings. Защищено паролем.
// =====================================================================

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { password, settings } = req.body;

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      res.status(401).json({ error: "Неверный пароль" });
      return;
    }
    if (!settings || typeof settings !== "object") {
      res.status(400).json({ error: "Некорректные данные настроек" });
      return;
    }

    const { error } = await supabase
      .from("clinic_settings")
      .upsert({ id: 1, data: settings, updated_at: new Date().toISOString() });

    if (error) throw error;

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("admin-settings.js error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
