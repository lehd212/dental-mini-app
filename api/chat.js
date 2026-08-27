// =====================================================================
// /api/chat — принимает сообщения из мини-приложения и обращается
// к нейросети Google Gemini. Системный промт строится из настроек
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
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "messages is required" });
      return;
    }

    const cfg = await getSettings();
    const systemPrompt = defaultConfig.systemPromptTemplate(cfg);

    const geminiContents = messages.slice(-20).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: geminiContents,
          generationConfig: { maxOutputTokens: 800, thinkingConfig: { thinkingBudget: 0 } },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      res.status(502).json({ error: "AI service error" });
      return;
    }

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Извините, не получилось сформировать ответ.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("chat.js error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
