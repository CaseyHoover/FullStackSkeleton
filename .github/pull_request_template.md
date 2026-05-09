<!--
Thanks for the PR! Please fill out the sections below so reviewers have the
context they need. Delete sections that genuinely don't apply, but prefer
filling them out — even a one-line answer beats a missing section.

PR title should follow Conventional Commits, e.g.:
  feat(web): add password reset flow
  fix(api): handle null session in /me
  chore: bump pnpm to 11.0.9
-->

## Summary

<!-- What does this PR do, and why? Lead with the user-visible or behavioral change. -->

## Linked issues

<!-- e.g. Closes #123, Refs #456. Use "Closes" so the issue auto-closes on merge. -->

## Affected area

<!-- Mirror the issue-template dropdown. Tick all that apply. -->

- [ ] apps/web
- [ ] apps/api
- [ ] packages/shared
- [ ] packages/db
- [ ] packages/auth
- [ ] packages/api-client
- [ ] packages/api-spec
- [ ] tooling / CI
- [ ] other / cross-cutting

## Type of change

- [ ] feat — new user-facing capability
- [ ] fix — bug fix
- [ ] chore — tooling, deps, or maintenance
- [ ] refactor — no behavior change
- [ ] docs — documentation only
- [ ] test — tests only

## How was this tested?

<!--
Describe what you ran locally and what you verified. Include relevant commands,
screenshots, or recordings for UI changes.
-->

- [ ] `pnpm lint`
- [ ] `pnpm lint:pinning` (if Docker tags or `package.json` deps changed)
- [ ] `pnpm test`
- [ ] `pnpm build`
- [ ] Manual verification (describe below)

## Schema / migration impact

<!--
Required if this PR touches `packages/db`, `packages/shared` schemas, or the
OpenAPI spec. Otherwise write "none".
-->

- [ ] Prisma migration added / regenerated
- [ ] `pnpm codegen:openapi` re-run and committed
- [ ] No schema impact

## Additional context

<!-- Anything else reviewers should know: trade-offs, follow-ups, related PRs. -->
