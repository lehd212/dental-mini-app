// =====================================================================
// /api/doctor-bookings — возвращает список предстоящих подтверждённых
// записей к конкретному врачу. Защищено паролем — доступно только
// из "Кабинета врача".
// =====================================================================

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { password, doctorId } = req.body;

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      res.status(401).json({ error: "Неверный пароль" });
      return;
    }
    if (!doctorId) {
      res.status(400).json({ error: "Не указан врач" });
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("doctor_id", doctorId)
      .eq("status", "confirmed")
      .gte("appointment_date", today)
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true });

    if (error) throw error;

    res.status(200).json({ bookings: data || [] });
  } catch (err) {
    console.error("doctor-bookings.js error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
