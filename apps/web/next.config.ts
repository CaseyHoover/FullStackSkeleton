import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@health/api-client", "@health/shared", "@health/auth"],
};

export default nextConfig;
