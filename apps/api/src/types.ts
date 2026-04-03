import type { auth } from "@skeleton/auth";

type Session = Awaited<ReturnType<typeof auth.api.getSession>>;

export type AppEnv = {
  Variables: {
    session: NonNullable<Session>;
  };
};
