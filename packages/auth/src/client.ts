import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

type AuthClient = ReturnType<typeof createAuthClient>;

// Wrapper type narrowed to the methods we actually use.
// The full inferred type references private module paths that aren't
// portable across pnpm workspace boundaries with declaration: true.
export interface AppAuthClient {
  signIn: AuthClient["signIn"];
  signUp: AuthClient["signUp"];
  signOut: AuthClient["signOut"];
  admin: {
    impersonateUser: (opts: {
      userId: string;
      fetchOptions?: { onSuccess?: () => void };
    }) => Promise<unknown>;
    stopImpersonating: (opts?: {
      fetchOptions?: { onSuccess?: () => void };
    }) => Promise<unknown>;
    listUsers: (opts: {
      query: { limit?: number; offset?: number };
    }) => Promise<{
      data: {
        users: Array<{
          id: string;
          name: string;
          email: string;
          image?: string | null;
          role?: string | null;
        }>;
      };
    }>;
    createUser: (opts: {
      name: string;
      email: string;
      password?: string;
      role?: string;
    }) => Promise<unknown>;
  };
  [key: string]: unknown;
}

export const authClient = createAuthClient({
  plugins: [adminClient()],
}) as unknown as AppAuthClient;
