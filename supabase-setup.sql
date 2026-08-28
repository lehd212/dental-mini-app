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

-- === Обновление: защита от двойной записи на один и тот же слот ===
-- Добавляем doctor_id (техническое имя врача d1/d2/d3), чтобы можно было
-- сверять занятость слота так же, как это делает форма записи.
alter table bookings add column if not exists doctor_id text;

-- Гарантирует на уровне самой базы данных, что два пациента не смогут
-- одновременно занять одного и того же врача на одно и то же время —
-- даже если оба запроса пришли в один и тот же момент.
create unique index if not exists idx_unique_active_booking
  on bookings (doctor_id, appointment_date, appointment_time)
  where status = 'confirmed';

-- === Обновление: защита пароля врача от подбора ===
-- Считает неудачные попытки входа по Telegram-аккаунту, чтобы можно
-- было временно заблокировать после нескольких подряд неверных паролей.
create table if not exists admin_login_attempts (
  id bigint generated always as identity primary key,
  telegram_user_id bigint not null,
  attempted_at timestamptz default now()
);

create index if not exists idx_login_attempts_lookup
  on admin_login_attempts (telegram_user_id, attempted_at);

-- === Обновление: ограничение по количеству кресел в клинике ===
-- В клинике физически только 2 кресла — значит, в одно и то же время
-- (независимо от того, к какому врачу) может принимать не больше
-- 2 пациентов одновременно, даже если свободен третий врач.
-- Если у клиники появится третье кресло — поменяйте число 2 в строке
-- "if current_count >= 2" ниже на нужное количество и запустите
-- этот блок ещё раз.
create or replace function check_chair_capacity() returns trigger as $$
declare
  current_count int;
begin
  select count(*) into current_count
  from bookings
  where appointment_date = new.appointment_date
    and appointment_time = new.appointment_time
    and status = 'confirmed';

  if current_count >= 2 then
    raise exception 'CHAIR_CAPACITY_FULL';
  end if;

  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_check_chair_capacity on bookings;
create trigger trg_check_chair_capacity
  before insert on bookings
  for each row
  when (new.status = 'confirmed')
  execute function check_chair_capacity();
