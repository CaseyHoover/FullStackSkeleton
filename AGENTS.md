# Monorepo Agent Rules

- Read the relevant subfolder's CLAUDE.md before making changes in that area.
- Shared types and schemas live in `packages/shared` — don't duplicate them.
- Database access goes through `packages/db` — never import Prisma directly in apps.
- Auth config is in `packages/auth` — apps consume it, not define it.

## Pinning policy

To prevent silent drift from upstream rebuilds and unreviewed minor bumps, all external references in this repo are pinned and enforced by `pnpm lint:pinning` (CI fails on violations):

- **Docker images** (`Dockerfile`, `docker-compose*.yaml`): tag must be `major.minor[.patch]` — e.g. `postgres:17.9-alpine`, `node:26.0-slim`. A SHA digest (`@sha256:…`) is also accepted. Bare `postgres:17` or `latest` is rejected.
- **npm dependencies** (every workspace `package.json`, all four dep maps): range must be exact (`1.2.3`) or `~major.minor.patch` (`~1.2.3`). `^`, `*`, `latest`, bare-major (`~25`), and unbounded ranges are rejected. `workspace:*`, `link:`, `file:`, `npm:` aliases (whose version must also satisfy the rule), and git/http URLs are allowed.
- **GitHub Actions**: pinned to a full SHA, enforced at the repo level via the "Require actions pinned to SHA" setting (no extra lint needed).

Dependabot still produces minor/patch PRs against these pinned ranges — bumps become reviewed events, not silent drift. When raising a pin, update the manifest and run `pnpm install` so the lockfile follows.
