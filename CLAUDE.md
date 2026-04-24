@AGENTS.md

# FullStackSkeleton Monorepo

pnpm workspaces + Turborepo. Key commands:

- `pnpm dev` — start all services (Postgres, API, web, Prisma Studio)
- `pnpm build` — build all packages
- `pnpm lint` — lint all packages
- `pnpm test` — run tests with coverage
- `pnpm codegen:openapi` — generate OpenAPI spec from API routes

Env vars are loaded via [dotenvx](https://dotenvx.com). `.env.local` at the repo root is the single source of truth — `pnpm dev` injects it into every task, so per-package `.env.local` files are not required. Use `pnpm exec dotenvx set KEY value -f .env.<env>` to commit encrypted secrets; decryption keys live in `.env.keys` (gitignored).

## Structure

| Path                  | Role                                             |
| --------------------- | ------------------------------------------------ |
| `apps/web`            | Next.js 16 frontend                              |
| `apps/api`            | Hono REST API                                    |
| `packages/shared`     | Zod schemas & constants (single source of truth) |
| `packages/db`         | Prisma schema & client                           |
| `packages/auth`       | BetterAuth config (shared by web + API)          |
| `packages/api-client` | Generated TypeScript fetch client                |
| `packages/api-spec`   | OpenAPI spec generation                          |

Each subfolder has its own CLAUDE.md with package-specific guidance.
