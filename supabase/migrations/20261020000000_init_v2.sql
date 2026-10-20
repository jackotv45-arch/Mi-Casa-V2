-- MI CASA V2 — schéma initial (nouveau projet Supabase)
-- À exécuter dans SQL Editor après création du projet.

create extension if not exists "pgcrypto";

create table if not exists public.hotels (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  ville text not null,
  description text,
  image text,
  created_at timestamptz default now()
);

create table if not exists public.chambres (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid references public.hotels(id) on delete cascade,
  nom text not null,
  description text,
  prix numeric not null default 0,
  capacite int not null default 2,
  images text[] default '{}',
  actif boolean default true,
  created_at timestamptz default now()
);

alter table public.hotels enable row level security;
alter table public.chambres enable row level security;

create policy "hotels public read" on public.hotels for select using (true);
create policy "chambres public read" on public.chambres for select using (actif = true);

-- Seed minimal (remplaçable par le client)
insert into public.hotels (nom, ville, description, image) values
  ('MI CASA Libreville', 'Libreville', 'Face à la mer, chambres lumineuses.', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80'),
  ('MI CASA Port-Gentil', 'Port-Gentil', 'Au cœur de la capitale économique.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80'),
  ('MI CASA Franceville', 'Franceville', 'Accueil chaleureux au centre du pays.', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=80')
on conflict do nothing;
