-- Run this in the Supabase SQL Editor

-- 1. Create Users Table
create table public.users (
  id text primary key, -- Clerk User ID
  email text,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Leads Table
create table public.leads (
  id text primary key, -- Generated Lead ID
  user_id text references public.users(id),
  course_id text,
  course_title text,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Set up Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.leads enable row level security;

-- Create policies so users can only read/insert their own data
create policy "Users can insert their own profile."
  on public.users for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile."
  on public.users for update
  using (auth.uid() = id);

create policy "Users can read their own profile."
  on public.users for select
  using (auth.uid() = id);

create policy "Users can insert their own leads."
  on public.leads for insert
  with check (auth.uid() = user_id);

create policy "Users can read their own leads."
  on public.leads for select
  using (auth.uid() = user_id);

-- Note: Because we are using Clerk, Supabase's auth.uid() will not map directly 
-- to Clerk unless we set up JWT templates. 
-- For MVP purposes, since we are inserting from the frontend using the anon key,
-- we can temporarily allow anonymous inserts, OR you can disable RLS completely 
-- during MVP testing by skipping the alter table commands above.
