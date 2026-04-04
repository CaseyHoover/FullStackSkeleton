<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Web Agent Rules

- Use shadcn/ui components from `src/components/ui/` — don't build from scratch.
- Auth is consumed from `@skeleton/auth/client` and `@skeleton/auth/next`.
- API calls go through `@skeleton/api-client`, not raw fetch.
