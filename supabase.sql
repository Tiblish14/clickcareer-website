-- ClickCareer Supabase schema
-- Run this once in Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamp with time zone default timezone('utc', now()) not null,
  updated_at timestamp with time zone default timezone('utc', now()) not null
);

create table if not exists public.leads (
  id text primary key,
  user_id uuid references auth.users(id) on delete set null,
  user_email text,
  course_id text,
  course_title text not null,
  status text default 'pending' not null,
  created_at timestamp with time zone default timezone('utc', now()) not null
);

create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  subject text not null,
  status text default 'new' not null,
  created_at timestamp with time zone default timezone('utc', now()) not null
);

create table if not exists public.partner_requests (
  id uuid primary key default gen_random_uuid(),
  organization_name text not null,
  contact_person text not null,
  phone text not null,
  email text not null,
  partnership_type text not null,
  status text default 'new' not null,
  created_at timestamp with time zone default timezone('utc', now()) not null
);

alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.demo_requests enable row level security;
alter table public.partner_requests enable row level security;

drop policy if exists "Profiles are readable by owner" on public.profiles;
drop policy if exists "Profiles are insertable by owner" on public.profiles;
drop policy if exists "Profiles are updatable by owner" on public.profiles;
drop policy if exists "Leads are readable by owner" on public.leads;
drop policy if exists "Leads are insertable by owner" on public.leads;
drop policy if exists "Anyone can submit demo requests" on public.demo_requests;
drop policy if exists "Anyone can submit partner requests" on public.partner_requests;

create policy "Profiles are readable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles are insertable by owner"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Leads are readable by owner"
  on public.leads for select
  using (auth.uid() = user_id);

create policy "Leads are insertable by owner"
  on public.leads for insert
  with check (auth.uid() = user_id);

create policy "Anyone can submit demo requests"
  on public.demo_requests for insert
  with check (true);

create policy "Anyone can submit partner requests"
  on public.partner_requests for insert
  with check (true);
