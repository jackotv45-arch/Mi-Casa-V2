# MI CASA HÔTEL — Rapport de reprise complet
**Date :** 20 octobre 2026  
**Destinataire :** Claude / développeur suivant  
**Auteur contexte :** Grok (xAI) + client jackotv45-arch / ronnymboumba1-maker  

Ce document résume **tout** le projet depuis le début pour reprendre sans perte de contexte.

---

## 1. Identité du projet

| Élément | Valeur |
|--------|--------|
| **Nom** | MI CASA HÔTEL |
| **Slogan** | « L'art de bien se loger » |
| **Pays** | Gabon |
| **Villes / hôtels** | Libreville, Port-Gentil, Franceville |
| **Raison sociale** | MI CASA HÔTEL SARL |
| **Contact** | +241 065 82 74 10 · contact@mi-casa-hotel.ga |
| **Siège (légal)** | Quartier Louis, BP 1234, Libreville |
| **Palette marque** | Navy `#0D2342`, ivoire `#F7F3EC`, sable `#E8DFD0`, cuivre `#C4A574` |
| **Ton** | Élégant, premium tropical, hospitalité éditoriale |

---

## 2. Deux versions du site (important)

### A) Version 1 — Production actuelle (ne PAS supprimer)

| Élément | Valeur |
|--------|--------|
| **Repo** | `github.com/jackotv45-arch/Mi-Casa-Vercel` (historique) |
| **URL** | `https://mi-casa-vercel.vercel.app` (et variantes) |
| **Stack** | React 19, TypeScript, Vite, TanStack Router, Tailwind, shadcn/ui, Framer Motion, Supabase, Stripe |
| **Rôle** | Site client **complet** : réservation, auth Google, admin, réception, avis, articles, i18n FR/EN, PWA, pages légales, messages admin, services, profil, splash |

### B) Version 2 — Refonte parallèle (en cours)

| Élément | Valeur |
|--------|--------|
| **Repo** | `https://github.com/jackotv45-arch/Mi-Casa-V2` |
| **URL** | `https://mi-casa-v2.vercel.app` |
| **Stack** | React 19, Vite, TanStack Router/Query, Tailwind v4, Framer Motion, **Three.js + R3F + Drei**, Supabase (**nouveau** projet) |
| **Rôle** | Refonte **premium / immersive** sans toucher à la v1 |
| **État** | Fondation + hero WebGL + landing immersive ; backend métier (réservation complète) **pas encore** porté |

**Règle d'or :** ne jamais écraser la v1. Travailler uniquement sur Mi-Casa-V2 pour la refonte.

---

## 3. Landing immersive

Fichier : `public/landing-immersive.html`  
Ouvrir localement ou via `/landing-immersive.html` après deploy.  
Interactions : tilt 3D souris, switch 3 villes, orbes, implode/explode formes.

Voir le reste du rapport dans le repo et artifacts `MI-CASA-RAPPORT-REPRISE-COMPLET.md`.
