import type { z } from "zod";

import type { BillingStatusSchema } from "./types.js";

type BillingStatus = z.infer<typeof BillingStatusSchema>;

export function getBillingStatus(): BillingStatus {
  return {
    plan: "pro",
    status: "active",
    currentPeriodEnd: "2026-05-01T00:00:00Z",
  };
}
