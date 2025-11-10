# Barrelverse Deployment Plan

## Immediate Next Steps
1. **Provision Postgres** – create a managed Postgres database (Neon or Supabase) and grab its connection string.
2. **Configure environment variables** – locally export `DATABASE_URL`, `SESSION_SECRET`, optional comma‑separated `ADMIN_EMAILS`, and preferred `PORT` before running `npm run dev`.
3. **Run database migrations** – execute `npx drizzle-kit push` (or `npm run db:push`) so Postgres has the `users`, `courses`, `experiences`, and `purchases` tables expected by `PgStorage`.
4. **Seed an admin account** – register with one of the emails listed in `ADMIN_EMAILS` to bootstrap admin access for the dashboard/API.
5. **Verify locally** – run `PORT=3000 npm run dev`, hit `http://localhost:3000`, and exercise `/api/*` endpoints (register/login, admin CRUD, purchases) to confirm Postgres persistence and sessions are working.

## Deployment Checklist (Vercel)
- Add `DATABASE_URL`, `SESSION_SECRET`, and `ADMIN_EMAILS` to the Vercel project environment variables (Preview + Production).
- Ensure the Postgres instance allows Vercel’s IP ranges or use a hosted provider (Neon, Supabase) with TLS certificates enabled.
- Update the Vercel build command if necessary (`npm install && npm run build`) and make sure the server start command remains `npm start`.
- After deploying, smoke-test the production URL: register/login, attempt an admin-only route, and confirm sessions persist across refreshes.

## Future Enhancements
- Replace the in-memory fallback store entirely once all environments have a Postgres instance.
- Add automated seeds (e.g., Drizzle `seed.ts`) to bootstrap demo content and the first admin user.
- Wire purchase creation to Stripe and add proper webhook validation.
- Add end-to-end tests (Playwright or Cypress) that cover auth + admin flows before each deploy.
