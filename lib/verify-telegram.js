// =====================================================================
// Проверяет, что initData действительно пришли от Telegram, а не
// подделаны кем-то в браузере. Без этой проверки любой человек мог бы
// отправить запрос на бронирование от чужого имени.
// Алгоритм — официальный, описан в документации Telegram WebApp.
// =====================================================================

const crypto = require("crypto");

function verifyTelegramWebAppData(initData, botToken) {
  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get("hash");
    urlParams.delete("hash");

    const dataCheckArr = [];
    for (const [key, value] of [...urlParams.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
      dataCheckArr.push(`${key}=${value}`);
    }
    const dataCheckString = dataCheckArr.join("\n");

    const secretKey = crypto.createHmac("sha256", "WebAppData").update(botToken).digest();
    const calculatedHash = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");

    if (calculatedHash !== hash) return null;

    const userStr = urlParams.get("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch (err) {
    console.error("verifyTelegramWebAppData error:", err);
    return null;
  }
}

module.exports = { verifyTelegramWebAppData };
