import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { authMiddleware } from "./middleware/auth.js";
import type { AppEnv } from "./types.js";
import { authRoutes } from "./features/auth/route.js";
import { billingRoutes } from "./features/billing/route.js";
import { dashboardRoutes } from "./features/dashboard/route.js";

export const app = new OpenAPIHono<AppEnv>();

app.use("*", logger());
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

// OpenAPI doc + Swagger UI
app.doc("/openapi.json", {
  openapi: "3.1.0",
  info: { title: "HealthDash API", version: "0.1.0" },
});

// Light theme — match app's teal primary
const lightCSS = `
  html, body, .swagger-ui { background: #f5fafa !important; margin: 0; }
  .swagger-ui .topbar { display: none; }
  .swagger-ui .info .title { color: #1a3a3a; }
  .swagger-ui .opblock.opblock-get .opblock-summary-method { background: #1a9a8a; }
  .swagger-ui .opblock.opblock-get { border-color: #1a9a8a; background: rgba(26,154,138,0.05); }
  .swagger-ui .opblock.opblock-post .opblock-summary-method { background: #2a8a7a; }
  .swagger-ui .opblock.opblock-post { border-color: #2a8a7a; background: rgba(42,138,122,0.05); }
  .swagger-ui .btn.execute { background: #1a9a8a; border-color: #1a9a8a; }
  .swagger-ui .btn.authorize { color: #1a9a8a; border-color: #1a9a8a; }
  .swagger-ui a { color: #1a9a8a; }
`;

// Dark theme — match app's dark mode palette
const darkCSS = `
  html, body, .swagger-ui, .swagger-ui .scheme-container, .swagger-ui .wrapper { background: #000000 !important; margin: 0; color: #ffffff; }
  .swagger-ui .topbar { display: none; }
  .swagger-ui, .swagger-ui *:not(.microlight *):not(.microlight):not(.highlight-code *):not(code *) { color: #ffffff !important; }
  .swagger-ui a { color: #2aaa9a !important; }
  .swagger-ui .opblock.opblock-get .opblock-summary-method,
  .swagger-ui .opblock.opblock-post .opblock-summary-method,
  .swagger-ui .btn.execute { color: #fff !important; }
  .swagger-ui { color: #ffffff; }
  .swagger-ui .info .title { color: #ffffff; }
  .swagger-ui .info p, .swagger-ui .info li { color: #ffffff; }
  .swagger-ui .scheme-container { box-shadow: none; }
  .swagger-ui .opblock .opblock-summary-description { color: #ffffff; }
  .swagger-ui .opblock .opblock-section-header { background: rgba(255,255,255,0.05); }
  .swagger-ui .opblock .opblock-section-header h4 { color: #ffffff; }
  .swagger-ui .opblock.opblock-get .opblock-summary-method { background: #2aaa9a; }
  .swagger-ui .opblock.opblock-get { border-color: #2aaa9a; background: rgba(42,170,154,0.08); }
  .swagger-ui .opblock.opblock-post .opblock-summary-method { background: #3a9a8a; }
  .swagger-ui .opblock.opblock-post { border-color: #3a9a8a; background: rgba(58,154,138,0.08); }
  .swagger-ui .btn.execute { background: #2aaa9a; border-color: #2aaa9a; }
  .swagger-ui .btn.authorize { color: #2aaa9a; border-color: #2aaa9a; }
  .swagger-ui .btn { color: #ffffff; }
  .swagger-ui a { color: #2aaa9a; }
  .swagger-ui .model-title { color: #ffffff; }
  .swagger-ui .model { color: #ffffff; }
  .swagger-ui .prop-type { color: #2aaa9a; }
  .swagger-ui table thead tr th { color: #ffffff; border-color: rgba(255,255,255,0.1); }
  .swagger-ui table tbody tr td { color: #ffffff; border-color: rgba(255,255,255,0.05); }
  .swagger-ui .response-col_status { color: #ffffff; }
  .swagger-ui .response-col_description { color: #ffffff; }
  .swagger-ui .opblock-description-wrapper p { color: #ffffff; }
  .swagger-ui .opblock-tag { color: #ffffff; border-color: rgba(255,255,255,0.1); }
  .swagger-ui .opblock .opblock-summary { border-color: transparent; }
  .swagger-ui input[type=text] { background: rgba(255,255,255,0.08); color: #ffffff; border-color: rgba(255,255,255,0.15); }
  .swagger-ui textarea { background: rgba(255,255,255,0.08); color: #ffffff; border-color: rgba(255,255,255,0.15); }
  .swagger-ui select { background: rgba(255,255,255,0.08); color: #ffffff; border-color: rgba(255,255,255,0.15); }
  .swagger-ui .microlight { background: rgba(255,255,255,0.05) !important; color: #ffffff !important; }
  .swagger-ui .highlight-code .microlight code { color: #ffffff !important; }
`;

app.get("/docs", swaggerUI({
  url: "/openapi.json",
  manuallySwaggerUIHtml: (asset: { css: string[]; js: string[] }) => `
    <div>
      <div id="swagger-ui"></div>
      ${asset.css.map((url: string) => `<link rel="stylesheet" href="${url}" />`).join("\n")}
      <style>${lightCSS}</style>
      ${asset.js.map((url: string) => `<script src="${url}" crossorigin="anonymous"></script>`).join("\n")}
      <script>
        window.onload = () => {
          window.ui = SwaggerUIBundle({
            dom_id: '#swagger-ui',
            url: '/openapi.json',
          })
        }
      </script>
    </div>
  `,
}));
app.get("/docs/dark", swaggerUI({
  url: "/openapi.json",
  manuallySwaggerUIHtml: (asset: { css: string[]; js: string[] }) => `
    <div>
      <div id="swagger-ui"></div>
      ${asset.css.map((url: string) => `<link rel="stylesheet" href="${url}" />`).join("\n")}
      <style>${darkCSS}</style>
      ${asset.js.map((url: string) => `<script src="${url}" crossorigin="anonymous"></script>`).join("\n")}
      <script>
        window.onload = () => {
          window.ui = SwaggerUIBundle({
            dom_id: '#swagger-ui',
            url: '/openapi.json',
          })
        }
      </script>
    </div>
  `,
}));
