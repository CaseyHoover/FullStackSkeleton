import { createAuthClient } from "better-auth/react";

// Explicit type annotation required because better-auth's inferred client type
// references private module paths not portable across pnpm workspace boundaries.
export const authClient: {
  signIn: { social: (opts: { provider: string; callbackURL: string }) => Promise<unknown> };
  signOut: (opts: { fetchOptions: { onSuccess: () => void } }) => Promise<unknown>;
  [key: string]: unknown;
} = createAuthClient();
