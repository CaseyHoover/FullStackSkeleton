import createClient from "openapi-fetch";

import type { paths } from "./schema.js";

export type { paths };

export function createApiClient(baseUrl?: string) {
  return createClient<paths>({
    baseUrl:
      baseUrl ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
    credentials: "include",
  });
}
