// =====================================================================
// /api/config — отдаёт фронтенду публичные данные о клинике
// (название, услуги, врачи, доступное время), чтобы форма записи
// и шапка приложения не дублировали clinic-config.js вручную.
// =====================================================================

const clinicConfig = require("../lib/clinic-config");

module.exports = async (req, res) => {
  res.status(200).json({
    clinicName: clinicConfig.clinicName,
    clinicDescription: clinicConfig.clinicDescription,
    address: clinicConfig.address,
    phone: clinicConfig.phone,
    workingHours: clinicConfig.workingHours,
    services: clinicConfig.services,
    doctors: clinicConfig.doctors,
    timeSlots: clinicConfig.timeSlots,
  });
};
