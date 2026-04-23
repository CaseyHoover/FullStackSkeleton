import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@skeleton/api-client",
    "@skeleton/shared",
    "@skeleton/auth",
  ],
};

export default withSentryConfig(nextConfig, {
  silent: true,
});
