import { z } from "zod";

export const DocumentSchema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});

export const VisitorDataPointSchema = z.object({
  date: z.string(),
  desktop: z.number(),
  mobile: z.number(),
});

export const SummaryCardSchema = z.object({
  title: z.string(),
  value: z.string(),
  badge: z.string(),
  trend: z.enum(["up", "down"]),
  footerText: z.string(),
  footerSub: z.string(),
});

export const DocumentsArraySchema = z.array(DocumentSchema);
export const VisitorsArraySchema = z.array(VisitorDataPointSchema);
export const SummaryCardsArraySchema = z.array(SummaryCardSchema);

export type Document = z.infer<typeof DocumentSchema>;
export type VisitorDataPoint = z.infer<typeof VisitorDataPointSchema>;
export type SummaryCard = z.infer<typeof SummaryCardSchema>;
