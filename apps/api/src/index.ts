import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://spotlight@local/0",
  tracesSampleRate: 1.0,
  enableLogs: true,
  spotlight: process.env.SENTRY_SPOTLIGHT === "1",
});

import { serve } from "@hono/node-server";

import { app } from "./app.js";

const port = Number(process.env.PORT ?? 4000);

serve({ fetch: app.fetch, port, hostname: "0.0.0.0" }, (info) => {
  console.log(`API running on http://localhost:${info.port}`);
});
