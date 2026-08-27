// =====================================================================
// /api/chat — принимает сообщения из мини-приложения и обращается
// к нейросети Google Gemini (бесплатный тариф, без банковской карты).
// Ключ GEMINI_API_KEY хранится только на сервере (в настройках Vercel),
// поэтому его нельзя украсть из браузера.
// =====================================================================

const clinicConfig = require("../lib/clinic-config");

module.exports = async (req, res) => {
  // Разрешаем запросы только методом POST
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

    const systemPrompt = clinicConfig.systemPromptTemplate(clinicConfig);

    // Gemini использует немного другой формат сообщений: role "model"
    // вместо "assistant", и текст оборачивается в массив parts.
    const geminiContents = messages.slice(-20).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: geminiContents,
          generationConfig: { maxOutputTokens: 500 },
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
