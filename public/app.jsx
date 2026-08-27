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
    emoji: "💬",
    priceFrom: 0,
    priceTo: 0,
    free: true,
    duration: "20 мин",
    tagline: "Осмотр и план лечения",
    desc: "Первичный осмотр, диагностика и составление индивидуального плана лечения от нашего врача.",
    keywords: ["консульт", "осмотр", "план лечения"],
  },
  {
    id: "filling",
    name: "Пломбы",
    emoji: "🦷",
    priceFrom: 250,
    priceTo: 500,
    duration: "30–60 мин",
    tagline: "Лечение кариеса",
    desc: "Лечение кариеса и восстановление формы зуба качественными современными материалами.",
    keywords: ["пломб", "кариес", "болит зуб", "дырка"],
  },
  {
    id: "zircon",
    name: "Коронки (цирконий)",
    emoji: "👑",
    priceFrom: 100,
    priceTo: 120,
    duration: "2 визита",
    tagline: "Прочно и эстетично",
    desc: "Циркониевые коронки — прочные, долговечные и неотличимые от натуральных зубов по цвету.",
    keywords: ["коронк", "цирконий", "циркон"],
  },
  {
    id: "extraction",
    name: "Удаление зуба",
    emoji: "🗜️",
    priceFrom: 15,
    priceTo: 20,
    duration: "15–30 мин",
    tagline: "Быстро и без боли",
    desc: "Безболезненное удаление зуба с использованием современной анестезии и щадящих методик.",
    keywords: ["удал", "вырвать зуб"],
  },
  {
    id: "braces",
    name: "Брекеты",
    emoji: "😁",
    priceFrom: 500,
    priceTo: 700,
    duration: "12–24 мес",
    tagline: "Ровный, красивый прикус",
    desc: "Выравнивание зубного ряда и прикуса с помощью брекет-систем. Подбор системы под ваш бюджет.",
    keywords: ["брекет", "прикус", "кривые зубы", "выровнять"],
  },
  {
    id: "implant",
    name: "Имплантация",
    emoji: "🪛",
    priceFrom: 250,
    priceTo: 350,
    duration: "3–6 мес",
    tagline: "Восстановление зуба",
    desc: "Восстановление утраченного зуба имплантом с надёжной приживаемостью и долгим сроком службы.",
    keywords: ["имплант", "вставить зуб", "отсутствует зуб"],
  },
  {
    id: "whitening",
    name: "Отбеливание",
    emoji: "✨",
    priceFrom: 120,
    priceTo: 150,
    duration: "45–60 мин",
    tagline: "Белоснежная улыбка",
    desc: "Профессиональное отбеливание зубов до 6–8 тонов за один визит без вреда для эмали.",
    keywords: ["отбел", "белые зубы", "жёлтые зубы"],
  },
];

const DOCTORS = [
  {
    id: "d1",
    name: "Раджабов Шодмон",
    role: "Главный врач · Хирург-имплантолог",
    experience: "Опыт работы более 15 лет",
    phone: "+998 97 911 44 00",
    rating: 4.9,
    reviews: 410,
    initials: "РШ",
  },
  {
    id: "d2",
    name: "Арифджанов Сафо",
    role: "Главный врач",
    experience: "Опыт работы более 40 лет",
    phone: "+998 90 250 39 13",
    rating: 5.0,
    reviews: 520,
    initials: "АС",
  },
  {
    id: "d3",
    name: "Арифджанова Юлдуз",
    role: "Дентист",
    experience: "Опыт работы более 7 лет",
    phone: "+998 97 920 00 44",
    rating: 4.8,
    reviews: 150,
    initials: "АЮ",
  },
];

/* ------------------------------------------------------------------ */
/* TELEGRAM + BACKEND INTEGRATION                                      */
/* ------------------------------------------------------------------ */

const tg = typeof window !== "undefined" ? window.Telegram?.WebApp : null;

function getTelegramUser() {
  return tg?.initDataUnsafe?.user || null;
}

// Отправляет реальную запись на сервер: сохраняет в базу и присылает
// пациенту подтверждение прямо в Telegram. Возвращает { ok, error }.
async function submitBookingToServer({ treatment, doctor, date, time, phone }) {
  const user = getTelegramUser();
  const name = user ? [user.first_name, user.last_name].filter(Boolean).join(" ") : "Пациент";

  try {
    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        initData: tg?.initData || "",
        name,
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

/* ------------------------------------------------------------------ */
/* HELPERS                                                              */
/* ------------------------------------------------------------------ */

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

const TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

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
    { id: "home", label: "Главная", icon: HomeIcon },
    { id: "doctors", label: "Врачи", icon: Users },
    { id: "assistant", label: "AI Ассистент", icon: Sparkles },
    { id: "profile", label: "Профиль", icon: User },
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

function HomeScreen({ navigate, appointment }) {
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
        <div className="w-9 h-9" />
      </div>

      <div className="px-5 mt-4">
        <div
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{ background: heroGradient }}
        >
          <div className="relative z-10" style={{ maxWidth: "70%" }}>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 21, color: "#fff", lineHeight: 1.2 }}>
              Здоровые зубы. Уверенная улыбка.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12.5, marginTop: 8, fontFamily: "Inter, sans-serif" }}>
              Профессиональная стоматология для всей семьи в Самарканде.
            </p>
            <button
              onClick={() => navigate("assistant")}
              className="mt-4 px-4 py-2.5 rounded-full flex items-center gap-1.5"
              style={{ background: btnGradient }}
            >
              <span style={{ color: "#fff", fontSize: 12.5, fontWeight: 700, fontFamily: "Inter, sans-serif" }}>
                Бесплатная консультация
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
          { label: "Врачи", icon: Users, target: "doctors" },
          { label: "Запись", icon: Calendar, target: "booking" },
          { label: "Услуги", icon: ToothIconWrap, target: "treatments" },
          { label: "AI Помощь", icon: Sparkles, target: "assistant" },
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
          Ближайшая запись
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
                {appointment.treatment.name}
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
              Пока нет предстоящих записей
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.cyanDark, fontFamily: "Inter, sans-serif" }}>
              Записаться →
            </span>
          </button>
        )}
      </div>

      <div className="px-5 mt-5 flex items-center justify-between">
        <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 14.5, color: C.textDark }}>
          Популярные услуги
        </h3>
        <button onClick={() => navigate("treatments")} style={{ fontSize: 11.5, color: C.cyanDark, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>
          Все →
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
              {t.name}
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
      <ScreenHeader title="Услуги клиники" onBack={() => navigate("home")} />
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
                {t.name}
              </p>
              <p style={{ fontSize: 11, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{t.tagline}</p>
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
      <div className="p-5 pb-12 relative overflow-hidden" style={{ background: heroGradient }}>
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
            {treatment.name}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, marginTop: 4, fontFamily: "Inter, sans-serif" }}>
            {treatment.tagline}
          </p>
        </div>
      </div>

      <div className="px-5 -mt-4">
        <div className="rounded-2xl p-4 flex items-center justify-around" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
          <div className="flex flex-col items-center gap-1">
            <Clock size={15} color={C.cyanDark} />
            <span style={{ fontSize: 10.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{treatment.duration}</span>
          </div>
          <div style={{ width: 1, height: 28, background: C.border }} />
          <div className="flex flex-col items-center gap-1">
            <ShieldCheck size={15} color={C.cyanDark} />
            <span style={{ fontSize: 10.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>Гарантия</span>
          </div>
          <div style={{ width: 1, height: 28, background: C.border }} />
          <div className="flex flex-col items-center gap-1">
            <span style={{ fontSize: 13, fontWeight: 800, color: C.textDark, fontFamily: "Inter, sans-serif" }}>
              {priceLabel(treatment)}
            </span>
            <span style={{ fontSize: 10, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>Стоимость</span>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5">
        <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 14, color: C.textDark }}>
          Об услуге
        </h3>
        <p style={{ fontSize: 12.5, color: C.textMuted, marginTop: 6, lineHeight: 1.6, fontFamily: "Inter, sans-serif" }}>
          {treatment.desc}
        </p>
        <div className="flex flex-col gap-2 mt-4">
          {["Безопасно и эффективно", "Современное оборудование", "Опытные врачи клиники"].map((f) => (
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
            Записаться на приём
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
      <ScreenHeader title="Наши врачи" onBack={() => navigate("home")} />
      <div className="px-5 flex flex-col gap-2.5 mt-1">
        {DOCTORS.map((d) => (
          <div key={d.id} className="rounded-2xl p-4 flex items-center gap-3" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
            <Avatar initials={d.initials} size={50} />
            <div className="flex-1">
              <p style={{ fontSize: 13.5, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{d.name}</p>
              <p style={{ fontSize: 11, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{d.role}</p>
              <p style={{ fontSize: 10.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{d.experience}</p>
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
              <span style={{ fontSize: 11, fontWeight: 700, color: C.cyanDark, fontFamily: "Inter, sans-serif" }}>Выбрать</span>
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
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const days = getNextDays(5);
  const activeTreatment = treatment || TREATMENTS[0];
  const availableTimes = TIME_SLOTS.filter(
    (t) => !selDoctor || !selDate || !blockedSlots?.[slotKey(selDoctor.id, selDate.key, t)]
  );

  const canConfirm = selDoctor && selDate && selTime && phone.trim();

  async function handleConfirmClick() {
    setSubmitting(true);
    setSubmitError("");
    const result = await submitBookingToServer({ treatment: activeTreatment, doctor: selDoctor, date: selDate, time: selTime, phone });
    setSubmitting(false);
    if (!result.ok) {
      setSubmitError(result.error);
      return;
    }
    onConfirm({ treatment: activeTreatment, doctor: selDoctor, date: selDate, time: selTime });
  }

  return (
    <div className="flex-1 overflow-y-auto pb-4 flex flex-col">
      <ScreenHeader title="Запись на приём" onBack={() => navigate("home")} />

      <div className="px-5">
        <div className="rounded-2xl p-3.5 flex items-center gap-3 mb-4" style={{ background: "rgba(47,196,217,0.1)" }}>
          <span style={{ fontSize: 22 }}>{activeTreatment.emoji}</span>
          <div className="flex-1">
            <p style={{ fontSize: 13, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{activeTreatment.name}</p>
            <p style={{ fontSize: 11, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{priceLabel(activeTreatment)}</p>
          </div>
        </div>

        <p style={{ fontSize: 12.5, fontWeight: 700, color: C.textDark, marginBottom: 8, fontFamily: "Inter, sans-serif" }}>
          Выберите врача
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
                <p style={{ fontSize: 10.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{d.role}</p>
                <p style={{ fontSize: 10, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{d.experience}</p>
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
          Выберите день
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
          Выберите время
        </p>
        {selDoctor && selDate && availableTimes.length === 0 ? (
          <p style={{ fontSize: 11.5, color: C.textMuted, marginBottom: 12, fontFamily: "Inter, sans-serif" }}>
            На этот день у врача нет свободных слотов, выберите другой день.
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
            <p style={{ fontSize: 12.5, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>Визит в клинику</p>
            <p style={{ fontSize: 10.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{CLINIC.city}, {CLINIC.address}</p>
          </div>
        </div>

        <p style={{ fontSize: 12.5, fontWeight: 700, color: C.textDark, marginBottom: 8, fontFamily: "Inter, sans-serif" }}>
          Ваш телефон
        </p>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+998 90 123 45 67"
          type="tel"
          className="w-full px-4 py-3 rounded-2xl outline-none mb-4"
          style={{ background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 13, fontFamily: "Inter, sans-serif", color: C.textDark }}
        />
      </div>

      <div className="flex-1" />
      <div className="p-5 pt-3" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="flex items-center justify-between mb-3">
          <span style={{ fontSize: 12.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>Стоимость</span>
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
            {submitting ? "Записываем…" : "Подтвердить запись"}
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

function ProfileScreen({ navigate, appointment, loggedDoctor }) {
  return (
    <div className="flex-1 overflow-y-auto pb-4">
      <ScreenHeader title="Клиника" onBack={() => navigate("home")} />
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
              Ваша ближайшая запись
            </p>
            <p style={{ fontSize: 12.5, color: C.textDark, fontFamily: "Inter, sans-serif" }}>
              {appointment.treatment.name} · {appointment.doctor.name}
            </p>
            <p style={{ fontSize: 11.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>
              {appointment.date.weekday} {appointment.date.day} {appointment.date.month}, {appointment.time}
            </p>
          </div>
        )}

        <button
          onClick={() => navigate(loggedDoctor ? "doctorPanel" : "doctorLogin")}
          className="rounded-2xl p-4 flex items-center gap-3 mt-1"
          style={{ background: C.cardWhite, border: `1px dashed ${C.border}` }}
        >
          <Users size={16} color={C.textMuted} />
          <span style={{ fontSize: 12, color: C.textMuted, fontFamily: "Inter, sans-serif", flex: 1, textAlign: "left" }}>
            Вход для персонала клиники
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

const QUICK_TOPICS = ["Болит зуб", "Хочу отбелить зубы", "Интересуют брекеты", "Нужен имплант", "Сколько стоит консультация?"];

function AssistantScreen({ navigate, onBookAppointment, blockedSlots }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Здравствуйте! Я — AI-ассистент клиники Dr. Radjabov 🦷 Расскажите, что вас беспокоит, и я подскажу подходящее лечение, цену и запишу на приём.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingStep, setBookingStep] = useState(null); // null|doctor|date|time|confirm|done
  const [draft, setDraft] = useState({ doctor: null, date: null, time: null });
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      const reply = data.reply || "Извините, не удалось получить ответ. Попробуйте ещё раз.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Извините, произошла ошибка соединения. Но я всё равно могу помочь с записью на приём 👇" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function startBooking() {
    setBookingStep("doctor");
    addAssistantMsg("Отлично! Уточню пару деталей для записи 🙂 К какому врачу вас записать?");
  }

  function pickDoctor(doc) {
    setDraft((d) => ({ ...d, doctor: doc }));
    setMessages((m) => [...m, { role: "user", content: doc.name }]);
    setBookingStep("date");
    addAssistantMsg(`Записываю к ${doc.name}. Выберите удобный день:`);
  }

  function pickDate(day) {
    setDraft((d) => ({ ...d, date: day }));
    setMessages((m) => [...m, { role: "user", content: `${day.weekday} ${day.day} ${day.month}` }]);
    setBookingStep("time");
    addAssistantMsg("Отлично, теперь выберите удобное время:");
  }

  function pickTime(time) {
    setDraft((d) => ({ ...d, time }));
    setMessages((m) => [...m, { role: "user", content: time }]);
    setBookingStep("confirm");
  }

  async function confirmBooking() {
    if (!phone.trim()) {
      setSubmitError("Впишите номер телефона для связи");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    const treatment = guessTreatmentFromMessages(messages);
    const result = await submitBookingToServer({ treatment, doctor: draft.doctor, date: draft.date, time: draft.time, phone });
    setSubmitting(false);
    if (!result.ok) {
      setSubmitError(result.error);
      return;
    }
    const appt = { treatment, doctor: draft.doctor, date: draft.date, time: draft.time };
    onBookAppointment(appt);
    setBookingStep("done");
    addAssistantMsg(`Готово! Запись подтверждена ✅ Ждём вас ${draft.date.weekday} ${draft.date.day} ${draft.date.month} в ${draft.time}. Подтверждение пришло вам в Telegram. Хорошего дня!`);
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
            {QUICK_TOPICS.map((q) => (
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
              Подтвердите запись
            </p>
            <div className="flex items-center gap-2 mb-1.5">
              <span style={{ fontSize: 16 }}>{treatmentGuess.emoji}</span>
              <span style={{ fontSize: 12.5, color: C.textDark, fontFamily: "Inter, sans-serif" }}>
                {treatmentGuess.name} · {priceLabel(treatmentGuess)}
              </span>
            </div>
            <p style={{ fontSize: 12, color: C.textDark, marginBottom: 2, fontFamily: "Inter, sans-serif" }}>{draft.doctor?.name}</p>
            <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 10, fontFamily: "Inter, sans-serif" }}>
              {draft.date?.weekday} {draft.date?.day} {draft.date?.month} · {draft.time}
            </p>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ваш телефон для связи"
              type="tel"
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
                {submitting ? "Записываем…" : "Подтвердить запись"}
              </span>
            </button>
          </div>
        )}

        {bookingStep === "done" && (
          <button onClick={() => navigate("home")} className="w-full py-2.5 rounded-full flex items-center justify-center gap-1.5" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
            <CheckCircle2 size={14} color={C.cyanDark} />
            <span style={{ fontSize: 12.5, fontWeight: 700, color: C.cyanDark, fontFamily: "Inter, sans-serif" }}>На главный экран</span>
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
            <span style={{ fontSize: 12, fontWeight: 700, color: C.cyanDark, fontFamily: "Inter, sans-serif" }}>Записаться на приём</span>
          </button>
        </div>
      )}

      {!bookingStep && (
        <div className="p-4 flex items-center gap-2" style={{ borderTop: `1px solid ${C.border}` }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Напишите ваш вопрос..."
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
      if (!res.ok) setError(res.error || "Не удалось загрузить записи");
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
      <ScreenHeader title="Мои записи" onBack={() => navigate("home")} />

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
            У вас пока нет предстоящих записей.
          </p>
        </div>
      )}

      <div className="px-5 flex flex-col gap-3 mt-2">
        {bookings.map((b) => (
          <div key={b.id} className="rounded-2xl p-4" style={{ background: C.cardWhite, border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 13.5, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{b.service}</p>
            {b.doctor && (
              <p style={{ fontSize: 11.5, color: C.textMuted, marginTop: 2, fontFamily: "Inter, sans-serif" }}>Врач: {b.doctor}</p>
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
                {cancellingId === b.id ? "Отменяем…" : "Отменить запись"}
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
    setUnlocked(true);
  }

  if (!unlocked) {
    return (
      <div className="flex-1 overflow-y-auto pb-4">
        <ScreenHeader title="Кабинет врача" onBack={() => navigate("profile")} />
        <div className="px-5 mb-4">
          <p style={{ fontSize: 11.5, color: C.textMuted, lineHeight: 1.5, fontFamily: "Inter, sans-serif" }}>
            Этот раздел только для сотрудников клиники. Введите пароль администратора.
          </p>
        </div>
        <div className="px-5">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
            placeholder="Пароль"
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
              {checking ? "Проверяем…" : "Войти"}
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pb-4">
      <ScreenHeader title="Кабинет врача" onBack={() => navigate("profile")} />
      <div className="px-5 mb-4">
        <p style={{ fontSize: 11.5, color: C.textMuted, lineHeight: 1.5, fontFamily: "Inter, sans-serif" }}>
          Выберите себя из списка, чтобы открыть свой кабинет.
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
              <p style={{ fontSize: 10.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{d.role}</p>
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
      <ScreenHeader title="Мой кабинет" onBack={() => navigate("profile")} />

      <div className="px-5 flex items-center gap-3 mb-4">
        <Avatar initials={doctor.initials} size={46} />
        <div className="flex-1">
          <p style={{ fontSize: 13.5, fontWeight: 700, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{doctor.name}</p>
          <p style={{ fontSize: 11, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>{doctor.role}</p>
        </div>
        <button onClick={onLogout} style={{ fontSize: 11, fontWeight: 700, color: C.cyanDark, fontFamily: "Inter, sans-serif" }}>
          Выйти
        </button>
      </div>

      <div className="px-5 flex gap-2 mb-4">
        <button
          onClick={() => setTab("schedule")}
          className="flex-1 py-2 rounded-full"
          style={{ background: tab === "schedule" ? btnGradient : C.cardWhite, border: `1px solid ${tab === "schedule" ? "transparent" : C.border}` }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: tab === "schedule" ? "#fff" : C.textDark, fontFamily: "Inter, sans-serif" }}>Расписание</span>
        </button>
        <button
          onClick={() => setTab("settings")}
          className="flex-1 py-2 rounded-full"
          style={{ background: tab === "settings" ? btnGradient : C.cardWhite, border: `1px solid ${tab === "settings" ? "transparent" : C.border}` }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: tab === "settings" ? "#fff" : C.textDark, fontFamily: "Inter, sans-serif" }}>Настройки клиники</span>
        </button>
      </div>

      {tab === "schedule" && (
        <>
          {myAppointment && (
            <div className="px-5 mb-4">
              <div className="rounded-2xl p-3.5" style={{ background: "rgba(47,196,217,0.1)" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: C.cyanDark, marginBottom: 4, fontFamily: "Inter, sans-serif" }}>
                  Ближайшая запись к вам
                </p>
                <p style={{ fontSize: 12.5, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{myAppointment.treatment.name}</p>
                <p style={{ fontSize: 11.5, color: C.textMuted, fontFamily: "Inter, sans-serif" }}>
                  {myAppointment.date.weekday} {myAppointment.date.day} {myAppointment.date.month} · {myAppointment.time}
                </p>
              </div>
            </div>
          )}

          <div className="px-5 mb-2">
            <p style={{ fontSize: 12.5, fontWeight: 700, color: C.textDark, marginBottom: 8, fontFamily: "Inter, sans-serif" }}>
              Управление расписанием
            </p>
            <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 10, fontFamily: "Inter, sans-serif" }}>
              Нажмите на время, чтобы закрыть или открыть слот для записи клиентов.
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
                    {blocked ? "закрыто" : "свободно"}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {tab === "settings" && (
        <div className="px-5">
          <p style={{ fontSize: 11.5, fontWeight: 700, color: C.textDark, marginBottom: 6, fontFamily: "Inter, sans-serif" }}>Адрес</p>
          <input
            value={form.address}
            onChange={(e) => { setForm((f) => ({ ...f, address: e.target.value })); setSaved(false); }}
            className="w-full px-3.5 py-2.5 rounded-xl outline-none mb-3"
            style={{ background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 12.5, fontFamily: "Inter, sans-serif", color: C.textDark }}
          />

          <p style={{ fontSize: 11.5, fontWeight: 700, color: C.textDark, marginBottom: 6, fontFamily: "Inter, sans-serif" }}>Телефоны</p>
          <input
            value={form.phone1}
            onChange={(e) => { setForm((f) => ({ ...f, phone1: e.target.value })); setSaved(false); }}
            placeholder="Телефон 1"
            className="w-full px-3.5 py-2.5 rounded-xl outline-none mb-2"
            style={{ background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 12.5, fontFamily: "Inter, sans-serif", color: C.textDark }}
          />
          <input
            value={form.phone2}
            onChange={(e) => { setForm((f) => ({ ...f, phone2: e.target.value })); setSaved(false); }}
            placeholder="Телефон 2 (необязательно)"
            className="w-full px-3.5 py-2.5 rounded-xl outline-none mb-3"
            style={{ background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 12.5, fontFamily: "Inter, sans-serif", color: C.textDark }}
          />

          <p style={{ fontSize: 11.5, fontWeight: 700, color: C.textDark, marginBottom: 6, fontFamily: "Inter, sans-serif" }}>Часы работы</p>
          <input
            value={form.hours}
            onChange={(e) => { setForm((f) => ({ ...f, hours: e.target.value })); setSaved(false); }}
            className="w-full px-3.5 py-2.5 rounded-xl outline-none mb-2"
            style={{ background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 12.5, fontFamily: "Inter, sans-serif", color: C.textDark }}
          />
          <input
            value={form.lunch}
            onChange={(e) => { setForm((f) => ({ ...f, lunch: e.target.value })); setSaved(false); }}
            placeholder="Обед"
            className="w-full px-3.5 py-2.5 rounded-xl outline-none mb-2"
            style={{ background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 12.5, fontFamily: "Inter, sans-serif", color: C.textDark }}
          />
          <input
            value={form.dayOff}
            onChange={(e) => { setForm((f) => ({ ...f, dayOff: e.target.value })); setSaved(false); }}
            placeholder="Выходной"
            className="w-full px-3.5 py-2.5 rounded-xl outline-none mb-4"
            style={{ background: C.cardWhite, border: `1px solid ${C.border}`, fontSize: 12.5, fontFamily: "Inter, sans-serif", color: C.textDark }}
          />

          <p style={{ fontSize: 11.5, fontWeight: 700, color: C.textDark, marginBottom: 8, fontFamily: "Inter, sans-serif" }}>Цены на услуги ($)</p>
          {TREATMENTS.filter((t) => !t.free).map((t) => (
            <div key={t.id} className="flex items-center gap-2 mb-2">
              <span style={{ flex: 1, fontSize: 12, color: C.textDark, fontFamily: "Inter, sans-serif" }}>{t.name}</span>
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
              {saving ? "Сохраняем…" : saved ? "Сохранено ✓" : "Сохранить изменения"}
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

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
    }
    loadClinicSettings().then((fetchedBlockedSlots) => {
      setBlockedSlots(fetchedBlockedSlots);
      setConfigVersion((v) => v + 1); // перерисовать экраны с новыми ценами/адресом
    });
  }, []);

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
  if (screen === "home") body = <HomeScreen navigate={navigate} appointment={appointment} />;
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
    body = <ProfileScreen navigate={navigate} appointment={appointment} loggedDoctor={loggedDoctor} />;
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
          setScreen("profile");
        }}
        appointment={appointment}
        onSettingsSaved={() => setConfigVersion((v) => v + 1)}
      />
    );

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
