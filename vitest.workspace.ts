export default [
  {
    test: {
      name: "api",
      root: "./apps/api",
      include: ["src/**/*.test.ts"],
      exclude: ["src/__tests__/integration/**"],
    },
  },
  {
    test: {
      name: "api:integration",
      root: "./apps/api",
      include: ["src/__tests__/integration/**/*.test.ts"],
      testTimeout: 15000,
      pool: "forks",
      env: { NODE_ENV: "test" },
    },
  },
  {
    test: {
      name: "web",
      root: "./apps/web",
      include: ["src/**/*.test.ts"],
      exclude: ["e2e/**"],
    },
  },
  {
    test: {
      name: "shared",
      root: "./packages/shared",
      include: ["src/**/*.test.ts"],
    },
  },
];
