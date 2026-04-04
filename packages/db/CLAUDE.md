# Database Package

Prisma ORM with PostgreSQL. Exports a singleton client.

- `pnpm --filter @skeleton/db db:generate` — regenerate Prisma client after schema changes
- `pnpm --filter @skeleton/db db:push` — push schema to database
- `pnpm --filter @skeleton/db studio` — open Prisma Studio on port 5555

Schema lives in `prisma/`. The client is initialized and exported from `src/index.ts`.
