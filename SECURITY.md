# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it privately so it can be addressed before public disclosure.

**Please do not open a public GitHub issue for security vulnerabilities.**

### How to report

- **Preferred:** Use GitHub's [private vulnerability reporting](https://github.com/CaseyHoover/FullStackSkeleton/security/advisories/new) to open a draft advisory.
- **Alternative:** Email the maintainer at `casey.w.hoover@icloud.com` with the subject line `SECURITY: <short summary>`.

Please include:

- A description of the vulnerability and its potential impact
- Steps to reproduce, or a proof-of-concept
- Affected versions, commits, or components (e.g. `apps/api`, `packages/auth`)
- Any suggested mitigation, if known

### What to expect

- Acknowledgement of your report within 7 days
- An initial assessment and, if accepted, a target remediation window
- Credit in the released advisory, unless you'd prefer to remain anonymous

## Supported Versions

This repository is a template. Security fixes are applied to the `main` branch only; downstream projects generated from this template are responsible for their own security maintenance.

## Scope

In scope:

- Source code in this repository (`apps/*`, `packages/*`)
- CI/CD configuration under `.github/`
- Default configuration shipped with the template

Out of scope:

- Vulnerabilities in third-party dependencies — please report those upstream; we track them via Dependabot
- Issues that require a compromised developer machine, npm registry, or CI provider to exploit
- Denial of service from unrealistic load against the local dev server
