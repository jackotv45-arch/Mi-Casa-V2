# MI CASA HÔTEL — V2

Refonte premium parallèle à la v1. **Ne remplace pas** `Mi-Casa-Vercel`.

## Stack
- React 19 + Vite + TypeScript
- TanStack Router + Query
- Tailwind CSS v4
- Framer Motion
- Supabase (nouveau projet)

## Setup local
```bash
cp .env.example .env
npm install
npm run dev
```

## Supabase
1. Créer un projet sur https://supabase.com
2. SQL Editor → coller `supabase/migrations/20261020000000_init_v2.sql`
3. Copier URL + anon key dans `.env` et Vercel

## Deploy
Repo: https://github.com/jackotv45-arch/Mi-Casa-V2
