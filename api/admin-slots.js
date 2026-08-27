// =====================================================================
// /api/admin-slots — закрыть или открыть конкретное время у врача
// (например, если врач заболел или уехал). Защищено паролем.
// =====================================================================

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { password, doctorId, date, time, action } = req.body; // action: "block" | "unblock"

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      res.status(401).json({ error: "Неверный пароль" });
      return;
    }
    if (!doctorId || !date || !time || !["block", "unblock"].includes(action)) {
      res.status(400).json({ error: "Некорректные данные" });
      return;
    }

    if (action === "block") {
      const { error } = await supabase
        .from("blocked_slots")
        .upsert({ doctor_id: doctorId, slot_date: date, slot_time: time }, { onConflict: "doctor_id,slot_date,slot_time" });
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("blocked_slots")
        .delete()
        .match({ doctor_id: doctorId, slot_date: date, slot_time: time });
      if (error) throw error;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("admin-slots.js error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
