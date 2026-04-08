import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://spotlight@local/0",
  tracesSampleRate: 1.0,
  enableLogs: true,
  spotlight: process.env.SENTRY_SPOTLIGHT === "1",
});
