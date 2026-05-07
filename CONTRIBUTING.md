# Contributing

Thanks for your interest in contributing to FullStackSkeleton. This document covers how to report issues, propose changes, and submit pull requests.

By participating in this project you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md).

## Reporting issues

- **Bugs and feature requests:** [open an issue](https://github.com/CaseyHoover/FullStackSkeleton/issues/new). Include reproduction steps, expected vs. actual behavior, and the affected component (e.g. `apps/web`, `packages/auth`).
- **Security vulnerabilities:** do **not** open a public issue. Follow the process in [SECURITY.md](SECURITY.md).

For non-trivial changes, please open an issue first to discuss the approach before sending a pull request.

## Development setup

The repo is a pnpm + Turborepo monorepo. The fastest path is the dev container — see the [Getting Started section of the README](README.md#getting-started) for full instructions.

Quick reference:

```bash
pnpm install
pnpm dev          # start web + API + Prisma Studio + Spotlight
pnpm format:check # prettier
pnpm lint         # eslint across the workspace
pnpm test         # vitest with coverage
pnpm test:e2e     # playwright (apps/web)
```

Each subfolder has its own `CLAUDE.md` / `AGENTS.md` describing package-specific conventions — read the one for the area you're touching.

## Pull request process

1. **Fork** the repository and create a branch off `main`. Branch names should be short and descriptive (e.g. `fix/auth-redirect`, `docs/contributing`).
2. **Make focused changes.** Keep PRs scoped to one logical change. Unrelated cleanups belong in separate PRs.
3. **Run the full check suite locally** before pushing:
   - `pnpm format:check`
   - `pnpm lint`
   - `pnpm test`
   - `pnpm test:e2e` (if your change touches the web app)
4. **Use conventional commit messages** for both commits and the PR title. The PR title is validated by CI and used to drive automated releases.

   Common types:
   - `feat:` — new user-facing feature
   - `fix:` — bug fix
   - `docs:` — documentation only
   - `chore:` — tooling, dependencies, or other non-code changes
   - `refactor:` — code change that neither fixes a bug nor adds a feature
   - `test:` — adding or updating tests

   Optional scope after the type, e.g. `feat(api): add billing endpoints`.

5. **Open the pull request** against `main`. Fill in what changed and why; link any related issues with `Closes #N`.
6. **Address review feedback.** Push fixup commits to the branch — don't force-push over review history unless asked. The PR is squash-merged on merge.

CI must be green before a PR can merge. If a check fails, prefer fixing the underlying issue over disabling the check.

## Coding conventions

- Shared types and Zod schemas live in `packages/shared`. Don't duplicate them in apps.
- Database access goes through `packages/db`. Don't import Prisma directly from apps.
- Auth configuration lives in `packages/auth`. Apps consume it; they don't redefine it.
- Don't add `eslint-disable` comments — fix the code, or adjust the rule in config if the rule is genuinely wrong for the codebase.

## Contributor License Agreement

By submitting a contribution to this project (including but not limited to pull requests, patches, issue comments containing code, or any other material), you agree to the following terms:

1. **Original work or sufficient rights.** You represent that the contribution is your original work, or that you have the necessary rights to submit it under the terms of this agreement, and that submitting it does not violate any third party's rights.

2. **License of the contribution.** You license your contribution to the project and to recipients of software distributed by the project under the [MIT License](LICENSE.md), the same license that covers the project.

3. **Right to relicense.** You additionally grant Casey Hoover (the project maintainer) and their successors and assigns a perpetual, worldwide, non-exclusive, royalty-free, irrevocable license to use, reproduce, modify, prepare derivative works of, publicly display, publicly perform, sublicense, and distribute your contribution, **including the right to relicense the contribution under different license terms** (open source or proprietary) at the maintainer's sole discretion, without further notice to or consent from you.

4. **No obligation.** The maintainer is under no obligation to accept, merge, or distribute any contribution.

5. **No warranty.** Your contribution is provided "as is", without warranty of any kind.

You retain copyright in your contribution. This agreement does not transfer ownership; it grants the licenses described above.

If you cannot agree to these terms, please do not submit a contribution.
