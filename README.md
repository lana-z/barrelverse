# Barrelverse

Barrelverse is a full-stack React + Express application for promoting Mitch Robertson's wine education experiences. The UI is a single-page storytelling site. The backend is prepped for authentication, admin CRUD APIs, and purchase scaffolding so it can evolve into a full membership platform.

Deployed at barrelandverse.com

## Tech Stack
- Vite + React 18 front-end with Tailwind/shadcn components.
- Express 4 back-end serving the API and client together.
- Drizzle ORM targeting Postgres (Neon/Supabase/etc.) with express-session backed by connect-pg-simple.
- TypeScript across client and server, bundled via Vite/esbuild for deployment on Vercel.

## Current Status

- **Client**: Vite + React 18 SPA with Tailwind UI components and shadcn-style components.
- **Server**: Express 4 serving both the API and client; routes cover auth (`/api/auth/*`), public content (`/api/courses`, `/api/experiences`), admin CRUD endpoints, and purchase creation hooks.
- **Persistence**: Uses Drizzle ORM targeting Postgres in production (Neon/Supabase) with a development-only in-memory fallback.
- **Sessions**: Managed via `express-session` backed by `connect-pg-simple`, secured by `SESSION_SECRET`, and proxy-aware for Vercel.
- **Build**: `npm run dev` launches the full stack; `npm run build && npm start` builds the client + bundles the server.

## Upcoming Work

- Configure a Postgres instance (see `PLAN.md`), and wire up migrations/seeds for initial content and admin access.
- Add automated Stripe purchase flows plus webhook validation.
- Create an admin dashboard for managing courses and experiences through the existing APIs.
- Add email/SMS flows for onboarding and booking confirmations.
- Expand test coverage with integration/E2E tests that cover auth and admin routes before each deploy.

For detailed next steps, see `PLAN.md`.
