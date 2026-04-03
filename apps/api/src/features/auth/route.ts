import { Hono } from "hono";

import { auth } from "@skeleton/auth";

export const authRoutes = new Hono();

authRoutes.all("/*", async (c) => {
  return auth.handler(c.req.raw);
});
