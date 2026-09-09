-- Run this in Supabase Dashboard → SQL Editor.
create extension if not exists "uuid-ossp";
create table if not exists public.categories (id uuid primary key default uuid_generate_v4(), name text not null unique, slug text not null unique);
create table if not exists public.products (id uuid primary key default uuid_generate_v4(), name text not null, description text, price numeric(12,2) not null check (price > 0), category text not null, stock integer not null default 0 check (stock >= 0), image_url text, is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
alter table public.categories enable row level security;
alter table public.products enable row level security;
create policy "Authenticated users manage categories" on public.categories for all to authenticated using (true) with check (true);
create policy "Authenticated users manage products" on public.products for all to authenticated using (true) with check (true);
insert into public.categories (name, slug) values ('Electronics', 'electronics'), ('Clothing', 'clothing'), ('Home & Living', 'home-living'), ('Accessories', 'accessories') on conflict (name) do nothing;

-- Run this after creating a public Storage bucket named `product-images` in Storage.
create policy "Authenticated users upload product images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images');
create policy "Public product images are readable" on storage.objects for select using (bucket_id = 'product-images');
create policy "Authenticated users update product images" on storage.objects for update to authenticated using (bucket_id = 'product-images');
create policy "Authenticated users delete product images" on storage.objects for delete to authenticated using (bucket_id = 'product-images');
