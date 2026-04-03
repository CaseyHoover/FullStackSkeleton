import type { auth } from "@health/auth";

type Session = Awaited<ReturnType<typeof auth.api.getSession>>;

export type AppEnv = {
  Variables: {
    session: NonNullable<Session>;
  };
};
