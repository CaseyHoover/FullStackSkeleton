import { Hono } from "hono";

import { auth } from "@health/auth";

export const authRoutes = new Hono();

authRoutes.all("/*", async (c) => {
  return auth.handler(c.req.raw);
});
