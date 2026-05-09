import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@skeleton/api-client",
    "@skeleton/shared",
    "@skeleton/auth",
  ],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
