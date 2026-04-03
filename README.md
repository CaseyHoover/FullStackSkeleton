# FullStackSkeleton

A full-stack application skeleton built as a pnpm monorepo with Turborepo.

## Architecture

```
                    +-------------+
                    |   Browser   |
                    +------+------+
                           |
              +------------+------------+
              |                         |
       +------+------+          +------+------+
       |   Next.js   |          |   Hono API  |
       |  apps/web   |--------->|  apps/api   |
       |  :3000      |  fetch   |  :4000      |
       +------+------+          +------+------+
              |                         |
              |    +----------+         |
              +--->| BetterAuth|<-------+
              |    +----------+         |
              |         |               |
              |    +----+----+          |
              +--->|Postgres |<---------+
                   | (Docker)|
                   | :5432   |
                   +---------+
```

- **apps/web** -- Next.js frontend. No business-logic API routes. Fetches data from the Hono API via a generated typed client. Auth handled by BetterAuth with GitHub OAuth.
- **apps/api** -- Hono API server. All backend logic organized as vertical slices (`features/dashboard/`, `features/billing/`). OpenAPI spec auto-generated from route definitions. Protected by session-based auth middleware.
- **apps/ios** -- SwiftUI project scaffold with OpenAPI Generator config for typed Swift client codegen.
- **packages/shared** -- Zod schemas (single source of truth for types), constants. Used by both web and API.
- **packages/auth** -- BetterAuth configuration shared by web and API. Framework-specific wrappers for Next.js (`/next`) and client-side (`/client`).
- **packages/db** -- Prisma schema and client singleton. Only place Prisma is instantiated.
- **packages/api-client** -- Generated TypeScript fetch client from the OpenAPI spec. Used by the web app for fully typed API calls.
- **packages/api-spec** -- Script to generate `openapi.yaml` from the Hono app's route definitions.

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+
- Docker (for Postgres)
- A GitHub OAuth app (for authentication)

### 1. Clone and install

```bash
git clone <repo-url>
cd fullstack-skeleton
pnpm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```bash
# Auth
BETTER_AUTH_SECRET=<generate with: openssl rand -base64 32>
BETTER_AUTH_URL=http://localhost:3000

# GitHub OAuth (create at https://github.com/settings/developers)
GITHUB_CLIENT_ID=<your-client-id>
GITHUB_CLIENT_SECRET=<your-client-secret>

# Database
DATABASE_URL=postgresql://skeleton:skeleton@localhost:5432/skeleton

# API (optional, defaults shown)
NEXT_PUBLIC_API_URL=http://localhost:4000
```

For the GitHub OAuth app, set the callback URL to `http://localhost:3000/api/auth/callback/github`.

### 3. Push the database schema

```bash
docker compose up -d
pnpm --filter @skeleton/db db:generate
pnpm --filter @skeleton/db db:push
```

### 4. Run the dev servers

```bash
pnpm dev
```

This starts:

- **Web** at http://localhost:3000
- **API** at http://localhost:4000
- **Prisma Studio** at http://localhost:5555

### 5. Promote yourself to admin

After your first sign-in, promote your user to admin:

```bash
docker exec $(docker ps -q --filter ancestor=postgres:17-alpine) \
  psql -U skeleton -d skeleton -c \
  "UPDATE \"user\" SET role = 'admin' WHERE email = '<your-email>';"
```

### Admin tools (available in the sidebar when signed in)

- **API Docs** (`/api-docs`) -- Swagger UI for the Hono API
- **DB Studio** (`/db-studio`) -- Prisma Studio for database inspection

## Scripts

| Command                              | Description                                               |
| ------------------------------------ | --------------------------------------------------------- |
| `pnpm dev`                           | Start all services (Postgres + web + API + Prisma Studio) |
| `pnpm build`                         | Build all packages and apps                               |
| `pnpm lint`                          | Lint all packages                                         |
| `pnpm --filter @skeleton/db db:push` | Push Prisma schema to database                            |
| `pnpm --filter @skeleton/db studio`  | Open Prisma Studio standalone                             |
| `pnpm codegen:openapi`               | Generate OpenAPI spec from Hono routes                    |
| `pnpm codegen:swift`                 | Generate Swift types from OpenAPI spec                    |
| `pnpm docker:up`                     | Start Postgres container                                  |
| `pnpm docker:down`                   | Stop Postgres container                                   |
