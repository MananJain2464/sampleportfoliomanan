-- Portfolio Database Schema
-- Run this in Supabase SQL Editor: https://app.supabase.com → SQL Editor

-- Config table (stores hashed admin password)
create table if not exists config (
  id    uuid primary key default gen_random_uuid(),
  key   text unique not null,
  value text not null
);

-- Personal info (single row)
create table if not exists personal (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  designation text,
  bio         text,
  email       text,
  phone       text,
  address     text,
  github      text,
  linkedin    text,
  twitter     text,
  leetcode    text,
  instagram   text,
  resume_url  text,
  updated_at  timestamptz default now()
);

-- Projects
create table if not exists projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  tools       text[] default '{}',
  role        text,
  github_url  text,
  demo_url    text,
  category    text,   -- 'ML/MLOps' | 'Generative AI' | 'Web Dev'
  visible     boolean default true,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- Timeline (experience + education combined)
create table if not exists timeline (
  id           uuid primary key default gen_random_uuid(),
  type         text not null,  -- 'experience' | 'education'
  title        text not null,
  organization text,
  duration     text,
  description  text,
  tags         text[] default '{}',
  link         text,
  sort_order   int default 0
);

-- Credentials (certificates + competitions)
create table if not exists credentials (
  id       uuid primary key default gen_random_uuid(),
  type     text not null,  -- 'certificate' | 'competition'
  name     text not null,
  issuer   text,
  date     text,
  category text,
  link     text,
  result   text            -- e.g. 'Runner-Up', 'Special Mention'
);

-- Skills
create table if not exists skills (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  category   text,  -- 'Languages' | 'Frameworks' | 'Tools' | 'Cloud'
  sort_order int default 0
);

-- Notes (Notespace)
create table if not exists notes (
  id         uuid primary key default gen_random_uuid(),
  title      text,
  content    text,
  type       text default 'text',  -- 'text' | 'image' | 'video' | 'link'
  tags       text[] default '{}',
  url        text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: Allow public reads, restrict writes to authenticated/service role
-- For simplicity, enable public read on all tables (anon key can read)
-- Writes are done via service-role key OR anon key (since no auth login is used)
-- Note: In production, tighten RLS policies as needed.

alter table config       enable row level security;
alter table personal     enable row level security;
alter table projects     enable row level security;
alter table timeline     enable row level security;
alter table credentials  enable row level security;
alter table skills       enable row level security;
alter table notes        enable row level security;

-- Public read-only for portfolio sections
create policy "public read config"       on config       for select using (true);
create policy "public read personal"     on personal     for select using (true);
create policy "public read projects"     on projects     for select using (visible = true);
create policy "admin read projects"      on projects     for select using (true);
create policy "public read timeline"     on timeline     for select using (true);
create policy "public read credentials"  on credentials  for select using (true);
create policy "public read skills"       on skills       for select using (true);
create policy "public read notes"        on notes        for select using (true);

-- Full access via anon key (password gate is enforced in the app, not DB)
-- This is acceptable since data is not sensitive (portfolio content + notes)
create policy "anon all config"       on config       for all using (true) with check (true);
create policy "anon all personal"     on personal     for all using (true) with check (true);
create policy "anon all projects"     on projects     for all using (true) with check (true);
create policy "anon all timeline"     on timeline     for all using (true) with check (true);
create policy "anon all credentials"  on credentials  for all using (true) with check (true);
create policy "anon all skills"       on skills       for all using (true) with check (true);
create policy "anon all notes"        on notes        for all using (true) with check (true);
