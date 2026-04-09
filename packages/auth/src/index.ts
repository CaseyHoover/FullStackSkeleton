import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins/admin";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "@skeleton/db";

export const authConfig = {
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
  },
  plugins: [
    admin({
      defaultRole: "user",
    }),
  ],
} satisfies Parameters<typeof betterAuth>[0];

export const auth = betterAuth(authConfig);
