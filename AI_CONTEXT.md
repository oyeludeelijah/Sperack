# AI_CONTEXT

## Project Overview
Personal Finance Tracker MVP. Fast txn entry, budget tracking, safe-to-spend calc.
Tech: React Router v7, Supabase, Tailwind, Recharts, React Query.

## Folder Structure
* `src/` → App root.
  * `app/` → File-system rtg (React Router).
    * `page.jsx` → Dash.
    * `budgets/` → Limit config.
    * `history/` → Txn audit.
    * `login/` → Auth UI.
    * `layout.jsx` → Shell + Providers.
    * `root.tsx` → Entry.
  * `components/` → Shared UI (`Calculator.jsx`, `Navigation.jsx`).
  * `hooks/` → RQ + DB logic (`useAuth.jsx`, `useBudgets.js`, `useTransactions.js`).
  * `lib/` → Config (`supabase.js`, `theme.js`).
  * `utils/` → Helpers (`financeMath.js`).

## Key Files
* `src/app/page.jsx`: Dash comp. Handles main KPIs, charts, quick txn form, calculator.
* `src/components/Calculator.jsx`: Draggable custom calculator. `appBalance` prop integration.
* `src/lib/theme.js`: Material Design 3 (MD3) CSS vars. Dark/Light transition config.
* `src/lib/supabase.js`: DB client init.
* `src/utils/financeMath.js`: Pure fn logic for totals, daily spend, safe-to-spend limits.

## Current State
App built + working. Clean arch. Minimalist UI.
Calculator synced with balance state.

## Data Flow
Usr input (Dash form) → RQ mutation (`useTransactions.js`) → Supabase DB → RQ cache invalidate → UI redraw (Dash KPIs + Recharts). Auth via Supabase → redirect to `/login` if no usr.

## External Dependencies
* **Supabase**: Auth + PostgreSQL DB.
* **Env Vars** (`.env`):
  * `VITE_SUPABASE_URL`
  * `VITE_SUPABASE_ANON_KEY`

## Known Issues / TODOs
No explicit TODOs. Code clean. 
TS compiler throws implicit any for JSX imports in `.react-router/types` (pre-existing, no runtime impact).

## How to Resume
1. Read this file.
2. `npm run dev` → start dev server.
3. Fix bugs or add features. Zero setup needed.
