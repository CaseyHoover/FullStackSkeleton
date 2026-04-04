# Hono REST API

Hono with Zod OpenAPI. Vertical slice architecture under `src/features/`.

- `pnpm --filter @skeleton/api dev` — start on port 4000 (tsx watch)
- `pnpm --filter @skeleton/api build` — build with tsup
- `pnpm --filter @skeleton/api test` — Jest tests

## Conventions

- Each feature has `route.ts`, `service.ts`, and `repository.ts`.
- Routes define OpenAPI schemas via `@hono/zod-openapi`.
- Services contain business logic; repositories handle data access.
- Auth middleware injects session into context (`src/middleware/auth.ts`).
- Shared types come from `@skeleton/shared` — don't define schemas here.
