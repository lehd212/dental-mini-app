import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  ArrowLeft,
  Search,
  Bell,
  Menu,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Star,
  Check,
  Send,
  Sparkles,
  User,
  Home as HomeIcon,
  Users,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  Award,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* TOKENS                                                              */
/* ------------------------------------------------------------------ */

const C = {
  bg: "#EAF4FB",
  navyDeep: "#082B4D",
  navy: "#0B3A66",
  navyMid: "#12558A",
  cyan: "#2FC4D9",
  cyanDark: "#1B9FBF",
  cardWhite: "#FFFFFF",
  border: "#DCEAF5",
  textDark: "#0F2A44",
  textMuted: "#6E8CA6",
  female: "#E38FAE",
};

const heroGradient = `linear-gradient(135deg, ${C.navyDeep} 0%, ${C.navy} 45%, ${C.navyMid} 75%, ${C.cyanDark} 130%)`;
const btnGradient = `linear-gradient(90deg, ${C.cyan} 0%, ${C.cyanDark} 100%)`;

/* ------------------------------------------------------------------ */
/* ICON                                                                 */
/* ------------------------------------------------------------------ */

function ToothIcon({ size = 24, color = "#FFFFFF" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2c-2.2 0-3.3 1.1-4.5 1.1C6.1 3.1 5 2 3.6 2 2.1 2 1 3.4 1 5.6c0 3.1.9 5.9 1.6 8.4.6 2.1 1.1 4.1 2.2 6.4.5 1.1 1.1 1.6 1.9 1.6.9 0 1.2-.7 1.5-1.9.3-1.3.6-3.4 1.8-3.4s1.5 2.1 1.8 3.4c.3 1.2.6 1.9 1.5 1.9.8 0 1.4-.5 1.9-1.6 1.1-2.3 1.6-4.3 2.2-6.4.7-2.5 1.6-5.3 1.6-8.4C23 3.4 21.9 2 20.4 2c-1.4 0-2.5 1.1-3.9 1.1C15.3 3.1 14.2 2 12 2z"
        fill={color}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* DATA                                                                 */
/* ------------------------------------------------------------------ */

let CLINIC = {
  name: "Dr. Radjabov",
  fullName: "Стоматологическая клиника Dr. Radjabov",
  city: "г. Самарканд",
  address: "Андижанская улица, 31",
  phones: ["+998 88 001 00 44", "+998 97 911 44 00"],
  hours: "Пн–Сб: 9:00–18:00",
  lunch: "Обед: 12:00–14:00",
  dayOff: "Воскресенье — выходной",
  experience: "Более 15 лет опыта в стоматологии",
};

const TREATMENTS = [
  {
    id: "consult",
    name: "Консультация",
    nameUz: "Konsultatsiya",
    emoji: "💬",
    priceFrom: 0,
    priceTo: 0,
    free: true,
    duration: "20 мин",
    durationUz: "20 daqiqa",
    tagline: "Осмотр и план лечения",
    taglineUz: "Ko'rik va davolash rejasi",
    desc: "Первичный осмотр, диагностика и составление индивидуального плана лечения от нашего врача.",
    descUz: "Shifokorimiz tomonidan birlamchi ko'rik, tashxis va individual davolash rejasini tuzish.",
    keywords: ["консульт", "осмотр", "план лечения"],
  },
  {
    id: "cleaning",
    name: "Чистка зубов",
    nameUz: "Tishlarni tozalash",
    emoji: "🪥",
    priceFrom: 15,
    priceTo: 30,
    duration: "30–45 мин",
    durationUz: "30–45 daqiqa",
    tagline: "Профессиональная гигиена",
    taglineUz: "Professional tozalash",
    desc: "Профессиональная чистка зубов от налёта и зубного камня для здоровья дёсен и свежего дыхания.",
    descUz: "Milk sog'ligi va nafas tozaligi uchun tish plyonkasi va toshini professional tozalash.",
    keywords: ["чистка", "налет", "зубной камень", "гигиена"],
  },
  {
    id: "filling",
    name: "Пломбы",
    nameUz: "Plombalar",
    emoji: "🦷",
    priceFrom: 250,
    priceTo: 500,
    duration: "30–60 мин",
    durationUz: "30–60 daqiqa",
    tagline: "Лечение кариеса",
    taglineUz: "Kariyesni davolash",
    desc: "Лечение кариеса и восстановление формы зуба качественными современными материалами.",
    descUz: "Kariyesni davolash va tishning shaklini sifatli zamonaviy materiallar bilan tiklash.",
    keywords: ["пломб", "кариес", "болит зуб", "дырка"],
  },
  {
    id: "zircon",
    name: "Коронки (цирконий)",
    nameUz: "Tojlar (sirkoniy)",
    emoji: "👑",
    priceFrom: 100,
    priceTo: 120,
    duration: "2 визита",
    durationUz: "2 tashrif",
    tagline: "Прочно и эстетично",
    taglineUz: "Mustahkam va estetik",
    desc: "Циркониевые коронки — прочные, долговечные и неотличимые от натуральных зубов по цвету.",
    descUz: "Sirkoniy tojlar — mustahkam, uzoq muddat xizmat qiladigan va rangi tabiiy tishlardan farq qilmaydigan tojlar.",
    keywords: ["коронк", "цирконий", "циркон"],
  },
  {
    id: "extraction",
    name: "Удаление зуба",
    nameUz: "Tishni olib tashlash",
    emoji: "💉",
    priceFrom: 15,
    priceTo: 20,
    duration: "15–30 мин",
    durationUz: "15–30 daqiqa",
    tagline: "Быстро и без боли",
    taglineUz: "Tez va og'riqsiz",
    desc: "Безболезненное удаление зуба с использованием современной анестезии и щадящих методик.",
    descUz: "Zamonaviy behushlik va ehtiyotkor usullar yordamida tishni og'riqsiz olib tashlash.",
    keywords: ["удал", "вырвать зуб"],
  },
  {
    id: "braces",
    name: "Брекеты",
    nameUz: "Breketlar",
    emoji: "😁",
    priceFrom: 500,
    priceTo: 700,
    duration: "12–24 мес",
    durationUz: "12–24 oy",
    tagline: "Ровный, красивый прикус",
    taglineUz: "Tekis, chiroyli tishlanish",
    desc: "Выравнивание зубного ряда и прикуса с помощью брекет-систем. Подбор системы под ваш бюджет.",
    descUz: "Breket tizimlari yordamida tish qatorini va tishlanishni tekislash. Byudjetingizga mos tizim tanlash.",
    keywords: ["брекет", "прикус", "кривые зубы", "выровнять"],
  },
  {
    id: "implant",
    name: "Имплантация",
    nameUz: "Implantatsiya",
    emoji: "🪛",
    priceFrom: 250,
    priceTo: 350,
    duration: "3–6 мес",
    durationUz: "3–6 oy",
    tagline: "Восстановление зуба",
    taglineUz: "Tishni tiklash",
    desc: "Восстановление утраченного зуба имплантом с надёжной приживаемостью и долгим сроком службы.",
    descUz: "Yo'qolgan tishni ishonchli yopishuvchanlik va uzoq xizmat muddati bilan implant orqali tiklash.",
    keywords: ["имплант", "вставить зуб", "отсутствует зуб"],
  },
  {
    id: "whitening",
    name: "Отбеливание",
    nameUz: "Oqartirish",
    emoji: "✨",
    priceFrom: 120,
    priceTo: 150,
    duration: "45–60 мин",
    durationUz: "45–60 daqiqa",
    tagline: "Белоснежная улыбка",
    taglineUz: "Oppoq tabassum",
    desc: "Профессиональное отбеливание зубов до 6–8 тонов за один визит без вреда для эмали.",
    descUz: "Emalga zarar keltirmasdan bir tashrifda tishlarni 6–8 tongacha professional oqartirish.",
    keywords: ["отбел", "белые зубы", "жёлтые зубы"],
  },
];

const DOCTORS = [
  {
    id: "d1",
    name: "Раджабов Шодмон",
    role: "Главный врач · Хирург-имплантолог",
    roleUz: "Bosh shifokor · Implantolog jarroh",
    experience: "Опыт работы более 15 лет",
    experienceUz: "15 yildan ortiq ish tajribasi",
    phone: "+998 97 911 44 00",
    rating: 4.9,
    reviews: 410,
    initials: "РШ",
  },
  {
    id: "d2",
    name: "Арифджанов Сафо",
    role: "Главный врач",
    roleUz: "Bosh shifokor",
    experience: "Опыт работы более 40 лет",
    experienceUz: "40 yildan ortiq ish tajribasi",
    phone: "+998 90 250 39 13",
    rating: 5.0,
    reviews: 520,
    initials: "АС",
  },
  {
    id: "d3",
    name: "Арифджанова Юлдуз",
    role: "Дентист",
    roleUz: "Stomatolog",
    experience: "Опыт работы более 7 лет",
    experienceUz: "7 yildan ortiq ish tajribasi",
    phone: "+998 97 920 00 44",
    rating: 4.8,
    reviews: 150,
    initials: "АЮ",
  },
];

/* ------------------------------------------------------------------ */
/* LANGUAGE / i18n                                                      */
/* ------------------------------------------------------------------ */

let LANG = "ru"; // "ru" | "uz" — меняется через LanguageSelectScreen / профиль

// L(объект, поле) — берёт локализованное поле у услуги/врача (name/nameUz и т.д.)
function L(obj, field) {
  if (!obj) return "";
  if (LANG === "uz" && obj[field + "Uz"]) return obj[field + "Uz"];
  return obj[field] || "";
}

// S(ключ) — статичная UI-строка (кнопки, заголовки, подписи)
const STRINGS = {
  ru: {
    chooseLangTitle: "Выберите язык",
    chooseLangSubtitle: "Выберите удобный язык интерфейса. Изменить можно позже в профиле.",
    langRu: "Русский",
    langUz: "O'zbekcha",
    continueBtn: "Продолжить",

    navHome: "Главная",
    navDoctors: "Врачи",
    navAssistant: "AI Ассистент",
    navProfile: "Профиль",

    homeGreetingTitle: "Здоровые зубы.",
    homeGreetingTitle2: "Уверенные улыбки.",
    homeUpcomingVisit: "Ближайший визит",
    homeServicesTitle: "Популярные услуги",
    homeSeeAll: "Все услуги",
    homeDoctorsTitle: "Наши врачи",
    homeBookBtn: "Записаться на приём",

    treatmentsTitle: "Все услуги",
    treatmentAbout: "Об услуге",
    treatmentDuration: "Время",
    treatmentGuarantee: "Гарантия",
    treatmentPrice: "Стоимость",
    treatmentBookBtn: "Записаться на приём",
    treatmentSafe: "Безопасно и эффективно",
    treatmentEquipment: "Современное оборудование",
    treatmentExperts: "Опытные врачи клиники",

    doctorsTitle: "Наши врачи",
    doctorReviews: "отзывов",
    doctorBookBtn: "Записаться",

    bookingTitle: "Запись на приём",
    bookingChooseDoctor: "Выберите врача",
    bookingChooseDate: "Выберите дату",
    bookingChooseTime: "Выберите время",
    bookingVisitCard: "Визит в клинику",
    bookingPhoneLabel: "Ваш телефон",
    bookingPhonePlaceholder: "+998 90 123 45 67",
    bookingPhoneInvalid: "Проверьте номер телефона — похоже, он неполный",
    bookingNameLabel: "Ваше имя",
    bookingNamePlaceholder: "Как к вам обращаться",
    bookingCost: "Стоимость",
    bookingConfirmBtn: "Подтвердить запись",
    bookingSubmitting: "Записываем…",
    bookingNoSlots: "Свободных слотов на этот день нет",

    profileTitle: "Профиль",
    profileMyBookings: "Мои записи",
    profileDoctorCabinet: "Кабинет врача",
    profileLanguage: "Язык приложения",
    profileClinicInfo: "О клинике",
    profileAddress: "Адрес",
    profilePhones: "Телефоны",
    profileHours: "Часы работы",

    myBookingsTitle: "Мои записи",
    myBookingsEmpty: "У вас пока нет предстоящих записей.",
    myBookingsCancelBtn: "Отменить запись",
    myBookingsCancelling: "Отменяем…",
    myBookingsDoctorLabel: "Врач",

    assistantGreeting:
      "Здравствуйте! Я — AI-ассистент клиники Dr. Radjabov 🦷 Расскажите, что вас беспокоит, и я подскажу подходящее лечение, цену и запишу на приём.",
    assistantConcernTooth: "Болит зуб",
    assistantConcernWhitening: "Хочу отбелить зубы",
    assistantConcernBraces: "Интересуют брекеты",
    assistantConcernImplant: "Нужен имплант",
    assistantConcernConsult: "Сколько стоит консультация?",
    assistantInputPlaceholder: "Напишите ваш вопрос…",
    assistantBookHint: "Записаться на приём",
    assistantErrorReply: "Извините, не удалось получить ответ. Попробуйте ещё раз.",
    assistantWhoDoctor: "Отлично! Уточню пару деталей для записи 🙂 К какому врачу вас записать?",
    assistantChooseDay: "Выберите удобный день:",
    assistantChooseTime: "Выберите удобное время:",
    assistantConfirmSummary: "Подтвердите запись:",
    assistantPhonePlaceholder: "Ваш телефон для связи",
    assistantConfirmBtn: "Подтвердить запись",
    assistantDone: (d) => `Готово! Запись подтверждена ✅ Ждём вас ${d.weekday} ${d.day} ${d.month} в ${d.time}. Подтверждение пришло вам в Telegram. Хорошего дня!`,
    assistantPhoneRequired: "Впишите номер телефона для связи",
    assistantNameRequired: "Впишите ваше имя",
    assistantConnError: "Извините, произошла ошибка соединения. Но я всё равно могу помочь с записью на приём 👇",
    assistantBookingTo: (name) => `Записываю к ${name}. Выберите удобный день:`,

    doctorLoginTitle: "Кабинет врача",
    doctorLoginIntro: "Этот раздел только для сотрудников клиники. Введите пароль администратора.",
    doctorLoginPlaceholder: "Пароль",
    doctorLoginBtn: "Войти",
    doctorLoginChecking: "Проверяем…",
    doctorLoginChooseYourself: "Выберите себя из списка, чтобы открыть свой кабинет.",

    panelTitle: "Мой кабинет",
    panelLogout: "Выйти",
    panelTabSchedule: "Расписание",
    panelTabSettings: "Настройки клиники",
    panelUpcoming: "Ближайшая запись к вам",
    panelScheduleHint: "Нажмите на время, чтобы закрыть или открыть слот для записи клиентов.",
    panelSlotClosed: "закрыто",
    panelSlotFree: "свободно",
    panelAddress: "Адрес",
    panelPhones: "Телефоны",
    panelHours: "Часы работы",
    panelLunch: "Обед",
    panelDayOff: "Выходной",
    panelPricesTitle: "Цены на услуги ($)",
    panelSaveBtn: "Сохранить изменения",
    panelSaving: "Сохраняем…",
    panelSaved: "Сохранено ✓",

    errorGeneric: "Ошибка сети. Проверьте подключение и попробуйте снова.",
  },
  uz: {
    chooseLangTitle: "Tilni tanlang",
    chooseLangSubtitle: "Interfeys tilini tanlang. Keyinroq profilda o'zgartirish mumkin.",
    langRu: "Русский",
    langUz: "O'zbekcha",
    continueBtn: "Davom etish",

    navHome: "Bosh sahifa",
    navDoctors: "Shifokorlar",
    navAssistant: "AI Yordamchi",
    navProfile: "Profil",

    homeGreetingTitle: "Sog'lom tishlar.",
    homeGreetingTitle2: "Ishonchli tabassumlar.",
    homeUpcomingVisit: "Yaqin tashrif",
    homeServicesTitle: "Mashhur xizmatlar",
    homeSeeAll: "Barcha xizmatlar",
    homeDoctorsTitle: "Bizning shifokorlar",
    homeBookBtn: "Qabulga yozilish",

    treatmentsTitle: "Barcha xizmatlar",
    treatmentAbout: "Xizmat haqida",
    treatmentDuration: "Vaqt",
    treatmentGuarantee: "Kafolat",
    treatmentPrice: "Narxi",
    treatmentBookBtn: "Qabulga yozilish",
    treatmentSafe: "Xavfsiz va samarali",
    treatmentEquipment: "Zamonaviy jihozlar",
    treatmentExperts: "Klinikaning tajribali shifokorlari",

    doctorsTitle: "Bizning shifokorlar",
    doctorReviews: "sharh",
    doctorBookBtn: "Yozilish",

    bookingTitle: "Qabulga yozilish",
    bookingChooseDoctor: "Shifokorni tanlang",
    bookingChooseDate: "Sanani tanlang",
    bookingChooseTime: "Vaqtni tanlang",
    bookingVisitCard: "Klinikaga tashrif",
    bookingPhoneLabel: "Telefon raqamingiz",
    bookingPhonePlaceholder: "+998 90 123 45 67",
    bookingPhoneInvalid: "Telefon raqamini tekshiring — u to'liq emasga o'xshaydi",
    bookingNameLabel: "Ismingiz",
    bookingNamePlaceholder: "Sizga qanday murojaat qilsak bo'ladi",
    bookingCost: "Narxi",
    bookingConfirmBtn: "Yozilishni tasdiqlash",
    bookingSubmitting: "Yozilmoqda…",
    bookingNoSlots: "Bu kunga bo'sh vaqt yo'q",

    profileTitle: "Profil",
    profileMyBookings: "Mening yozuvlarim",
    profileDoctorCabinet: "Shifokor kabineti",
    profileLanguage: "Ilova tili",
    profileClinicInfo: "Klinika haqida",
    profileAddress: "Manzil",
    profilePhones: "Telefonlar",
    profileHours: "Ish vaqti",

    myBookingsTitle: "Mening yozuvlarim",
    myBookingsEmpty: "Sizda hozircha kelayotgan yozuvlar yo'q.",
    myBookingsCancelBtn: "Yozuvni bekor qilish",
    myBookingsCancelling: "Bekor qilinmoqda…",
    myBookingsDoctorLabel: "Shifokor",

    assistantGreeting:
      "Assalomu alaykum! Men — Dr. Radjabov klinikasining AI-yordamchisiman 🦷 Sizni nima bezovta qilayotganini ayting, men mos davolashni, narxini aytaman va qabulga yozaman.",
    assistantConcernTooth: "Tish og'riyapti",
    assistantConcernWhitening: "Tishlarni oqartirmoqchiman",
    assistantConcernBraces: "Breketlar qiziqtiradi",
    assistantConcernImplant: "Implant kerak",
    assistantConcernConsult: "Konsultatsiya qancha turadi?",
    assistantInputPlaceholder: "Savolingizni yozing…",
    assistantBookHint: "Qabulga yozilish",
    assistantErrorReply: "Kechirasiz, javob olib bo'lmadi. Qaytadan urinib ko'ring.",
    assistantWhoDoctor: "Ajoyib! Yozilish uchun bir nechta detalni aniqlashtiraman 🙂 Qaysi shifokorga yozay?",
    assistantChooseDay: "Qulay kunni tanlang:",
    assistantChooseTime: "Qulay vaqtni tanlang:",
    assistantConfirmSummary: "Yozuvni tasdiqlang:",
    assistantPhonePlaceholder: "Bog'lanish uchun telefon raqamingiz",
    assistantConfirmBtn: "Yozilishni tasdiqlash",
    assistantDone: (d) => `Tayyor! Yozuv tasdiqlandi ✅ Sizni ${d.weekday}, ${d.day} ${d.month} kuni soat ${d.time} da kutamiz. Tasdiqlash Telegram'ga keldi. Yaxshi kun tilaymiz!`,
    assistantPhoneRequired: "Bog'lanish uchun telefon raqamini kiriting",
    assistantNameRequired: "Ismingizni kiriting",
    assistantConnError: "Kechirasiz, ulanishda xatolik yuz berdi. Lekin men baribir qabulga yozilishda yordam bera olaman 👇",
    assistantBookingTo: (name) => `${name} ga yozmoqdaman. Qulay kunni tanlang:`,

    doctorLoginTitle: "Shifokor kabineti",
    doctorLoginIntro: "Bu bo'lim faqat klinika xodimlari uchun. Administrator parolini kiriting.",
    doctorLoginPlaceholder: "Parol",
    doctorLoginBtn: "Kirish",
    doctorLoginChecking: "Tekshirilmoqda…",
    doctorLoginChooseYourself: "O'z kabinetingizni ochish uchun ro'yxatdan o'zingizni tanlang.",

    panelTitle: "Mening kabinetim",
    panelLogout: "Chiqish",
    panelTabSchedule: "Jadval",
    panelTabSettings: "Klinika sozlamalari",
    panelUpcoming: "Sizga yaqin yozuv",
    panelScheduleHint: "Mijozlar yozilishi uchun vaqtni yopish yoki ochish uchun uni bosing.",
    panelSlotClosed: "yopiq",
    panelSlotFree: "bo'sh",
    panelAddress: "Manzil",
    panelPhones: "Telefonlar",
    panelHours: "Ish vaqti",
    panelLunch: "Tushlik",
    panelDayOff: "Dam olish kuni",
    panelPricesTitle: "Xizmatlar narxi ($)",
    panelSaveBtn: "O'zgarishlarni saqlash",
    panelSaving: "Saqlanmoqda…",
    panelSaved: "Saqlandi ✓",

    errorGeneric: "Tarmoq xatosi. Ulanishni tekshirib, qaytadan urinib ko'ring.",
  },
};

function S(key) {
  return STRINGS[LANG]?.[key] ?? STRINGS.ru[key] ?? key;
}



const tg = typeof window !== "undefined" ? window.Telegram?.WebApp : null;

function getTelegramUser() {
  return tg?.initDataUnsafe?.user || null;
}

// Проверяет, похож ли ввод на настоящий номер телефона —
// минимум 9 цифр (без учёта пробелов, скобок, +, тире).
function isValidPhone(phone) {
  const digitsOnly = (phone || "").replace(/\D/g, "");
  return digitsOnly.length >= 9;
}

// Отправляет реальную запись на сервер: сохраняет в базу и присылает
// пациенту подтверждение прямо в Telegram. Возвращает { ok, error }.
async function submitBookingToServer({ treatment, doctor, date, time, phone, name }) {
  const user = getTelegramUser();
  const finalName = (name || "").trim() || (user ? [user.first_name, user.last_name].filter(Boolean).join(" ") : "Пациент");

  try {
    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        initData: tg?.initData || "",
        name: finalName,
        phone,
        service: treatment?.name || "",
        doctor: doctor?.name || "",
        date: date?.key || "",
        time: time || "",
      }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error || "Не удалось создать запись" };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: "Ошибка сети. Проверьте подключение и попробуйте снова." };
  }
}

// Загружает актуальные настройки клиники и заблокированные слоты с
// сервера и подмешивает их в CLINIC/TREATMENTS "на лету" — если врач
// поменял цену или адрес в кабинете, это сразу видно в приложении.
async function loadClinicSettings() {
  try {
    const res = await fetch("/api/config");
    const { settings, blockedSlots } = await res.json();

    if (settings) {
      if (settings.address) CLINIC.address = settings.address;
      if (settings.phones) CLINIC.phones = settings.phones;
      if (settings.hours) CLINIC.hours = settings.hours;
      if (settings.lunch) CLINIC.lunch = settings.lunch;
      if (settings.dayOff) CLINIC.dayOff = settings.dayOff;

      (settings.treatments || []).forEach((st) => {
        const t = TREATMENTS.find((x) => x.id === st.id);
        if (t) {
          t.priceFrom = st.priceFrom;
          t.priceTo = st.priceTo;
          t.free = !!st.free;
        }
      });
    }

    return blockedSlots || {};
  } catch (e) {
    return {};
  }
}

// Вход в кабинет врача по общему паролю. При успехе сервер запоминает
// Telegram-аккаунт вошедшего, чтобы присылать ему уведомления о записях.
async function adminLogin(password) {
  try {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, initData: tg?.initData || "" }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error || "Неверный пароль" };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: "Ошибка сети" };
  }
}

// Закрыть/открыть слот времени у врача (сохраняется на сервере).
async function adminToggleSlot(password, doctorId, date, time, action) {
  try {
    const res = await fetch("/api/admin-slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, doctorId, date, time, action }),
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

// Сохранить отредактированные настройки клиники (адрес/телефоны/часы/цены).
async function adminSaveSettings(password, settings) {
  try {
    const res = await fetch("/api/admin-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, settings }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error || "Не удалось сохранить" };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: "Ошибка сети" };
  }
}

// Получить список предстоящих записей текущего пациента.
async function fetchMyBookings() {
  try {
    const res = await fetch("/api/my-bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData: tg?.initData || "" }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error, bookings: [] };
    return { ok: true, bookings: data.bookings || [] };
  } catch (e) {
    return { ok: false, error: "Ошибка сети", bookings: [] };
  }
}

// Отменить запись пациента.
async function cancelMyBooking(bookingId) {
  try {
    const res = await fetch("/api/cancel-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData: tg?.initData || "", bookingId }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error || "Не удалось отменить запись" };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: "Ошибка сети" };
  }
}

// Сохранить выбор языка на устройстве/аккаунте пациента через Telegram.
function saveLang(lang) {
  LANG = lang;
  tg?.CloudStorage?.setItem("lang", lang);
}



function priceLabel(t) {
  if (t.free) return "Бесплатно";
  if (t.priceFrom === t.priceTo) return `$${t.priceFrom}`;
  return `$${t.priceFrom}–${t.priceTo}`;
}

function getNextDays(count = 5) {
  const days = [];
  let d = new Date();
  while (days.length < count) {
    d = new Date(d.getTime() + 86400000);
    if (d.getDay() !== 0) {
      days.push({
        key: d.toISOString().slice(0, 10),
        weekday: d.toLocaleDateString("ru-RU", { weekday: "short" }),
        day: d.getDate(),
        month: d.toLocaleDateString("ru-RU", { month: "short" }),
      });
    }
  }
  return days;
}

// Слоты через каждые 30 минут (рабочее время 9:00–18:00, без обеда 12:00–14:00).
// Записать на произвольную минуту (например 16:40) нельзя — время привязано
// к слотам, потому что именно по слотам врач закрывает/открывает часы в
// своём кабинете. Если сделать свободный ввод времени, эта функция управления
// расписанием перестанет работать корректно.
const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

function guessTreatment(text) {
  const lower = (text || "").toLowerCase();
  for (const t of TREATMENTS) {
    if (t.id === "consult") continue;
    if (t.keywords.some((k) => lower.includes(k))) return t;
  }
  return null;
}

function guessTreatmentFromMessages(messages) {
  const userText = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" ");
  return guessTreatment(userText) || TREATMENTS[0];
}

/* ------------------------------------------------------------------ */
/* SHARED UI BITS                                                      */
/* ------------------------------------------------------------------ */

function Avatar({ initials, size = 48 }) {
  const bg = "linear-gradient(135deg,#4FC3E8,#1B9FBF)";
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: size * 0.36,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function ScreenHeader({ title, onBack, right }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-3">
      <button
        onClick={onBack}
        className="w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}
      >
        <ArrowLeft size={18} color={C.navy} />
      </button>
      <h1 className="text-base font-bold" style={{ color: C.textDark, fontFamily: "Manrope, sans-serif" }}>
        {title}
      </h1>
      <div className="w-9 h-9 flex items-center justify-center">{right}</div>
    </div>
  );
}

function BottomNav({ screen, navigate }) {
  const items = [
    { id: "home", label: S("navHome"), icon: HomeIcon },
    { id: "doctors", label: S("navDoctors"), icon: Users },
    { id: "assistant", label: S("navAssistant"), icon: Sparkles },
    { id: "profile", label: S("navProfile"), icon: User },
  ];
  return (
    <div
      className="flex items-center justify-around py-2"
      style={{
        background: C.cardWhite,
        borderTop: `1px solid ${C.border}`,
        position: "sticky",
        bottom: 0,
      }}
    >
      {items.map((it) => {
        const active = screen === it.id;
        const Icon = it.icon;
        return (
          <button
            key={it.id}
            onClick={() => navigate(it.id)}
            className="flex flex-col items-center gap-1 px-2 py-1"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: active ? "rgba(47,196,217,0.15)" : "transparent" }}
            >
              <Icon size={19} color={active ? C.cyanDark : C.textMuted} />
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: active ? 700 : 500,
                color: active ? C.cyanDark : C.textMuted,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {it.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HOME SCREEN                                                         */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* LANGUAGE SELECT SCREEN                                               */
/* ------------------------------------------------------------------ */

function LanguageSelectScreen({ onSelect }) {
  const [selected, setSelected] = useState("ru");

  return (
    <div className="flex-1 flex flex-col justify-center px-6" style={{ background: C.bg }}>
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: heroGradient }}>
          <ToothIcon size={30} color="#fff" />
        </div>
      </div>
      <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 21, color: C.navyDeep, textAlign: "center", marginBottom: 6 }}>
        {STRINGS.ru.chooseLangTitle} / {STRINGS.uz.chooseLangTitle}
      </h1>
      <p style={{ fontSize: 12.5, color: C.textMuted, textAlign: "center", marginBottom: 28, fontFamily: "Inter, sans-serif", lineHeight: 1.5 }}>
        {STRINGS.ru.chooseLangSubtitle}
      </p>

      <button
        onClick={() => setSelected("ru")}
        className="w-full py-4 rounded-2xl mb-3 flex items-center justify-center"
        style={{
          background: selected === "ru" ? btnGradient : C.cardWhite,
          border: `1.5px solid ${selected === "ru" ? "transparent" : C.border}`,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 15, color: selected === "ru" ? "#fff" : C.textDark, fontFamily: "Inter, sans-serif" }}>
          Русский
        </span>
      </button>

      <button
        onClick={() => setSelected("uz")}
        className="w-full py-4 rounded-2xl mb-8 flex items-center justify-center"
        style={{
          background: selected === "uz" ? btnGradient : C.cardWhite,
          border: `1.5px solid ${selected === "uz" ? "transparent" : C.border}`,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 15, color: selected === "uz" ? "#fff" : C.textDark, fontFamily: "Inter, sans-serif" }}>
          O'zbekcha
        </span>
      </button>

      <button onClick={() => onSelect(selected)} className="w-full py-3.5 rounded-full" style={{ background: C.navyDeep }}>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "Inter, sans-serif" }}>
          {selected === "ru" ? STRINGS.ru.continueBtn : STRINGS.uz.continueBtn}
        </span>
      </button>
    </div>
  );
}

function HomeScreen({ navigate, appointment, onLangChange }) {
  return (
    <div className="flex-1 overflow-y-auto pb-4">
      <div className="flex items-center justify-between px-5 pt-5">
        <button
          onClick={() => navigate("myBookings")}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}
        >
          <Menu size={17} color={C.navy} />
        </button>
        <div className="flex items-center gap-2">
          <ToothIcon size={20} color={C.cyanDark} />
          <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 18, color: C.navyDeep }}>
            Dr. Radjabov
          </span>
        </div>
        <button
          onClick={() => { saveLang(LANG === "ru" ? "uz" : "ru"); onLangChange?.(); }}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}
        >
          <span style={{ fontSize: 10, fontWeight: 800, color: C.navy, fontFamily: "Inter, sans-serif" }}>
            {LANG === "ru" ? "UZ" : "RU"}
          </span>
        </button>
      </div>

      <div className="px-5 mt-4">
        <div
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{ background: heroGradient }}
        >
          <div className="relative z-10" style={{ maxWidth: "70%" }}>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 21, color: "#fff", lineHeight: 1.2 }}>
              {S("homeGreetingTitle")} {S("homeGreetingTitle2")}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12.5, marginTop: 8, fontFamily: "Inter, sans-serif" }}>
              {LANG === "uz" ? "Samarqandda butun oila uchun professional stomatologiya." : "Профессиональная стоматология для всей семьи в Самарканде."}
            </p>
            <button
              onClick={() => navigate("assistant")}
              className="mt-4 px-4 py-2.5 rounded-full flex items-center gap-1.5"
              style={{ background: btnGradient }}
            >
              <span style={{ color: "#fff", fontSize: 12.5, fontWeight: 700, fontFamily: "Inter, sans-serif" }}>
                {LANG === "uz" ? "Bepul konsultatsiya" : "Бесплатная консультация"}
              </span>
            </button>
          </div>
          <div style={{ position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)", opacity: 0.9 }}>
            <ToothIcon size={110} color="rgba(255,255,255,0.18)" />
          </div>
        </div>
      </div>

      <div className="px-5 mt-4 grid grid-cols-4 gap-2">
        {[
          { label: LANG === "uz" ? "Shifokorlar" : "Врачи", icon: Users, target: "doctors" },
          { label: LANG === "uz" ? "Yozilish" : "Запись", icon: Calendar, target: "booking" },
          { label: LANG === "uz" ? "Xizmatlar" : "Услуги", icon: ToothIconWrap, target: "treatments" },
          { label: LANG === "uz" ? "AI Yordam" : "AI Помощь", icon: Sparkles, target: "assistant" },
        ].map((it, i) => {
          const Icon = it.icon;
          return (
            <button
              key={i}
              onClick={() => navigate(it.target)}
              className="flex flex-col items-center gap-1.5 py-3 rounded-2xl"
              style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}
            >
              <Icon size={18} color={C.cyanDark} />
              <span style={{ fontSize: 10.5, color: C.textDark, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>
                {it.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="px-5 mt-5 flex items-center justify-between">
        <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 14.5, color: C.textDark }}>
          {S("homeUpcomingVisit")}
        </h3>
      </div>
      <div className="px-5 mt-2">
        {appointment ? (
          <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
            <Avatar initials={appointment.doctor.initials} gender={appointment.doctor.gender} size={44} />
            <div className="flex-1">
              <p style={{ fontSize: 13.5, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>
                {appointment.doctor.name}
              </p>
              <p style={{ fontSize: 11.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>
                {L(appointment.treatment, "name")}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Calendar size={11} color={C.cyanDark} />
                <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>
                  {appointment.date.weekday} {appointment.date.day} {appointment.date.month} · {appointment.time}
                </span>
              </div>
            </div>
            <ChevronRight size={16} color={C.textMuted} />
          </div>
        ) : (
          <button
            onClick={() => navigate("assistant")}
            className="w-full rounded-2xl p-4 flex items-center justify-between"
            style={{ background: C.cardWhite, border: `1px dashed ${C.border}` }}
          >
            <span style={{ fontSize: 12.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>
              {LANG === "uz" ? "Hozircha kelayotgan yozuvlar yo'q" : "Пока нет предстоящих записей"}
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.cyanDark, fontFamily: "Inter, sans-serif" }}>
              {S("homeBookBtn")} →
            </span>
          </button>
        )}
      </div>

      <div className="px-5 mt-5 flex items-center justify-between">
        <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 14.5, color: C.textDark }}>
          {S("homeServicesTitle")}
        </h3>
        <button onClick={() => navigate("treatments")} style={{ fontSize: 11.5, color: C.cyanDark, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>
          {S("homeSeeAll")} →
        </button>
      </div>
      <div className="px-5 mt-2 grid grid-cols-3 gap-2.5">
        {TREATMENTS.filter((t) => !t.free).slice(0, 6).map((t) => (
          <button
            key={t.id}
            onClick={() => navigate("treatment", { treatment: t })}
            className="rounded-2xl p-3 flex flex-col items-center gap-1.5"
            style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}
          >
            <span style={{ fontSize: 22 }}>{t.emoji}</span>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: C.textDark, textAlign: "center", fontFamily: "Inter, sans-serif" }}>
              {L(t, "name")}
            </span>
            <span style={{ fontSize: 10, color: C.cyanDark, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>
              {priceLabel(t)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ToothIconWrap(props) {
  return <ToothIcon size={props.size} color={props.color} />;
}

/* ------------------------------------------------------------------ */
/* TREATMENTS LIST SCREEN                                              */
/* ------------------------------------------------------------------ */

function TreatmentsScreen({ navigate }) {
  return (
    <div className="flex-1 overflow-y-auto pb-4">
      <ScreenHeader title={S("treatmentsTitle")} onBack={() => navigate("home")} />
      <div className="px-5 flex flex-col gap-2.5">
        {TREATMENTS.map((t) => (
          <button
            key={t.id}
            onClick={() => navigate("treatment", { treatment: t })}
            className="rounded-2xl p-3.5 flex items-center gap-3"
            style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(47,196,217,0.12)" }}
            >
              <span style={{ fontSize: 20 }}>{t.emoji}</span>
            </div>
            <div className="flex-1 text-left">
              <p style={{ fontSize: 13.5, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>
                {L(t, "name")}
              </p>
              <p style={{ fontSize: 11, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{L(t, "tagline")}</p>
            </div>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: C.cyanDark, fontFamily: "Inter, sans-serif" }}>
              {priceLabel(t)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TREATMENT DETAIL SCREEN                                             */
/* ------------------------------------------------------------------ */

function TreatmentDetailScreen({ treatment, navigate }) {
  if (!treatment) return null;
  return (
    <div className="flex-1 overflow-y-auto flex flex-col">
      <div className="p-5 pb-8 relative overflow-hidden" style={{ background: heroGradient, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("home")}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <ArrowLeft size={18} color="#fff" />
          </button>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.12)", fontSize: 44 }}
          >
            {treatment.emoji}
          </div>
          <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 19, color: "#fff", marginTop: 14 }}>
            {L(treatment, "name")}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, marginTop: 4, fontFamily: "Inter, sans-serif" }}>
            {L(treatment, "tagline")}
          </p>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="rounded-2xl p-4 flex items-center justify-around" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
          <div className="flex flex-col items-center gap-1">
            <Clock size={15} color={C.cyanDark} />
            <span style={{ fontSize: 10.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{L(treatment, "duration")}</span>
          </div>
          <div style={{ width: 1, height: 28, background: C.border }} />
          <div className="flex flex-col items-center gap-1">
            <ShieldCheck size={15} color={C.cyanDark} />
            <span style={{ fontSize: 10.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{S("treatmentGuarantee")}</span>
          </div>
          <div style={{ width: 1, height: 28, background: C.border }} />
          <div className="flex flex-col items-center gap-1">
            <span style={{ fontSize: 13, fontWeight: 800, color: C.textDark, fontFamily: "Inter, sans-serif" }}>
              {priceLabel(treatment)}
            </span>
            <span style={{ fontSize: 10, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{S("treatmentPrice")}</span>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5">
        <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 14, color: C.textDark }}>
          {S("treatmentAbout")}
        </h3>
        <p style={{ fontSize: 12.5, color: C.textMuted, marginTop: 6, lineHeight: 1.6, fontFamily: "Inter, sans-serif" }}>
          {L(treatment, "desc")}
        </p>
        <div className="flex flex-col gap-2 mt-4">
          {[S("treatmentSafe"), S("treatmentEquipment"), S("treatmentExperts")].map((f) => (
            <div key={f} className="flex items-center gap-2">
              <Check size={14} color={C.cyanDark} />
              <span style={{ fontSize: 12.5, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1" />
      <div className="p-5">
        <button
          onClick={() => navigate("booking", { treatment })}
          className="w-full py-3.5 rounded-full flex items-center justify-center gap-2"
          style={{ background: btnGradient }}
        >
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "Inter, sans-serif" }}>
            {S("treatmentBookBtn")}
          </span>
          <ChevronRight size={16} color="#fff" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DOCTORS SCREEN                                                       */
/* ------------------------------------------------------------------ */

function DoctorsScreen({ navigate }) {
  return (
    <div className="flex-1 overflow-y-auto pb-4">
      <ScreenHeader title={S("doctorsTitle")} onBack={() => navigate("home")} />
      <div className="px-5 flex flex-col gap-2.5 mt-1">
        {DOCTORS.map((d) => (
          <div key={d.id} className="rounded-2xl p-4 flex items-center gap-3" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
            <Avatar initials={d.initials} size={50} />
            <div className="flex-1">
              <p style={{ fontSize: 13.5, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{d.name}</p>
              <p style={{ fontSize: 11, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{L(d, "role")}</p>
              <p style={{ fontSize: 10.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{L(d, "experience")}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star size={11} color="#F5B942" fill="#F5B942" />
                <span style={{ fontSize: 11, color: C.textDark, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>{d.rating}</span>
                <span style={{ fontSize: 10.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>({d.reviews})</span>
              </div>
            </div>
            <button
              onClick={() => navigate("booking", { doctor: d })}
              className="px-3 py-2 rounded-full"
              style={{ background: "rgba(47,196,217,0.12)" }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: C.cyanDark, fontFamily: "Inter, sans-serif" }}>{S("doctorBookBtn")}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* BOOKING SCREEN                                                       */
/* ------------------------------------------------------------------ */

function BookingScreen({ navigate, treatment, doctor, blockedSlots, onConfirm }) {
  const [selDoctor, setSelDoctor] = useState(doctor || null);
  const [selDate, setSelDate] = useState(null);
  const [selTime, setSelTime] = useState(null);
  const [name, setName] = useState(() => {
    const u = getTelegramUser();
    return u ? [u.first_name, u.last_name].filter(Boolean).join(" ") : "";
  });
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const days = getNextDays(5);
  const activeTreatment = treatment || TREATMENTS[0];
  const availableTimes = TIME_SLOTS.filter(
    (t) => !selDoctor || !selDate || !blockedSlots?.[slotKey(selDoctor.id, selDate.key, t)]
  );

  const canConfirm = selDoctor && selDate && selTime && name.trim() && isValidPhone(phone);

  async function handleConfirmClick() {
    if (!isValidPhone(phone)) {
      setSubmitError(S("bookingPhoneInvalid"));
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    const result = await submitBookingToServer({ treatment: activeTreatment, doctor: selDoctor, date: selDate, time: selTime, phone, name });
    setSubmitting(false);
    if (!result.ok) {
      setSubmitError(result.error);
      return;
    }
    onConfirm({ treatment: activeTreatment, doctor: selDoctor, date: selDate, time: selTime });
  }

  return (
    <div className="flex-1 overflow-y-auto pb-4 flex flex-col">
      <ScreenHeader title={S("bookingTitle")} onBack={() => navigate("home")} />

      <div className="px-5">
        <div className="rounded-2xl p-3.5 flex items-center gap-3 mb-4" style={{ background: "rgba(47,196,217,0.1)" }}>
          <span style={{ fontSize: 22 }}>{activeTreatment.emoji}</span>
          <div className="flex-1">
            <p style={{ fontSize: 13, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{L(activeTreatment, "name")}</p>
            <p style={{ fontSize: 11, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{priceLabel(activeTreatment)}</p>
          </div>
        </div>

        <p style={{ fontSize: 12.5, fontWeight: 700, color: C.textDark, marginBottom: 8, fontFamily: "Inter, sans-serif" }}>
          {S("bookingChooseDoctor")}
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {DOCTORS.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelDoctor(d)}
              className="rounded-2xl p-3 flex items-center gap-3"
              style={{
                background: C.cardWhite,
                border: `1.5px solid ${selDoctor?.id === d.id ? C.cyanDark : C.border}`,
              }}
            >
              <Avatar initials={d.initials} size={40} />
              <div className="flex-1 text-left">
                <p style={{ fontSize: 12.5, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{d.name}</p>
                <p style={{ fontSize: 10.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{L(d, "role")}</p>
                <p style={{ fontSize: 10, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{L(d, "experience")}</p>
              </div>
              {selDoctor?.id === d.id && (
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.cyanDark }}>
                  <Check size={12} color="#fff" />
                </div>
              )}
            </button>
          ))}
        </div>

        <p style={{ fontSize: 12.5, fontWeight: 700, color: C.textDark, marginBottom: 8, fontFamily: "Inter, sans-serif" }}>
          {S("bookingChooseDate")}
        </p>
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {days.map((d) => (
            <button
              key={d.key}
              onClick={() => setSelDate(d)}
              className="flex flex-col items-center justify-center rounded-xl flex-shrink-0"
              style={{
                width: 52,
                height: 62,
                background: selDate?.key === d.key ? btnGradient : C.cardWhite,
                border: `1px solid ${selDate?.key === d.key ? "transparent" : C.border}`,
              }}
            >
              <span style={{ fontSize: 10, color: selDate?.key === d.key ? "#fff" : C.textMuted, fontFamily: "Inter, sans-serif" }}>{d.weekday}</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: selDate?.key === d.key ? "#fff" : C.textDark, fontFamily: "Inter, sans-serif" }}>{d.day}</span>
              <span style={{ fontSize: 9, color: selDate?.key === d.key ? "#fff" : C.textMuted, fontFamily: "Inter, sans-serif" }}>{d.month}</span>
            </button>
          ))}
        </div>

        <p style={{ fontSize: 12.5, fontWeight: 700, color: C.textDark, marginBottom: 8, fontFamily: "Inter, sans-serif" }}>
          {S("bookingChooseTime")}
        </p>
        {selDoctor && selDate && availableTimes.length === 0 ? (
          <p style={{ fontSize: 11.5, color: C.textMuted, marginBottom: 12, fontFamily: "Inter, sans-serif" }}>
            {S("bookingNoSlots")}
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {availableTimes.map((t) => (
              <button
                key={t}
                onClick={() => setSelTime(t)}
                className="py-2 rounded-xl"
                style={{
                  background: selTime === t ? btnGradient : C.cardWhite,
                  border: `1px solid ${selTime === t ? "transparent" : C.border}`,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 600, color: selTime === t ? "#fff" : C.textDark, fontFamily: "Inter, sans-serif" }}>
                  {t}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="rounded-2xl p-3.5 flex items-center gap-3 mb-4" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
          <MapPin size={17} color={C.cyanDark} />
          <div className="flex-1 text-left">
            <p style={{ fontSize: 12.5, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{S("bookingVisitCard")}</p>
            <p style={{ fontSize: 10.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{CLINIC.city}, {CLINIC.address}</p>
          </div>
        </div>

        <p style={{ fontSize: 12.5, fontWeight: 700, color: C.textDark, marginBottom: 8, fontFamily: "Inter, sans-serif" }}>
          {S("bookingPhoneLabel")}
        </p>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={S("bookingPhonePlaceholder")}
          type="tel"
          className="w-full px-4 py-3 rounded-2xl outline-none mb-4"
          style={{ background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 13, fontFamily: "Inter, sans-serif", color: C.textDark }}
        />

        <p style={{ fontSize: 12.5, fontWeight: 700, color: C.textDark, marginBottom: 8, fontFamily: "Inter, sans-serif" }}>
          {S("bookingNameLabel")}
        </p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={S("bookingNamePlaceholder")}
          type="text"
          className="w-full px-4 py-3 rounded-2xl outline-none mb-4"
          style={{ background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 13, fontFamily: "Inter, sans-serif", color: C.textDark }}
        />
      </div>

      <div className="flex-1" />
      <div className="p-5 pt-3" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="flex items-center justify-between mb-3">
          <span style={{ fontSize: 12.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{S("bookingCost")}</span>
          <span style={{ fontSize: 15, fontWeight: 800, color: C.textDark, fontFamily: "Inter, sans-serif" }}>
            {priceLabel(activeTreatment)}
          </span>
        </div>
        {submitError && (
          <p style={{ fontSize: 11.5, color: "#C23B3B", marginBottom: 8, fontFamily: "Inter, sans-serif" }}>{submitError}</p>
        )}
        <button
          disabled={!canConfirm || submitting}
          onClick={handleConfirmClick}
          className="w-full py-3.5 rounded-full flex items-center justify-center gap-2"
          style={{ background: canConfirm ? btnGradient : C.border, opacity: canConfirm && !submitting ? 1 : 0.6 }}
        >
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "Inter, sans-serif" }}>
            {submitting ? S("bookingSubmitting") : S("bookingConfirmBtn")}
          </span>
          {!submitting && <ChevronRight size={16} color="#fff" />}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PROFILE SCREEN                                                       */
/* ------------------------------------------------------------------ */

function ProfileScreen({ navigate, appointment, loggedDoctor, onLangChange }) {
  return (
    <div className="flex-1 overflow-y-auto pb-4">
      <ScreenHeader title={S("profileTitle")} onBack={() => navigate("home")} />
      <div className="px-5 flex flex-col items-center mt-2 mb-5">
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: heroGradient }}>
          <ToothIcon size={34} color="#fff" />
        </div>
        <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 17, color: C.textDark, marginTop: 10 }}>
          {CLINIC.fullName}
        </h2>
        <div className="flex items-center gap-1 mt-1">
          <Award size={12} color={C.cyanDark} />
          <span style={{ fontSize: 11.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{CLINIC.experience}</span>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-2.5">
        <div className="rounded-2xl p-3.5 flex items-center gap-2" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: C.textMuted, fontFamily: "Inter, sans-serif", marginRight: 4 }}>
            {S("profileLanguage")}:
          </span>
          <button
            onClick={() => { saveLang("ru"); onLangChange?.(); }}
            className="px-3 py-1.5 rounded-full"
            style={{ background: LANG === "ru" ? btnGradient : "transparent", border: `1px solid ${LANG === "ru" ? "transparent" : C.border}` }}
          >
            <span style={{ fontSize: 11.5, fontWeight: 700, color: LANG === "ru" ? "#fff" : C.textDark, fontFamily: "Inter, sans-serif" }}>Русский</span>
          </button>
          <button
            onClick={() => { saveLang("uz"); onLangChange?.(); }}
            className="px-3 py-1.5 rounded-full"
            style={{ background: LANG === "uz" ? btnGradient : "transparent", border: `1px solid ${LANG === "uz" ? "transparent" : C.border}` }}
          >
            <span style={{ fontSize: 11.5, fontWeight: 700, color: LANG === "uz" ? "#fff" : C.textDark, fontFamily: "Inter, sans-serif" }}>O'zbekcha</span>
          </button>
        </div>

        <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
          <MapPin size={16} color={C.cyanDark} />
          <div>
            <p style={{ fontSize: 12.5, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{CLINIC.city}</p>
            <p style={{ fontSize: 10.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{CLINIC.address}</p>
          </div>
        </div>
        <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
          <Phone size={16} color={C.cyanDark} />
          <div>
            {CLINIC.phones.map((p) => (
              <p key={p} style={{ fontSize: 12.5, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{p}</p>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-4" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
          <div className="flex items-center gap-3 mb-2">
            <Clock size={16} color={C.cyanDark} />
            <p style={{ fontSize: 12.5, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{CLINIC.hours}</p>
          </div>
          <p style={{ fontSize: 11, color: C.textMuted, marginLeft: 28, fontFamily: "Inter, sans-serif" }}>{CLINIC.lunch}</p>
          <p style={{ fontSize: 11, color: C.textMuted, marginLeft: 28, fontFamily: "Inter, sans-serif" }}>{CLINIC.dayOff}</p>
        </div>

        {appointment && (
          <div className="rounded-2xl p-4 mt-1" style={{ background: "rgba(47,196,217,0.1)" }}>
            <p style={{ fontSize: 11.5, fontWeight: 700, color: C.cyanDark, marginBottom: 6, fontFamily: "Inter, sans-serif" }}>
              {S("homeUpcomingVisit")}
            </p>
            <p style={{ fontSize: 12.5, color: C.textDark, fontFamily: "Inter, sans-serif" }}>
              {L(appointment.treatment, "name")} · {appointment.doctor.name}
            </p>
            <p style={{ fontSize: 11.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>
              {appointment.date.weekday} {appointment.date.day} {appointment.date.month}, {appointment.time}
            </p>
          </div>
        )}

        <button
          onClick={() => navigate("myBookings")}
          className="rounded-2xl p-4 flex items-center gap-3 mt-1"
          style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}
        >
          <Calendar size={16} color={C.cyanDark} />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif", flex: 1, textAlign: "left" }}>
            {S("profileMyBookings")}
          </span>
          <ChevronRight size={15} color={C.textMuted} />
        </button>

        <button
          onClick={() => navigate(loggedDoctor ? "doctorPanel" : "doctorLogin")}
          className="rounded-2xl p-4 flex items-center gap-3 mt-1"
          style={{ background: C.cardWhite, border: `1px dashed ${C.border}` }}
        >
          <Users size={16} color={C.textMuted} />
          <span style={{ fontSize: 12, color: C.textMuted, fontFamily: "Inter, sans-serif", flex: 1, textAlign: "left" }}>
            {S("profileDoctorCabinet")}
          </span>
          <ChevronRight size={15} color={C.textMuted} />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* AI ASSISTANT SCREEN                                                  */
/* ------------------------------------------------------------------ */

const SYSTEM_PROMPT = `Ты — дружелюбный AI-ассистент стоматологической клиники "Dr. Radjabov" в Самарканде.
Твоя задача: понимать проблему пациента, кратко объяснять подходящее лечение и его стоимость по прайсу клиники, и мягко предлагать записаться на приём.

Информация о клинике:
- Адрес: г. Самарканд, Андижанская улица, 31.
- Телефоны: +998 88 001 00 44, +998 97 911 44 00.
- Часы работы: Пн–Сб 9:00–18:00, обед 12:00–14:00, воскресенье — выходной.
- Врачи: Раджабов Шодмон (главный врач, хирург-имплантолог, опыт более 15 лет), Арифджанов Сафо (главный врач, опыт более 40 лет), Арифджанова Юлдуз (дентист, опыт более 7 лет).

Прайс-лист клиники:
- Консультация — бесплатно
- Пломбы — $250–500
- Коронки (цирконий) — $100–120
- Удаление зуба — $15–20
- Брекеты — $500–700
- Имплантация — $250–350
- Отбеливание — $120–150

Правила ответа:
- Отвечай по-русски, тепло и профессионально, 2–4 коротких предложения.
- Если понятна проблема пациента — назови подходящее лечение и точную цену из прайса.
- Не ставь диагноз и не давай медицинских рекомендаций сверх общей информации; при серьёзных симптомах советуй очный осмотр.
- В конце мягко предложи записаться на приём, но не будь навязчивым.
- Пиши обычным текстом, без markdown-разметки и звёздочек.`;

function getQuickTopics() {
  return [
    S("assistantConcernTooth"),
    S("assistantConcernWhitening"),
    S("assistantConcernBraces"),
    S("assistantConcernImplant"),
    S("assistantConcernConsult"),
  ];
}

function AssistantScreen({ navigate, onBookAppointment, blockedSlots }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: S("assistantGreeting"),
    },
  ]);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  // При открытии чата подгружаем сохранённую историю переписки из
  // облачного хранилища Telegram (привязана к аккаунту пациента,
  // сохраняется между сессиями и устройствами).
  useEffect(() => {
    if (tg?.CloudStorage) {
      tg.CloudStorage.getItem("chat_history", (err, value) => {
        if (!err && value) {
          try {
            const saved = JSON.parse(value);
            if (Array.isArray(saved) && saved.length > 0) setMessages(saved);
          } catch (e) {
            // повреждённые данные — просто начинаем с чистого чата
          }
        }
        setHistoryLoaded(true);
      });
    } else {
      setHistoryLoaded(true);
    }
  }, []);

  // Сохраняем историю при каждом новом сообщении (после первой загрузки,
  // чтобы не перезаписать сохранённую историю пустым стартовым чатом).
  useEffect(() => {
    if (historyLoaded && tg?.CloudStorage) {
      tg.CloudStorage.setItem("chat_history", JSON.stringify(messages.slice(-30)));
    }
  }, [messages, historyLoaded]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingStep, setBookingStep] = useState(null); // null|doctor|date|time|confirm|done
  const [draft, setDraft] = useState({ doctor: null, date: null, time: null });
  const [name, setName] = useState(() => {
    const u = getTelegramUser();
    return u ? [u.first_name, u.last_name].filter(Boolean).join(" ") : "";
  });
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    // requestAnimationFrame гарантирует, что новые элементы (кнопки выбора
    // врача/даты/времени) уже отрисовались в DOM, прежде чем скроллить —
    // без этого на некоторых устройствах чат "как будто зависает",
    // потому что скроллится до того, как новая высота посчиталась.
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "auto" });
    });
  }, [messages, loading, bookingStep]);

  function addAssistantMsg(text) {
    setMessages((m) => [...m, { role: "assistant", content: text }]);
  }

  async function handleSend(text) {
    const t = (text ?? input).trim();
    if (!t || loading) return;
    const next = [...messages, { role: "user", content: t }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      // Обращаемся к нашей серверной функции (api/chat.js), а не напрямую
      // к нейросети — там ключ доступа хранится безопасно, на сервере.
      // Передаём выбранный язык интерфейса, чтобы ассистент по умолчанию
      // отвечал на нём (но переключится, если пациент сам напишет иначе).
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang: LANG }),
      });
      const data = await res.json();
      const reply = data.reply || S("assistantErrorReply");
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: S("assistantConnError") },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function startBooking() {
    setBookingStep("doctor");
    addAssistantMsg(S("assistantWhoDoctor"));
  }

  function pickDoctor(doc) {
    setDraft((d) => ({ ...d, doctor: doc }));
    setMessages((m) => [...m, { role: "user", content: doc.name }]);
    setBookingStep("date");
    addAssistantMsg(S("assistantBookingTo")(doc.name));
  }

  function pickDate(day) {
    setDraft((d) => ({ ...d, date: day }));
    setMessages((m) => [...m, { role: "user", content: `${day.weekday} ${day.day} ${day.month}` }]);
    setBookingStep("time");
    addAssistantMsg(S("assistantChooseTime"));
  }

  function pickTime(time) {
    setDraft((d) => ({ ...d, time }));
    setMessages((m) => [...m, { role: "user", content: time }]);
    setBookingStep("confirm");
  }

  async function confirmBooking() {
    if (!isValidPhone(phone)) {
      setSubmitError(S("bookingPhoneInvalid"));
      return;
    }
    if (!name.trim()) {
      setSubmitError(S("assistantNameRequired"));
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    const treatment = guessTreatmentFromMessages(messages);
    const result = await submitBookingToServer({ treatment, doctor: draft.doctor, date: draft.date, time: draft.time, phone, name });
    setSubmitting(false);
    if (!result.ok) {
      setSubmitError(result.error);
      return;
    }
    const appt = { treatment, doctor: draft.doctor, date: draft.date, time: draft.time };
    onBookAppointment(appt);
    setBookingStep("done");
    addAssistantMsg(S("assistantDone")(draft.date));
  }

  const treatmentGuess = guessTreatmentFromMessages(messages);

  return (
    <div className="flex-1 flex flex-col" style={{ minHeight: 0 }}>
      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
        <button onClick={() => navigate("home")} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
          <ArrowLeft size={18} color={C.navy} />
        </button>
        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: heroGradient }}>
          <Sparkles size={16} color="#fff" />
        </div>
        <div>
          <p style={{ fontSize: 13.5, fontWeight: 800, color: C.textDark, fontFamily: "Manrope, sans-serif" }}>AI Ассистент</p>
          <p style={{ fontSize: 10.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>Клиника Dr. Radjabov · онлайн</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 flex flex-col gap-3" style={{ minHeight: 0 }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="rounded-2xl px-3.5 py-2.5"
              style={{
                maxWidth: "82%",
                background: m.role === "user" ? btnGradient : C.cardWhite,
                border: m.role === "user" ? "none" : `1px solid ${C.border}`,
              }}
            >
              <span
                style={{
                  fontSize: 12.5,
                  color: m.role === "user" ? "#fff" : C.textDark,
                  fontFamily: "Inter, sans-serif",
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.content}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-3.5 py-2.5 flex items-center gap-2" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
              <Loader2 size={13} color={C.cyanDark} className="animate-spin" />
              <span style={{ fontSize: 12, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>печатает...</span>
            </div>
          </div>
        )}

        {/* quick topics at the very start */}
        {messages.length === 1 && !bookingStep && (
          <div className="flex flex-wrap gap-2">
            {getQuickTopics().map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="px-3 py-1.5 rounded-full"
                style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}
              >
                <span style={{ fontSize: 11.5, color: C.cyanDark, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>{q}</span>
              </button>
            ))}
          </div>
        )}

        {/* booking flow chips */}
        {bookingStep === "doctor" && (
          <div className="flex flex-col gap-2">
            {DOCTORS.map((d) => (
              <button key={d.id} onClick={() => pickDoctor(d)} className="rounded-2xl p-3 flex items-center gap-3" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
                <Avatar initials={d.initials} size={36} />
                <div className="text-left">
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{d.name}</p>
                  <p style={{ fontSize: 10.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{d.role}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {bookingStep === "date" && (
          <div className="flex gap-2 overflow-x-auto">
            {getNextDays(5).map((d) => (
              <button
                key={d.key}
                onClick={() => pickDate(d)}
                className="flex flex-col items-center justify-center rounded-xl flex-shrink-0"
                style={{ width: 52, height: 60, background: C.cardWhite, border: `1px solid ${C.border}` }}
              >
                <span style={{ fontSize: 9.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{d.weekday}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{d.day}</span>
                <span style={{ fontSize: 9, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{d.month}</span>
              </button>
            ))}
          </div>
        )}

        {bookingStep === "time" && (
          <div className="flex flex-wrap gap-2">
            {TIME_SLOTS.filter((t) => !blockedSlots?.[slotKey(draft.doctor?.id, draft.date?.key, t)]).map((t) => (
              <button key={t} onClick={() => pickTime(t)} className="px-3.5 py-1.5 rounded-full" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 11.5, color: C.cyanDark, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>{t}</span>
              </button>
            ))}
          </div>
        )}

        {bookingStep === "confirm" && (
          <div className="rounded-2xl p-4" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 11.5, fontWeight: 700, color: C.cyanDark, marginBottom: 8, fontFamily: "Inter, sans-serif" }}>
              {S("assistantConfirmSummary")}
            </p>
            <div className="flex items-center gap-2 mb-1.5">
              <span style={{ fontSize: 16 }}>{treatmentGuess.emoji}</span>
              <span style={{ fontSize: 12.5, color: C.textDark, fontFamily: "Inter, sans-serif" }}>
                {L(treatmentGuess, "name")} · {priceLabel(treatmentGuess)}
              </span>
            </div>
            <p style={{ fontSize: 12, color: C.textDark, marginBottom: 2, fontFamily: "Inter, sans-serif" }}>{draft.doctor?.name}</p>
            <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 10, fontFamily: "Inter, sans-serif" }}>
              {draft.date?.weekday} {draft.date?.day} {draft.date?.month} · {draft.time}
            </p>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={S("assistantPhonePlaceholder")}
              type="tel"
              className="w-full px-3.5 py-2.5 rounded-full outline-none mb-2"
              style={{ background: C.bg, border: `1px solid ${C.border}`, fontSize: 12.5, fontFamily: "Inter, sans-serif", color: C.textDark }}
            />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={S("bookingNamePlaceholder")}
              type="text"
              className="w-full px-3.5 py-2.5 rounded-full outline-none mb-2"
              style={{ background: C.bg, border: `1px solid ${C.border}`, fontSize: 12.5, fontFamily: "Inter, sans-serif", color: C.textDark }}
            />
            {submitError && (
              <p style={{ fontSize: 11, color: "#C23B3B", marginBottom: 8, fontFamily: "Inter, sans-serif" }}>{submitError}</p>
            )}
            <button
              onClick={confirmBooking}
              disabled={submitting}
              className="w-full py-2.5 rounded-full flex items-center justify-center gap-1.5"
              style={{ background: btnGradient, opacity: submitting ? 0.6 : 1 }}
            >
              {submitting ? (
                <Loader2 size={14} color="#fff" className="animate-spin" />
              ) : (
                <Check size={14} color="#fff" />
              )}
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 12.5, fontFamily: "Inter, sans-serif" }}>
                {submitting ? S("bookingSubmitting") : S("assistantConfirmBtn")}
              </span>
            </button>
          </div>
        )}

        {bookingStep === "done" && (
          <button onClick={() => navigate("home")} className="w-full py-2.5 rounded-full flex items-center justify-center gap-1.5" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
            <CheckCircle2 size={14} color={C.cyanDark} />
            <span style={{ fontSize: 12.5, fontWeight: 700, color: C.cyanDark, fontFamily: "Inter, sans-serif" }}>{LANG === "uz" ? "Bosh sahifaga" : "На главный экран"}</span>
          </button>
        )}
      </div>

      {!bookingStep && messages.length > 1 && (
        <div className="px-5 pt-2">
          <button
            onClick={startBooking}
            className="w-full py-2.5 rounded-full flex items-center justify-center gap-1.5"
            style={{ background: "rgba(47,196,217,0.12)" }}
          >
            <Calendar size={13} color={C.cyanDark} />
            <span style={{ fontSize: 12, fontWeight: 700, color: C.cyanDark, fontFamily: "Inter, sans-serif" }}>{S("assistantBookHint")}</span>
          </button>
        </div>
      )}

      {!bookingStep && (
        <div className="p-4 flex items-center gap-2" style={{ borderTop: `1px solid ${C.border}` }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={S("assistantInputPlaceholder")}
            className="flex-1 px-4 py-2.5 rounded-full outline-none"
            style={{ background: C.bg, border: `1px solid ${C.border}`, fontSize: 12.5, fontFamily: "Inter, sans-serif", color: C.textDark }}
          />
          <button
            onClick={() => handleSend()}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: btnGradient }}
          >
            <Send size={15} color="#fff" />
          </button>
        </div>
      )}
    </div>
  );
}

function slotKey(doctorId, dateKey, time) {
  return `${doctorId}__${dateKey}__${time}`;
}

/* ------------------------------------------------------------------ */
/* MY BOOKINGS — список записей пациента с возможностью отмены        */
/* ------------------------------------------------------------------ */

function MyBookingsScreen({ navigate }) {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    fetchMyBookings().then((res) => {
      setLoading(false);
      if (!res.ok) setError(res.error || S("errorGeneric"));
      setBookings(res.bookings);
    });
  }, []);

  async function handleCancel(id) {
    setCancellingId(id);
    const res = await cancelMyBooking(id);
    setCancellingId(null);
    if (res.ok) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } else {
      setError(res.error);
    }
  }

  return (
    <div className="flex-1 overflow-y-auto pb-4">
      <ScreenHeader title={S("myBookingsTitle")} onBack={() => navigate("home")} />

      {loading && (
        <div className="px-5 pt-6 flex items-center justify-center">
          <Loader2 size={20} color={C.cyanDark} className="animate-spin" />
        </div>
      )}

      {!loading && error && (
        <div className="px-5">
          <p style={{ fontSize: 12.5, color: "#C23B3B", fontFamily: "Inter, sans-serif" }}>{error}</p>
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="px-5 pt-6 text-center">
          <p style={{ fontSize: 12.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>
            {S("myBookingsEmpty")}
          </p>
        </div>
      )}

      <div className="px-5 flex flex-col gap-3 mt-2">
        {bookings.map((b) => (
          <div key={b.id} className="rounded-2xl p-4" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 13.5, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{b.service}</p>
            {b.doctor && (
              <p style={{ fontSize: 11.5, color: C.textMuted, marginTop: 2, fontFamily: "Inter, sans-serif" }}>{S("myBookingsDoctorLabel")}: {b.doctor}</p>
            )}
            <p style={{ fontSize: 12, color: C.cyanDark, fontWeight: 600, marginTop: 6, fontFamily: "Inter, sans-serif" }}>
              {b.appointment_date} · {b.appointment_time}
            </p>
            <button
              onClick={() => handleCancel(b.id)}
              disabled={cancellingId === b.id}
              className="mt-3 w-full py-2.5 rounded-full"
              style={{ background: "rgba(220,60,60,0.08)", border: "1px solid rgba(220,60,60,0.35)", opacity: cancellingId === b.id ? 0.6 : 1 }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: "#C23B3B", fontFamily: "Inter, sans-serif" }}>
                {cancellingId === b.id ? S("myBookingsCancelling") : S("myBookingsCancelBtn")}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DOCTOR LOGIN (демо: в реальном апе — авто-вход по telegram chat_id) */
/* ------------------------------------------------------------------ */

function DoctorLoginScreen({ navigate, onLogin }) {
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [checkingStoredPassword, setCheckingStoredPassword] = useState(true);

  // Если пароль уже сохранён с прошлого раза (в облачном хранилище
  // Telegram) — проверяем его на сервере и, если он всё ещё верный,
  // сразу открываем список врачей без повторного ввода пароля.
  useEffect(() => {
    if (tg?.CloudStorage) {
      tg.CloudStorage.getItem("admin_password", async (err, stored) => {
        if (!err && stored) {
          const result = await adminLogin(stored);
          if (result.ok) {
            setPassword(stored);
            setUnlocked(true);
          } else {
            tg.CloudStorage.removeItem("admin_password");
          }
        }
        setCheckingStoredPassword(false);
      });
    } else {
      setCheckingStoredPassword(false);
    }
  }, []);

  async function handleUnlock() {
    if (!password.trim()) return;
    setChecking(true);
    setError("");
    const result = await adminLogin(password.trim());
    setChecking(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    // Запоминаем пароль на устройстве пациента/врача через Telegram,
    // чтобы в следующий раз не спрашивать его снова.
    tg?.CloudStorage?.setItem("admin_password", password.trim());
    setUnlocked(true);
  }

  if (checkingStoredPassword) {
    return (
      <div className="flex-1 overflow-y-auto pb-4">
        <ScreenHeader title={S("doctorLoginTitle")} onBack={() => navigate("profile")} />
        <div className="px-5 pt-6 flex items-center justify-center">
          <Loader2 size={20} color={C.cyanDark} className="animate-spin" />
        </div>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="flex-1 overflow-y-auto pb-4">
        <ScreenHeader title={S("doctorLoginTitle")} onBack={() => navigate("profile")} />
        <div className="px-5 mb-4">
          <p style={{ fontSize: 11.5, color: C.textMuted, lineHeight: 1.5, fontFamily: "Inter, sans-serif" }}>
            {S("doctorLoginIntro")}
          </p>
        </div>
        <div className="px-5">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
            placeholder={S("doctorLoginPlaceholder")}
            type="password"
            className="w-full px-4 py-3 rounded-2xl outline-none mb-3"
            style={{ background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 14, fontFamily: "Inter, sans-serif", color: C.textDark }}
          />
          {error && <p style={{ fontSize: 12, color: "#C23B3B", marginBottom: 10, fontFamily: "Inter, sans-serif" }}>{error}</p>}
          <button
            onClick={handleUnlock}
            disabled={checking}
            className="w-full py-3 rounded-full"
            style={{ background: btnGradient, opacity: checking ? 0.6 : 1 }}
          >
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "Inter, sans-serif" }}>
              {checking ? S("doctorLoginChecking") : S("doctorLoginBtn")}
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pb-4">
      <ScreenHeader title={S("doctorLoginTitle")} onBack={() => navigate("profile")} />
      <div className="px-5 mb-4">
        <p style={{ fontSize: 11.5, color: C.textMuted, lineHeight: 1.5, fontFamily: "Inter, sans-serif" }}>
          {S("doctorLoginChooseYourself")}
        </p>
      </div>
      <div className="px-5 flex flex-col gap-2.5">
        {DOCTORS.map((d) => (
          <button
            key={d.id}
            onClick={() => onLogin(d, password.trim())}
            className="rounded-2xl p-3.5 flex items-center gap-3"
            style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}
          >
            <Avatar initials={d.initials} size={44} />
            <div className="flex-1 text-left">
              <p style={{ fontSize: 13, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{d.name}</p>
              <p style={{ fontSize: 10.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{L(d, "role")}</p>
            </div>
            <ChevronRight size={16} color={C.textMuted} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DOCTOR PANEL — управление своим расписанием                        */
/* ------------------------------------------------------------------ */

function DoctorPanelScreen({ navigate, doctor, blockedSlots, onToggleSlot, adminPassword, onLogout, appointment, onSettingsSaved }) {
  const days = getNextDays(6);
  const [activeDay, setActiveDay] = useState(days[0].key);
  const currentDay = days.find((d) => d.key === activeDay);
  const myAppointment = appointment && appointment.doctor?.id === doctor.id ? appointment : null;

  const [tab, setTab] = useState("schedule"); // schedule | settings
  const [form, setForm] = useState({
    address: CLINIC.address,
    phone1: CLINIC.phones[0] || "",
    phone2: CLINIC.phones[1] || "",
    hours: CLINIC.hours,
    lunch: CLINIC.lunch,
    dayOff: CLINIC.dayOff,
    prices: TREATMENTS.reduce((acc, t) => ({ ...acc, [t.id]: { priceFrom: t.priceFrom, priceTo: t.priceTo } }), {}),
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function updatePrice(id, field, value) {
    setForm((f) => ({ ...f, prices: { ...f.prices, [id]: { ...f.prices[id], [field]: Number(value) || 0 } } }));
    setSaved(false);
  }

  async function handleSaveSettings() {
    setSaving(true);
    setSaved(false);
    const treatmentsPayload = TREATMENTS.map((t) => ({
      id: t.id,
      name: t.name,
      priceFrom: form.prices[t.id]?.priceFrom ?? t.priceFrom,
      priceTo: form.prices[t.id]?.priceTo ?? t.priceTo,
      free: t.free,
    }));
    const settings = {
      address: form.address,
      phones: [form.phone1, form.phone2].filter(Boolean),
      hours: form.hours,
      lunch: form.lunch,
      dayOff: form.dayOff,
      treatments: treatmentsPayload,
    };
    const result = await adminSaveSettings(adminPassword, settings);
    setSaving(false);
    if (result.ok) {
      // Применяем изменения сразу, без перезагрузки приложения
      CLINIC.address = form.address;
      CLINIC.phones = [form.phone1, form.phone2].filter(Boolean);
      CLINIC.hours = form.hours;
      CLINIC.lunch = form.lunch;
      CLINIC.dayOff = form.dayOff;
      treatmentsPayload.forEach((tp) => {
        const t = TREATMENTS.find((x) => x.id === tp.id);
        if (t) {
          t.priceFrom = tp.priceFrom;
          t.priceTo = tp.priceTo;
        }
      });
      setSaved(true);
      onSettingsSaved?.();
    }
  }

  return (
    <div className="flex-1 overflow-y-auto pb-4">
      <ScreenHeader title={S("panelTitle")} onBack={() => navigate("profile")} />

      <div className="px-5 flex items-center gap-3 mb-4">
        <Avatar initials={doctor.initials} size={46} />
        <div className="flex-1">
          <p style={{ fontSize: 13.5, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{doctor.name}</p>
          <p style={{ fontSize: 11, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{L(doctor, "role")}</p>
        </div>
        <button onClick={onLogout} style={{ fontSize: 11, fontWeight: 700, color: C.cyanDark, fontFamily: "Inter, sans-serif" }}>
          {S("panelLogout")}
        </button>
      </div>

      <div className="px-5 flex gap-2 mb-4">
        <button
          onClick={() => setTab("schedule")}
          className="flex-1 py-2 rounded-full"
          style={{ background: tab === "schedule" ? btnGradient : C.cardWhite, border: `1px solid ${tab === "schedule" ? "transparent" : C.border}` }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: tab === "schedule" ? "#fff" : C.textDark, fontFamily: "Inter, sans-serif" }}>{S("panelTabSchedule")}</span>
        </button>
        <button
          onClick={() => setTab("settings")}
          className="flex-1 py-2 rounded-full"
          style={{ background: tab === "settings" ? btnGradient : C.cardWhite, border: `1px solid ${tab === "settings" ? "transparent" : C.border}` }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: tab === "settings" ? "#fff" : C.textDark, fontFamily: "Inter, sans-serif" }}>{S("panelTabSettings")}</span>
        </button>
      </div>

      {tab === "schedule" && (
        <>
          {myAppointment && (
            <div className="px-5 mb-4">
              <div className="rounded-2xl p-3.5" style={{ background: "rgba(47,196,217,0.1)" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: C.cyanDark, marginBottom: 4, fontFamily: "Inter, sans-serif" }}>
                  {S("panelUpcoming")}
                </p>
                <p style={{ fontSize: 12.5, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{L(myAppointment.treatment, "name")}</p>
                <p style={{ fontSize: 11.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>
                  {myAppointment.date.weekday} {myAppointment.date.day} {myAppointment.date.month} · {myAppointment.time}
                </p>
              </div>
            </div>
          )}

          <div className="px-5 mb-2">
            <p style={{ fontSize: 12.5, fontWeight: 700, color: C.textDark, marginBottom: 8, fontFamily: "Inter, sans-serif" }}>
              {S("panelTabSchedule")}
            </p>
            <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 10, fontFamily: "Inter, sans-serif" }}>
              {S("panelScheduleHint")}
            </p>
          </div>

          <div className="px-5 flex gap-2 mb-4 overflow-x-auto">
            {days.map((d) => (
              <button
                key={d.key}
                onClick={() => setActiveDay(d.key)}
                className="flex flex-col items-center justify-center rounded-xl flex-shrink-0"
                style={{
                  width: 50,
                  height: 58,
                  background: activeDay === d.key ? btnGradient : C.cardWhite,
                  border: `1px solid ${activeDay === d.key ? "transparent" : C.border}`,
                }}
              >
                <span style={{ fontSize: 9.5, color: activeDay === d.key ? "#fff" : C.textMuted, fontFamily: "Inter, sans-serif" }}>{d.weekday}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: activeDay === d.key ? "#fff" : C.textDark, fontFamily: "Inter, sans-serif" }}>{d.day}</span>
              </button>
            ))}
          </div>

          <div className="px-5 grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((t) => {
              const blocked = !!blockedSlots[slotKey(doctor.id, activeDay, t)];
              return (
                <button
                  key={t}
                  onClick={() => onToggleSlot(doctor.id, activeDay, t)}
                  className="py-2.5 rounded-xl flex flex-col items-center"
                  style={{
                    background: blocked ? "rgba(220,60,60,0.08)" : "rgba(47,196,217,0.08)",
                    border: `1px solid ${blocked ? "rgba(220,60,60,0.35)" : "rgba(47,196,217,0.35)"}`,
                  }}
                >
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: blocked ? "#C23B3B" : C.cyanDark, fontFamily: "Inter, sans-serif", textDecoration: blocked ? "line-through" : "none" }}>
                    {t}
                  </span>
                  <span style={{ fontSize: 9, color: blocked ? "#C23B3B" : C.cyanDark, fontFamily: "Inter, sans-serif" }}>
                    {blocked ? S("panelSlotClosed") : S("panelSlotFree")}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {tab === "settings" && (
        <div className="px-5">
          <p style={{ fontSize: 11.5, fontWeight: 700, color: C.textDark, marginBottom: 6, fontFamily: "Inter, sans-serif" }}>{S("panelAddress")}</p>
          <input
            value={form.address}
            onChange={(e) => { setForm((f) => ({ ...f, address: e.target.value })); setSaved(false); }}
            className="w-full px-3.5 py-2.5 rounded-xl outline-none mb-3"
            style={{ background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 12.5, fontFamily: "Inter, sans-serif", color: C.textDark }}
          />

          <p style={{ fontSize: 11.5, fontWeight: 700, color: C.textDark, marginBottom: 6, fontFamily: "Inter, sans-serif" }}>{S("panelPhones")}</p>
          <input
            value={form.phone1}
            onChange={(e) => { setForm((f) => ({ ...f, phone1: e.target.value })); setSaved(false); }}
            placeholder={LANG === "uz" ? "Telefon 1" : "Телефон 1"}
            className="w-full px-3.5 py-2.5 rounded-xl outline-none mb-2"
            style={{ background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 12.5, fontFamily: "Inter, sans-serif", color: C.textDark }}
          />
          <input
            value={form.phone2}
            onChange={(e) => { setForm((f) => ({ ...f, phone2: e.target.value })); setSaved(false); }}
            placeholder={LANG === "uz" ? "Telefon 2 (ixtiyoriy)" : "Телефон 2 (необязательно)"}
            className="w-full px-3.5 py-2.5 rounded-xl outline-none mb-3"
            style={{ background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 12.5, fontFamily: "Inter, sans-serif", color: C.textDark }}
          />

          <p style={{ fontSize: 11.5, fontWeight: 700, color: C.textDark, marginBottom: 6, fontFamily: "Inter, sans-serif" }}>{S("panelHours")}</p>
          <input
            value={form.hours}
            onChange={(e) => { setForm((f) => ({ ...f, hours: e.target.value })); setSaved(false); }}
            className="w-full px-3.5 py-2.5 rounded-xl outline-none mb-2"
            style={{ background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 12.5, fontFamily: "Inter, sans-serif", color: C.textDark }}
          />
          <input
            value={form.lunch}
            onChange={(e) => { setForm((f) => ({ ...f, lunch: e.target.value })); setSaved(false); }}
            placeholder={S("panelLunch")}
            className="w-full px-3.5 py-2.5 rounded-xl outline-none mb-2"
            style={{ background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 12.5, fontFamily: "Inter, sans-serif", color: C.textDark }}
          />
          <input
            value={form.dayOff}
            onChange={(e) => { setForm((f) => ({ ...f, dayOff: e.target.value })); setSaved(false); }}
            placeholder={S("panelDayOff")}
            className="w-full px-3.5 py-2.5 rounded-xl outline-none mb-4"
            style={{ background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 12.5, fontFamily: "Inter, sans-serif", color: C.textDark }}
          />

          <p style={{ fontSize: 11.5, fontWeight: 700, color: C.textDark, marginBottom: 8, fontFamily: "Inter, sans-serif" }}>{S("panelPricesTitle")}</p>
          {TREATMENTS.filter((t) => !t.free).map((t) => (
            <div key={t.id} className="flex items-center gap-2 mb-2">
              <span style={{ flex: 1, fontSize: 12, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{L(t, "name")}</span>
              <input
                type="number"
                value={form.prices[t.id]?.priceFrom ?? t.priceFrom}
                onChange={(e) => updatePrice(t.id, "priceFrom", e.target.value)}
                className="px-2 py-1.5 rounded-lg outline-none"
                style={{ width: 60, background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 12, fontFamily: "Inter, sans-serif", color: C.textDark }}
              />
              <span style={{ fontSize: 12, color: C.textMuted }}>–</span>
              <input
                type="number"
                value={form.prices[t.id]?.priceTo ?? t.priceTo}
                onChange={(e) => updatePrice(t.id, "priceTo", e.target.value)}
                className="px-2 py-1.5 rounded-lg outline-none"
                style={{ width: 60, background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 12, fontFamily: "Inter, sans-serif", color: C.textDark }}
              />
            </div>
          ))}

          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className="w-full py-3 rounded-full mt-3"
            style={{ background: btnGradient, opacity: saving ? 0.6 : 1 }}
          >
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 13.5, fontFamily: "Inter, sans-serif" }}>
              {saving ? S("panelSaving") : saved ? S("panelSaved") : S("panelSaveBtn")}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* APP                                                                   */
/* ------------------------------------------------------------------ */

export default function App() {
  const [screen, setScreen] = useState("home");
  const [activeTreatment, setActiveTreatment] = useState(null);
  const [activeDoctor, setActiveDoctor] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [blockedSlots, setBlockedSlots] = useState({});
  const [loggedDoctor, setLoggedDoctor] = useState(null);
  const [adminPassword, setAdminPassword] = useState(null); // хранится только в памяти сессии
  const [configVersion, setConfigVersion] = useState(0);
  const [langReady, setLangReady] = useState(false);
  const [needsLangSelect, setNeedsLangSelect] = useState(false);

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
    }
    loadClinicSettings().then((fetchedBlockedSlots) => {
      setBlockedSlots(fetchedBlockedSlots);
      setConfigVersion((v) => v + 1); // перерисовать экраны с новыми ценами/адресом
    });

    // Проверяем, выбирал ли пациент язык раньше — если нет, покажем экран выбора.
    if (tg?.CloudStorage) {
      tg.CloudStorage.getItem("lang", (err, saved) => {
        if (!err && (saved === "ru" || saved === "uz")) {
          LANG = saved;
        } else {
          setNeedsLangSelect(true);
        }
        setLangReady(true);
      });
    } else {
      setLangReady(true);
    }
  }, []);

  function handleLangSelected(lang) {
    saveLang(lang);
    setNeedsLangSelect(false);
    setConfigVersion((v) => v + 1);
  }

  function navigate(target, opts = {}) {
    if (opts.treatment) setActiveTreatment(opts.treatment);
    if (opts.doctor) setActiveDoctor(opts.doctor);
    setScreen(target);
  }

  function handleBookAppointment(appt) {
    setAppointment(appt);
    setActiveTreatment(null);
    setActiveDoctor(null);
  }

  function toggleSlot(doctorId, dateKey, time) {
    const key = slotKey(doctorId, dateKey, time);
    const isCurrentlyBlocked = !!blockedSlots[key];
    setBlockedSlots((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = true;
      return next;
    });
    // Сохраняем изменение на сервере, чтобы оно не потерялось при перезаходе
    adminToggleSlot(adminPassword, doctorId, dateKey, time, isCurrentlyBlocked ? "unblock" : "block");
  }

  let body;
  if (screen === "home") body = <HomeScreen navigate={navigate} appointment={appointment} onLangChange={() => setConfigVersion((v) => v + 1)} />;
  else if (screen === "treatments") body = <TreatmentsScreen navigate={navigate} />;
  else if (screen === "treatment") body = <TreatmentDetailScreen treatment={activeTreatment} navigate={navigate} />;
  else if (screen === "doctors") body = <DoctorsScreen navigate={navigate} />;
  else if (screen === "booking")
    body = (
      <BookingScreen
        navigate={navigate}
        treatment={activeTreatment}
        doctor={activeDoctor}
        blockedSlots={blockedSlots}
        onConfirm={(appt) => {
          handleBookAppointment(appt);
          setScreen("home");
        }}
      />
    );
  else if (screen === "assistant")
    body = <AssistantScreen navigate={navigate} onBookAppointment={handleBookAppointment} blockedSlots={blockedSlots} />;
  else if (screen === "profile")
    body = <ProfileScreen navigate={navigate} appointment={appointment} loggedDoctor={loggedDoctor} onLangChange={() => setConfigVersion((v) => v + 1)} />;
  else if (screen === "myBookings") body = <MyBookingsScreen navigate={navigate} />;
  else if (screen === "doctorLogin")
    body = (
      <DoctorLoginScreen
        navigate={navigate}
        onLogin={(d, password) => {
          setAdminPassword(password);
          setLoggedDoctor(d);
          setScreen("doctorPanel");
        }}
      />
    );
  else if (screen === "doctorPanel")
    body = (
      <DoctorPanelScreen
        navigate={navigate}
        doctor={loggedDoctor}
        blockedSlots={blockedSlots}
        onToggleSlot={toggleSlot}
        adminPassword={adminPassword}
        onLogout={() => {
          setLoggedDoctor(null);
          setAdminPassword(null);
          tg?.CloudStorage?.removeItem("admin_password");
          setScreen("profile");
        }}
        appointment={appointment}
        onSettingsSaved={() => setConfigVersion((v) => v + 1)}
      />
    );

  if (!langReady) {
    return (
      <div className="flex flex-col items-center justify-center" style={{ background: C.bg, height: "100dvh", width: "100%" }}>
        <Loader2 size={24} color={C.cyanDark} className="animate-spin" />
      </div>
    );
  }

  if (needsLangSelect) {
    return (
      <div className="flex flex-col" style={{ background: C.bg, height: "100dvh", width: "100%", overflow: "hidden" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Inter:wght@400;500;600;700&display=swap');`}</style>
        <LanguageSelectScreen onSelect={handleLangSelected} />
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ background: C.bg, height: "100dvh", width: "100%", overflow: "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      <div key={configVersion} className="flex-1 min-h-0 flex flex-col">
        {body}
      </div>
      {["home", "doctors", "assistant", "profile"].includes(screen) && <BottomNav screen={screen} navigate={navigate} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MOUNT                                                                */
/* ------------------------------------------------------------------ */

const rootEl = document.getElementById("root");
ReactDOM.createRoot(rootEl).render(<App />);
