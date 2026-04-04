# Shared Package

Zod v4 schemas and constants — the single source of truth for types across the monorepo.

- Schemas are in `src/schemas/` and re-exported from `src/index.ts`.
- Types are inferred from schemas via `z.infer<>` — don't manually duplicate them.
- Both `apps/api` and `apps/web` depend on this package.
