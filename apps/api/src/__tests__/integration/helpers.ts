import { betterAuth } from "better-auth";
import { testUtils } from "better-auth/plugins";
import { prisma } from "@skeleton/db";
import { authConfig } from "@skeleton/auth";
import { app } from "../../app.js";

/**
 * A test-only auth instance that extends the shared auth config
 * with the testUtils plugin. Sessions created here are valid for
 * the app's auth middleware since they share the same DB and secret.
 */
const testAuth = betterAuth({
  ...authConfig,
  plugins: [...authConfig.plugins, testUtils()],
});

/**
 * Creates a test user via BetterAuth's test-utils plugin
 * and returns auth headers for authenticated requests.
 */
export async function createTestUser() {
  const ctx = await testAuth.$context;
  const test = ctx.test;

  const user = test.createUser();
  const savedUser = await test.saveUser(user);
  const headers = await test.getAuthHeaders({ userId: savedUser.id });
  const cookie = headers.get("cookie")!;

  return { user: savedUser, cookie };
}

/**
 * Makes a request against the Hono app.
 * Uses app.request() — exercises the full middleware stack
 * without starting an HTTP server.
 */
export async function appRequest(
  path: string,
  options: RequestInit & { cookie?: string } = {},
) {
  const { cookie, headers: extraHeaders, ...rest } = options;

  const headers = new Headers(extraHeaders);
  if (cookie) {
    headers.set("Cookie", cookie);
  }

  return app.request(path, { headers, ...rest });
}

/**
 * Removes data belonging to a specific test user.
 * Scoped by userId so real data is never touched.
 * Documents lack onDelete cascade, so they need explicit cleanup.
 * Sessions and accounts cascade from the user delete.
 */
export async function cleanupTestData(userId: string) {
  await prisma.document.deleteMany({ where: { userId } });
  await prisma.user.delete({ where: { id: userId } });
}
