import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";

import { authMiddleware } from "./middleware/auth.js";
import { authRoutes } from "./features/auth/route.js";
import { billingRoutes } from "./features/billing/route.js";
import { dashboardRoutes } from "./features/dashboard/route.js";

export const app = new OpenAPIHono();

app.use(
  "*",
  cors({
    origin: process.env.WEB_URL ?? "http://localhost:3000",
    credentials: true,
  }),
);

// Auth routes (public — these ARE the auth endpoints)
app.route("/api/auth", authRoutes);

// Protected routes
app.use("/dashboard/*", authMiddleware);
app.route("/dashboard", dashboardRoutes);

app.use("/billing/*", authMiddleware);
app.route("/billing", billingRoutes);

// OpenAPI doc endpoint
app.doc("/openapi.json", {
  openapi: "3.1.0",
  info: { title: "HealthDash API", version: "0.1.0" },
});
