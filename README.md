# 🧭 Carb Compass

A nutrition toolkit for Type 1 Diabetes families — built with Next.js, Supabase, and the USDA FoodData Central API.

## Features

- **Nutrition lookup** — Search 1M+ foods via the USDA database, with adjustable serving sizes and net carb calculation
- **BGL / Insulin calculator** — Enter current blood glucose and carbs eaten, get recommended insulin dose
- **Freebie foods** — Curated list of T1D-safe snacks under 5g net carbs per serving
- **High-protein recipes** — Low-carb meals with full macros on every recipe
- **User accounts** — Save your ICR, correction factor, food history, and favorite recipes (via Supabase Auth)

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Hosting | Vercel + GitHub |
| Auth + Database | Supabase (Postgres + Row Level Security) |
| Nutrition Data | USDA FoodData Central API (free) |
| Styling | Tailwind CSS + CSS variables |
| Fonts | Lora (display) + DM Sans (body) |

---

## Setup

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/carb-compass.git
cd carb-compass
npm install
```

### 2. Get your API keys

**Supabase** (free at supabase.com):
1. Create a new project
2. Go to Settings → API
3. Copy `Project URL` and `anon public` key

**USDA FoodData Central** (free at fdc.nal.usda.gov):
1. Go to https://fdc.nal.usda.gov/api-key-signup
2. Sign up and get your API key instantly via email

### 3. Set up environment variables

```bash
cp .env.local.example .env.local
```

Fill in your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
USDA_API_KEY=your-usda-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Set up the database

1. Open your Supabase project
2. Go to **SQL Editor**
3. Paste the contents of `supabase-schema.sql` and run it

This creates:
- `profiles` — extends Supabase auth with ICR, correction factor, target BGL
- `food_history` — per-user food lookup history
- `recipes` — recipe catalog
- `saved_recipes` — user recipe bookmarks
- `freebie_foods` — global + user custom freebie list (18 seeded)

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Add all environment variables from `.env.local`
4. Change `NEXT_PUBLIC_SITE_URL` to your production URL
5. Deploy

Vercel auto-deploys on every push to `main`.

---

## Enable Supabase Auth email confirmation (optional)

In Supabase → Authentication → Email Templates, you can customize the confirmation email. For local dev, you can disable email confirmation in Authentication → Settings.

---

## AdSense

Once your site has traffic, apply at [Google AdSense](https://adsense.google.com). Once approved:

1. Add your AdSense script to `app/layout.tsx`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID" crossOrigin="anonymous"></script>
```

2. Place `<ins class="adsbygoogle" ...>` tags where you want ads to appear.

---

## Project structure

```
carb-compass/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Design system + fonts
│   ├── auth/
│   │   ├── login/page.tsx    # Sign in / sign up
│   │   └── callback/route.ts # OAuth callback
│   ├── dashboard/
│   │   ├── page.tsx          # Server component (auth check)
│   │   └── DashboardClient.tsx
│   ├── nutrition/page.tsx    # Food search
│   ├── calculator/page.tsx   # BGL / insulin calculator
│   ├── freebie-foods/page.tsx
│   ├── recipes/page.tsx
│   └── api/
│       ├── food-search/route.ts  # USDA proxy
│       └── user/route.ts         # User data CRUD
├── components/
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts    # Browser client
│   │   ├── server.ts    # Server client
│   │   └── middleware.ts
│   └── auth-actions.ts
├── middleware.ts         # Auth route protection
└── supabase-schema.sql   # Run this in Supabase SQL editor
```

---

## Disclaimer

Carb Compass is for informational purposes only. Always work with your endocrinologist or diabetes care team for medical decisions about insulin dosing.
