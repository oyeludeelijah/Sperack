# AI_CONTEXT

## Project Overview
Personal Finance Tracker MVP. Fast txn entry, budget tracking, safe-to-spend calc.
Tech: React Router v7, Supabase, Tailwind CSS, Recharts, React Query (TanStack), Zustand, and Framer Motion.

## Folder Structure
* `src/` → App root.
  * `app/` → File-system routing (React Router v7).
    * `page.jsx` → Dashboard.
    * `budgets/` → Limit config.
    * `history/` → Txn audit.
    * `login/` → Auth UI.
    * `reset-password/` → Password reset flow.
    * `api/` → API routes (`auth`, `budgets`, `transactions`, `user`).
    * `layout.jsx` → Shell + Providers.
    * `root.tsx` → Entry point.
    * `routes.ts` → React Router v7 route tree generation.
  * `components/` → Shared UI (`Calculator.jsx`, `Navigation.jsx`).
  * `context/` → React Context providers (`ThemeContext.jsx`).
  * `hooks/` → React Query + DB logic (`useAllTimeTotals.js`, `useAuth.jsx`, `useBudgets.js`, `useTransactions.js`).
  * `lib/` → Configuration (`supabase.js`, `theme.js`).
  * `utils/` → Helpers and utility hooks (`financeMath.js`, `useAuth.js`, `useCurrency.js`, `useUpload.js`, etc.).

## Key Files
* `src/app/page.jsx`: Dashboard component. Handles main KPIs, charts, quick txn form, calculator.
* `src/components/Calculator.jsx`: Draggable custom calculator. `appBalance` prop integration.
* `src/lib/theme.js`: Material Design 3 (MD3) CSS vars. Dark/Light transition config.
* `src/lib/supabase.js`: DB client init.
* `src/utils/financeMath.js`: Pure fn logic for totals, daily spend, safe-to-spend limits.
* `src/app/routes.ts`: Custom route parsing and generating for React Router v7.

## Current State
App built + working. Clean arch. Minimalist UI.
Calculator synced with balance state.
API routes implemented under `src/app/api/` using HTTP method exports (e.g. `GET`, `POST`).

## Data Flow
Usr input (Dash form) → React Query mutation (`useTransactions.js`) / API Endpoint → Supabase DB → React Query cache invalidate → UI redraw (Dash KPIs + Recharts).
Auth via Supabase → API headers validation / redirect to `/login` if no usr.

## External Dependencies
* **Supabase**: Auth + PostgreSQL DB.
* **Env Vars** (`.env`):
  * `VITE_SUPABASE_URL`
  * `VITE_SUPABASE_ANON_KEY`

## Known Issues / TODOs
* Potential duplicate `useAuth` implementations in `src/hooks/useAuth.jsx` and `src/utils/useAuth.js`.
* TS compiler throws implicit any for JSX imports in `.react-router/types` (pre-existing, no runtime impact).

## How to Resume
1. Read this file.
2. `npm run dev` → start dev server.
3. Fix bugs or add features. Zero setup needed.
