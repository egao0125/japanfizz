create extension if not exists pgcrypto;

create type public.user_status as enum ('active', 'suspended', 'deleted');
create type public.post_status as enum ('visible', 'pending', 'hidden', 'blocked', 'deleted');
create type public.report_status as enum ('pending', 'reviewing', 'resolved', 'dismissed');
create type public.moderation_action as enum ('allow', 'needs_review', 'block');
create type public.market_kind as enum ('sell', 'recruit');

create table public.universities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  email_domain text not null unique,
  launch_status text not null default 'beta',
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  university_id uuid not null references public.universities(id),
  email text not null unique,
  role text not null default 'student',
  status public.user_status not null default 'active',
  blocked_user_ids uuid[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities(id),
  user_id uuid not null references public.profiles(id) on delete cascade,
  category text not null check (category in ('class', 'circle', 'career', 'market', 'event')),
  body text not null check (char_length(body) between 8 and 280),
  status public.post_status not null default 'pending',
  hot_score integer not null default 0,
  comment_count integer not null default 0,
  report_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  university_id uuid not null references public.universities(id),
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 2 and 220),
  status public.post_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  post_id uuid not null references public.posts(id) on delete cascade,
  value integer not null check (value in (-1, 1)),
  created_at timestamptz not null default now(),
  unique (user_id, post_id)
);

create table public.class_reviews (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities(id),
  user_id uuid references public.profiles(id) on delete set null,
  class_name text not null,
  professor_name text,
  easy_score numeric not null check (easy_score >= 1 and easy_score <= 5),
  attendance text not null,
  assignment_load text not null,
  exam_format text not null,
  body text,
  created_at timestamptz not null default now()
);

create table public.market_items (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities(id),
  user_id uuid references public.profiles(id) on delete set null,
  kind public.market_kind not null,
  title text not null,
  body text not null,
  value text not null,
  status public.post_status not null default 'visible',
  created_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities(id),
  reporter_user_id uuid not null references public.profiles(id) on delete cascade,
  target_type text not null check (target_type in ('post', 'comment', 'market_item', 'profile')),
  target_id uuid not null,
  reason text not null,
  details text,
  status public.report_status not null default 'pending',
  reviewer_user_id uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.moderation_events (
  id uuid primary key default gen_random_uuid(),
  university_id uuid references public.universities(id),
  target_type text not null check (target_type in ('post', 'comment', 'market_item')),
  target_id uuid,
  user_id uuid references public.profiles(id) on delete set null,
  action public.moderation_action not null,
  reason text,
  risk_score numeric not null default 0,
  created_at timestamptz not null default now()
);

create table public.beta_invites (
  id uuid primary key default gen_random_uuid(),
  university_id uuid references public.universities(id),
  email text not null unique,
  source text not null default 'waitlist',
  status text not null default 'invited',
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at
before update on public.profiles
for each row execute function public.touch_updated_at();

create trigger posts_touch_updated_at
before update on public.posts
for each row execute function public.touch_updated_at();

create index posts_university_status_created_idx on public.posts (university_id, status, created_at desc);
create index comments_post_status_created_idx on public.comments (post_id, status, created_at);
create index reports_university_status_created_idx on public.reports (university_id, status, created_at desc);
create index class_reviews_university_class_idx on public.class_reviews (university_id, class_name);
create index market_items_university_status_created_idx on public.market_items (university_id, status, created_at desc);
