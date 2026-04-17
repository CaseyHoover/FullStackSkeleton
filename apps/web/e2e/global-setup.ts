import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import type { FullConfig } from "@playwright/test";

export const TEST_USER_FIXTURE = join(
  process.cwd(),
  "playwright-report",
  ".test-user.json",
);

/**
 * Seeds a fresh test user for sign-in tests. Uses a unique email per run
 * so tests don't depend on database state from previous runs. Credentials
 * are written to a JSON fixture file so parallel workers can read them.
 */
export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL ?? "http://localhost:3000";

  const email = `test-${String(Date.now())}@example.com`;
  const password = "TestPassword123!";

  const res = await fetch(`${baseURL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: baseURL,
    },
    body: JSON.stringify({
      name: "Test User",
      email,
      password,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to seed test user: ${String(res.status)} ${body}`);
  }

  mkdirSync(dirname(TEST_USER_FIXTURE), { recursive: true });
  writeFileSync(TEST_USER_FIXTURE, JSON.stringify({ email, password }));
}
