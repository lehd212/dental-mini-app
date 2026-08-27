-- Выполните этот скрипт в Supabase: Project → SQL Editor → New query → вставить → Run.
-- Скрипт безопасно перезапускать повторно (IF NOT EXISTS) — если что-то уже
-- создано раньше, ошибки не будет, просто ничего не изменится.

-- Таблица записей на приём
create table if not exists bookings (
  id bigint generated always as identity primary key,
  telegram_user_id bigint not null,
  telegram_chat_id bigint not null,
  name text not null,
  phone text not null,
  service text not null,
  doctor text,
  appointment_date date not null,
  appointment_time text not null,
  status text default 'confirmed',
  reminder_sent boolean default false,
  created_at timestamptz default now()
);

create index if not exists idx_bookings_reminder
  on bookings (reminder_sent, status, appointment_date);

-- Заблокированные врачами слоты времени (когда врач не может принять)
create table if not exists blocked_slots (
  id bigint generated always as identity primary key,
  doctor_id text not null,
  slot_date date not null,
  slot_time text not null,
  created_at timestamptz default now(),
  unique (doctor_id, slot_date, slot_time)
);

-- Настройки клиники (адрес, телефон, часы, цены) — редактируются из
-- кабинета врача в приложении, без необходимости менять код.
create table if not exists clinic_settings (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);

-- Telegram-аккаунты врачей/администраторов, которые хотя бы раз вошли в
-- кабинет по паролю — им будут приходить уведомления о новых записях.
create table if not exists staff_telegram (
  telegram_user_id bigint primary key,
  name text,
  added_at timestamptz default now()
);
