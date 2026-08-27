// =====================================================================
// /api/chat — принимает сообщения из мини-приложения и обращается
// к нейросети Claude (Anthropic). Системный промт строится из настроек
// клиники, хранящихся в Supabase (clinic_settings) — то есть если
// врач поменяет цены в "Кабинете врача", ассистент сразу узнает об этом.
// =====================================================================

const { createClient } = require("@supabase/supabase-js");
const defaultConfig = require("../lib/clinic-config");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function getSettings() {
  try {
    const { data } = await supabase.from("clinic_settings").select("data").eq("id", 1).single();
    if (data?.data) return { ...data.data, doctors: defaultConfig.doctors };
  } catch (e) {
    // упадём на значения по умолчанию ниже
  }
  return {
    clinicName: defaultConfig.clinicName,
    address: defaultConfig.address,
    phones: defaultConfig.phones,
    hours: defaultConfig.hours,
    lunch: defaultConfig.lunch,
    dayOff: defaultConfig.dayOff,
    treatments: defaultConfig.treatments,
    doctors: defaultConfig.doctors,
  };
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { messages } = req.body; // messages: [{role: "user"|"assistant", content: "..."}]

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "messages is required" });
      return;
    }

    const cfg = await getSettings();
    const systemPrompt = defaultConfig.systemPromptTemplate(cfg);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        system: systemPrompt,
        messages: messages.slice(-20), // держим последние 20 сообщений
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      res.status(502).json({ error: "AI service error" });
      return;
    }

    const data = await response.json();
    const textBlock = (data.content || []).find((c) => c.type === "text");
    const reply = textBlock ? textBlock.text : "Извините, не получилось сформировать ответ.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("chat.js error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
