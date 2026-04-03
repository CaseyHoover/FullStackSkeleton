import { z } from "zod";

export const BillingStatusSchema = z.object({
  plan: z.string(),
  status: z.enum(["active", "trialing", "canceled", "past_due"]),
  currentPeriodEnd: z.string(),
});

export const BillingStatusResponseSchema = BillingStatusSchema;
