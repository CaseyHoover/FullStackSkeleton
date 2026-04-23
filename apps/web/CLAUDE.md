@AGENTS.md

# Next.js 16 Frontend

React 19, Tailwind v4, shadcn/ui. App Router with RSC.

- `pnpm --filter @skeleton/web dev` — start on port 3000
- `pnpm --filter @skeleton/web lint` — ESLint (strict, zero warnings)
- `pnpm --filter @skeleton/web test` — Jest tests

## Tailwind v4 Canonical Classes

Always use canonical Tailwind v4 syntax in utility classes (className strings):

- `calc(var(--spacing)*N)` → `--spacing(N)`
- `bg-gradient-to-t` → `bg-linear-to-t`
- `translate-x-[2.5rem]` → `translate-x-10` (use scale values)
- `start-1/2` → `inset-s-1/2`
- `border-(--color-border)` → `border-border`
- `z-[999]` → `z-999`

**Important:** The `--spacing(N)` shorthand only works inside Tailwind utility classes. In raw CSS declarations (e.g. `:root { --header-height: ... }`), you must use `calc(var(--spacing) * N)`.

Run `npx @tailwindcss/upgrade` to auto-fix existing non-canonical classes.
