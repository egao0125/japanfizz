alter table public.universities enable row level security;
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.votes enable row level security;
alter table public.class_reviews enable row level security;
alter table public.market_items enable row level security;
alter table public.reports enable row level security;
alter table public.moderation_events enable row level security;
alter table public.beta_invites enable row level security;

create or replace function public.current_profile()
returns public.profiles
language sql
stable
security definer
set search_path = public
as $$
  select *
  from public.profiles
  where id = auth.uid()
  limit 1
$$;

create or replace function public.current_university_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select university_id
  from public.profiles
  where id = auth.uid()
  limit 1
$$;

create or replace function public.current_user_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('admin', 'moderator')
      and status = 'active'
  )
$$;

create policy "Universities are readable by authenticated users"
on public.universities for select
to authenticated
using (true);

create policy "Profiles can read same university profiles with limited use"
on public.profiles for select
to authenticated
using (university_id = public.current_university_id());

create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "Same university can read visible posts"
on public.posts for select
to authenticated
using (
  university_id = public.current_university_id()
  and (
    status = 'visible'
    or user_id = auth.uid()
    or public.current_user_is_admin()
  )
);

create policy "Active users can create posts for their university"
on public.posts for insert
to authenticated
with check (
  user_id = auth.uid()
  and university_id = public.current_university_id()
  and (public.current_profile()).status = 'active'
);

create policy "Owners can soft update own posts"
on public.posts for update
to authenticated
using (user_id = auth.uid() or public.current_user_is_admin())
with check (university_id = public.current_university_id());

create policy "Same university can read visible comments"
on public.comments for select
to authenticated
using (
  university_id = public.current_university_id()
  and (
    status = 'visible'
    or user_id = auth.uid()
    or public.current_user_is_admin()
  )
);

create policy "Active users can create comments"
on public.comments for insert
to authenticated
with check (
  user_id = auth.uid()
  and university_id = public.current_university_id()
  and (public.current_profile()).status = 'active'
);

create policy "Owners and admins can update comments"
on public.comments for update
to authenticated
using (user_id = auth.uid() or public.current_user_is_admin())
with check (university_id = public.current_university_id());

create policy "Users can manage their votes"
on public.votes for all
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "Same university can read class reviews"
on public.class_reviews for select
to authenticated
using (university_id = public.current_university_id());

create policy "Active users can create class reviews"
on public.class_reviews for insert
to authenticated
with check (
  university_id = public.current_university_id()
  and (user_id is null or user_id = auth.uid())
  and (public.current_profile()).status = 'active'
);

create policy "Same university can read visible market items"
on public.market_items for select
to authenticated
using (
  university_id = public.current_university_id()
  and (
    status = 'visible'
    or user_id = auth.uid()
    or public.current_user_is_admin()
  )
);

create policy "Active users can create market items"
on public.market_items for insert
to authenticated
with check (
  university_id = public.current_university_id()
  and (user_id is null or user_id = auth.uid())
  and (public.current_profile()).status = 'active'
);

create policy "Users can create reports"
on public.reports for insert
to authenticated
with check (
  reporter_user_id = auth.uid()
  and university_id = public.current_university_id()
);

create policy "Admins can read and update reports"
on public.reports for all
to authenticated
using (public.current_user_is_admin() and university_id = public.current_university_id())
with check (public.current_user_is_admin() and university_id = public.current_university_id());

create policy "Admins can read moderation events"
on public.moderation_events for select
to authenticated
using (public.current_user_is_admin());

create policy "Authenticated users can join beta waitlist"
on public.beta_invites for insert
to authenticated
with check (true);

create policy "Admins can manage beta waitlist"
on public.beta_invites for all
to authenticated
using (public.current_user_is_admin())
with check (public.current_user_is_admin());
