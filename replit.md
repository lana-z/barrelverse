# Barrel + Verse - Wine Education & Experience Platform

## Overview

Barrel + Verse is a wine education and experience platform that combines storytelling with wine appreciation. The application provides a poetic, hospitality-focused website featuring courses, curated wine experiences, and educational content. Built as a full-stack TypeScript application, it emphasizes elegant design, emotional connection, and intimate storytelling over traditional e-commerce approaches.

The platform offers in-person masterclasses, self-paced video courses, membership resources, and curated wine tasting experiences like regional deep dives and themed events (e.g., "Feel Rioja").

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing (no React Router dependency)

**UI Component System**
- Shadcn/ui component library based on Radix UI primitives
- "New York" style variant with custom theming
- Tailwind CSS for utility-first styling with custom design tokens
- Component aliases configured for clean imports (`@/components`, `@/lib`, etc.)

**Design Philosophy**
- Reference-based design inspired by premium hospitality (Airbnb, boutique hotels, Kinfolk aesthetic)
- Typography-led hierarchy using serif fonts (Playfair Display, Crimson Pro, Lora)
- Generous whitespace and organic flow between sections
- Custom color palette: creams, warm greys, muted burgundy highlights (Rioja-inspired theme)
- Mobile-first responsive design with breakpoint at 768px

**State Management**
- TanStack Query (React Query) for server state management
- Custom query client with credential-based fetching
- Local component state with React hooks

### Backend Architecture

**Server Framework**
- Express.js with TypeScript running on Node.js
- ESM module system (type: "module" in package.json)
- Session-based authentication using express-session

**API Design**
- RESTful API endpoints under `/api` prefix
- Request/response logging middleware for debugging
- JSON body parsing with raw body preservation for webhooks
- Role-based access control (user vs admin routes)

**Authentication & Authorization**
- Session-based authentication with secure HTTP-only cookies
- Password hashing using bcryptjs
- `requireAuth` middleware for protected routes
- `requireAdmin` middleware for admin-only operations

### Data Layer

**ORM & Database**
- Drizzle ORM for type-safe database operations
- PostgreSQL as the production database (via Neon serverless driver)
- Schema-first approach with Zod validation

**Data Models**
- **Users**: Email/password authentication, admin flag, timestamps
- **Courses**: Title, description, pricing, category (masterclass/video/membership), level, publish status
- **Experiences**: Event-based wine tastings with date, location, attendee tracking
- **Purchases**: Join table tracking user purchases of courses/experiences

**Storage Abstraction**
- `IStorage` interface for database operations
- `MemStorage` in-memory implementation for development/testing
- Production storage implementation uses Drizzle ORM with PostgreSQL

**Schema Validation**
- Drizzle-Zod integration for runtime validation
- Insert and select schemas auto-generated from database schema
- Custom Zod schemas for login and registration flows

### Development & Deployment

**Development Workflow**
- `dev` script runs concurrent Vite dev server and Express API in development mode
- Vite middleware mode integrates frontend and backend in single process
- Hot module replacement for instant feedback

**Build Process**
- `build` script compiles client with Vite and bundles server with esbuild
- Client output: `dist/public` (static assets)
- Server output: `dist/index.js` (bundled Node.js application)
- External packages mode to avoid bundling node_modules

**Production Configuration**
- `start` script runs compiled Node.js server
- Static file serving for built frontend assets
- Environment-based configuration (NODE_ENV, DATABASE_URL, SESSION_SECRET)

## External Dependencies

**Database**
- **Neon Serverless PostgreSQL**: Production database with connection pooling via `@neondatabase/serverless` driver
- **Drizzle Kit**: Database migration tool configured to output to `./migrations` directory

**UI Component Library**
- **Radix UI**: Comprehensive set of unstyled, accessible primitives (accordion, dialog, dropdown, popover, etc.)
- **Shadcn/ui**: Pre-built component configurations on top of Radix UI

**Styling & Design**
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **class-variance-authority**: Type-safe variant styling for components
- **clsx** + **tailwind-merge**: Utility for merging Tailwind classes

**Form Handling**
- **React Hook Form**: Form state management and validation
- **@hookform/resolvers**: Zod resolver for schema-based validation

**Authentication**
- **bcryptjs**: Password hashing for secure storage
- **express-session**: Server-side session management
- **connect-pg-simple**: PostgreSQL session store (dependency present but may need configuration)

**Development Tools**
- **@replit/vite-plugin-runtime-error-modal**: Runtime error overlay for development
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling
- **@replit/vite-plugin-dev-banner**: Development environment banner

**Asset Management**
- Images stored in `attached_assets/generated_images/` directory
- Vite alias `@assets` points to attached_assets folder
- PNG format for photographs (founder portrait, wine imagery, vineyard backgrounds)

**Typography**
- Google Fonts integration via CDN (Architects Daughter, DM Sans, Fira Code, Geist Mono - configured in client/index.html)
- Custom font variables in CSS for sans, serif, and mono font families

**Third-Party Services**
- Currently no payment processing integration (courses/experiences show pricing but no checkout flow)
- Contact form implementation is client-side only (no email service configured)
- Social media links present but may need configuration (LinkedIn, Instagram, Facebook)