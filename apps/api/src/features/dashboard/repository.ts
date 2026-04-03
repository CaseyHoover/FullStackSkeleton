import type { Document, SummaryCard, VisitorDataPoint } from "@health/shared";

import documentsData from "./data/documents.json" with { type: "json" };
import summaryData from "./data/summary-cards.json" with { type: "json" };
import visitorsData from "./data/visitors.json" with { type: "json" };

export function getVisitors(): VisitorDataPoint[] {
  return visitorsData as VisitorDataPoint[];
}

export function getSummaryCards(): SummaryCard[] {
  return summaryData as SummaryCard[];
}

export function getDocuments(): Document[] {
  return documentsData as Document[];
}
