-- =========================================================
-- Dayforge · Supabase schema
-- Paste into: Supabase Dashboard → SQL Editor → New query
-- =========================================================

-- Projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 60),
  color text not null default '#e8a54b',
  created_at timestamptz not null default now()
);

-- Tasks
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  project_id uuid references public.projects (id) on delete set null,
  title text not null check (char_length(title) between 1 and 160),
  notes text not null default '',
  priority smallint not null default 2 check (priority between 1 and 3),
  due_date date,
  is_done boolean not null default false,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists tasks_user_id_idx on public.tasks (user_id);
create index if not exists tasks_due_date_idx on public.tasks (due_date);
create index if not exists projects_user_id_idx on public.projects (user_id);

-- Row Level Security
alter table public.projects enable row level security;
alter table public.tasks enable row level security;

-- Projects policies
create policy "Users can view own projects"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "Users can insert own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update own projects"
  on public.projects for update
  using (auth.uid() = user_id);

create policy "Users can delete own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

-- Tasks policies
create policy "Users can view own tasks"
  on public.tasks for select
  using (auth.uid() = user_id);

create policy "Users can insert own tasks"
  on public.tasks for insert
  with check (auth.uid() = user_id);

create policy "Users can update own tasks"
  on public.tasks for update
  using (auth.uid() = user_id);

create policy "Users can delete own tasks"
  on public.tasks for delete
  using (auth.uid() = user_id);

-- Helpful view for dashboards (optional)
create or replace view public.task_stats as
select
  user_id,
  count(*) filter (where is_done = false) as active_count,
  count(*) filter (where is_done = true) as done_count,
  count(*) filter (where is_done = false and due_date <= current_date) as due_today_or_overdue
from public.tasks
group by user_id;
