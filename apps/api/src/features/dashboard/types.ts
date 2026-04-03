import { z } from "zod";

import {
  DocumentSchema,
  SummaryCardSchema,
  VisitorDataPointSchema,
} from "@health/shared";

export { DocumentSchema, SummaryCardSchema, VisitorDataPointSchema };

export const VisitorsResponseSchema = z.array(VisitorDataPointSchema);
export const SummaryResponseSchema = z.array(SummaryCardSchema);
export const DocumentsResponseSchema = z.array(DocumentSchema);
