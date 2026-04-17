import { defineConfig } from "vitest/config";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 51204,
    strictPort: true,
  },
  test: {
    exclude: ["**/e2e/**", "**/node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: [
        "apps/api/src/**/*.ts",
        "apps/web/src/**/*.ts",
        "apps/web/src/**/*.tsx",
        "packages/shared/src/**/*.ts",
        "packages/auth/src/**/*.ts",
        "packages/db/src/**/*.ts",
      ],
      exclude: [
        "**/*.test.ts",
        "**/__tests__/**",
        "**/index.ts",
        "**/e2e/**",
      ],
    },
  },
});
