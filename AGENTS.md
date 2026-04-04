# Monorepo Agent Rules

- Read the relevant subfolder's CLAUDE.md before making changes in that area.
- Shared types and schemas live in `packages/shared` — don't duplicate them.
- Database access goes through `packages/db` — never import Prisma directly in apps.
- Auth config is in `packages/auth` — apps consume it, not define it.
