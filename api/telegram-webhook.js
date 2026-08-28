// =====================================================================
// /api/telegram-webhook — Telegram присылает сюда каждое новое сообщение,
// написанное боту напрямую (не внутри мини-приложения). Мы реагируем
// только на команду /start — присылаем приветствие на русском и
// узбекском с краткой информацией о клинике и кнопкой, открывающей
// мини-приложение.
//
// Это отдельный, редко меняющийся файл — большую часть времени вам
// не нужно будет сюда заходить.
// =====================================================================

const { createClient } = require("@supabase/supabase-js");
const defaultConfig = require("../lib/clinic-config");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function getSettings() {
  try {
    const { data } = await supabase.from("clinic_settings").select("data").eq("id", 1).single();
    if (data?.data) return data.data;
  } catch (e) {
    // используем значения по умолчанию ниже
  }
  return {
    address: defaultConfig.address,
    phones: defaultConfig.phones,
    hours: defaultConfig.hours,
    lunch: defaultConfig.lunch,
  };
}

function buildWelcomeText(cfg) {
  const phones = (cfg.phones || []).join(", ");
  return `👋 Добро пожаловать в клинику Dr. Radjabov!

🦷 Стоматология для пациентов от 12 лет
📍 ${cfg.address}
📞 ${phones}
🕐 ${cfg.hours}, ${cfg.lunch}

Нажмите кнопку ниже, чтобы открыть приложение — там можно:
• Задать вопрос ИИ-ассистенту
• Узнать цены на услуги
• Записаться на приём

────────────────

👋 Dr. Radjabov klinikasiga xush kelibsiz!

🦷 12 yoshdan katta bemorlar uchun stomatologiya
📍 ${cfg.address}
📞 ${phones}
🕐 ${cfg.hours}, ${cfg.lunch}

Ilovani ochish uchun quyidagi tugmani bosing — u yerda siz:
• AI-yordamchiga savol berishingiz mumkin
• Xizmatlar narxini bilib olishingiz mumkin
• Qabulga yozilishingiz mumkin`;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(200).json({ ok: true }); // Telegram может дёргать GET при проверке — просто отвечаем ok
    return;
  }

  // Проверяем секретный токен, который Telegram присылает в заголовке —
  // подтверждает, что запрос действительно от Telegram, а не от кого попало.
  const secretHeader = req.headers["x-telegram-bot-api-secret-token"];
  if (secretHeader !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const update = req.body;
    const message = update?.message;
    const text = message?.text || "";
    const chatId = message?.chat?.id;

    if (chatId && text.startsWith("/start")) {
      const cfg = await getSettings();
      const welcomeText = buildWelcomeText(cfg);
      const appUrl = process.env.APP_URL || "https://dental-mini-app.vercel.app";

      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: welcomeText,
          reply_markup: {
            inline_keyboard: [[{ text: "Открыть приложение / Ilovani ochish", web_app: { url: appUrl } }]],
          },
        }),
      });
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("telegram-webhook.js error:", err);
    res.status(200).json({ ok: true }); // Telegram не должен получать ошибку — просто логируем
  }
};
