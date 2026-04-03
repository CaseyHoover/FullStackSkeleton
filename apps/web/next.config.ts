import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@health/shared", "@health/auth"],
};

export default nextConfig;
