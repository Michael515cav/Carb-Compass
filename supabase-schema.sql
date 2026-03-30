-- Run this in your Supabase SQL editor

-- Users profile table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  display_name text,
  -- Insulin-to-carb ratio (e.g. 1 unit per 15g carbs → stored as 15)
  icr numeric(5,2) default 15,
  -- Correction factor (e.g. 1 unit drops BGL by 50 mg/dL → stored as 50)
  correction_factor numeric(5,2) default 50,
  -- Target BGL in mg/dL
  target_bgl numeric(5,2) default 120,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Food search history
create table public.food_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  food_name text not null,
  fdcid text,
  carbs_per_100g numeric(7,2),
  protein_per_100g numeric(7,2),
  fat_per_100g numeric(7,2),
  calories_per_100g numeric(7,2),
  searched_at timestamptz default now()
);

-- Saved recipes
create table public.recipes (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  prep_time_minutes int,
  cook_time_minutes int,
  servings int default 4,
  carbs_per_serving numeric(6,2),
  protein_per_serving numeric(6,2),
  fat_per_serving numeric(6,2),
  calories_per_serving numeric(6,2),
  ingredients jsonb default '[]',
  instructions jsonb default '[]',
  tags text[] default '{}',
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- User saved recipes (bookmarks)
create table public.saved_recipes (
  user_id uuid references public.profiles(id) on delete cascade,
  recipe_id uuid references public.recipes(id) on delete cascade,
  saved_at timestamptz default now(),
  primary key (user_id, recipe_id)
);

-- Freebie foods (curated list + user custom additions)
create table public.freebie_foods (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  carbs_per_serving numeric(5,2) default 0,
  serving_size text,
  notes text,
  is_global boolean default true,  -- true = shown to all users
  user_id uuid references public.profiles(id) on delete cascade,  -- null if global
  created_at timestamptz default now()
);

-- Seed some freebie foods
insert into public.freebie_foods (name, carbs_per_serving, serving_size, notes, is_global) values
  ('Celery', 1.2, '1 medium stalk', 'Great with peanut butter', true),
  ('Cucumber', 1.9, '1/2 cup sliced', 'Hydrating and crunchy', true),
  ('Spinach (raw)', 0.4, '1 cup', 'Packed with iron', true),
  ('Lettuce (romaine)', 0.7, '1 cup shredded', 'Base for low-carb wraps', true),
  ('Broccoli', 3.6, '1/2 cup', 'Under 5g counts as freebie for most', true),
  ('Cauliflower', 2.6, '1/2 cup', 'Great rice substitute', true),
  ('Zucchini', 1.7, '1/2 cup sliced', 'Versatile veggie', true),
  ('Bell pepper (green)', 2.3, '1/2 medium', 'Green lowest carb of peppers', true),
  ('Mushrooms', 1.1, '1/2 cup', 'Earthy and filling', true),
  ('Asparagus', 1.3, '4 spears', 'High in folate', true),
  ('Radishes', 0.9, '4 medium', 'Peppery crunch', true),
  ('Green beans', 3.6, '1/2 cup', 'Borderline but common freebie', true),
  ('Cabbage (raw)', 2.5, '1/2 cup shredded', 'Great for slaws', true),
  ('Dill pickles', 0.8, '1 medium spear', 'Check label for added sugar', true),
  ('Black coffee', 0, '8 oz', 'Zero carbs black', true),
  ('Sparkling water', 0, '12 oz', 'Any unflavored variety', true),
  ('Hard boiled egg', 0.6, '1 large', 'Protein + freebie', true),
  ('String cheese (mozzarella)', 0.7, '1 stick', 'Convenient snack', true);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.food_history enable row level security;
alter table public.saved_recipes enable row level security;
alter table public.freebie_foods enable row level security;
alter table public.recipes enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can view own food history" on public.food_history for select using (auth.uid() = user_id);
create policy "Users can insert own food history" on public.food_history for insert with check (auth.uid() = user_id);
create policy "Users can delete own food history" on public.food_history for delete using (auth.uid() = user_id);

create policy "Users can view own saved recipes" on public.saved_recipes for select using (auth.uid() = user_id);
create policy "Users can save recipes" on public.saved_recipes for insert with check (auth.uid() = user_id);
create policy "Users can unsave recipes" on public.saved_recipes for delete using (auth.uid() = user_id);

create policy "Anyone can view recipes" on public.recipes for select using (true);

create policy "Anyone can view global freebie foods" on public.freebie_foods for select using (is_global = true or auth.uid() = user_id);
create policy "Users can insert own freebie foods" on public.freebie_foods for insert with check (auth.uid() = user_id and is_global = false);
create policy "Users can delete own freebie foods" on public.freebie_foods for delete using (auth.uid() = user_id);
