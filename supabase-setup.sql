-- Выполните этот скрипт в Supabase: Project → SQL Editor → New query → вставить → Run
-- Он создаст таблицу для хранения записей на приём.

create table if not exists bookings (
  id bigint generated always as identity primary key,
  telegram_user_id bigint not null,
  telegram_chat_id bigint not null,
  name text not null,
  phone text not null,
  service text not null,
  doctor text, -- сюда пишется предпочтение по полу врача (Мужчина/Женщина/Неважно), пока нет имён конкретных врачей
  appointment_date date not null,
  appointment_time text not null,
  status text default 'confirmed',
  reminder_sent boolean default false,
  created_at timestamptz default now()
);

-- Индекс ускоряет поиск ближайших записей для напоминаний
create index if not exists idx_bookings_reminder
  on bookings (reminder_sent, status, appointment_date);
