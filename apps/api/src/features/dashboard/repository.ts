import { prisma } from "@skeleton/db";
import type {
  CreateDocument,
  SummaryCard,
  VisitorDataPoint,
} from "@skeleton/shared";

import summaryData from "./data/summary-cards.json" with { type: "json" };
import visitorsData from "./data/visitors.json" with { type: "json" };

export function getVisitors(): VisitorDataPoint[] {
  return visitorsData as VisitorDataPoint[];
}

export function getSummaryCards(): SummaryCard[] {
  return summaryData as SummaryCard[];
}

const documentSelect = {
  id: true,
  header: true,
  type: true,
  status: true,
  target: true,
  limit: true,
  reviewer: true,
} as const;

export function getDocuments(userId: string) {
  return prisma.document.findMany({
    where: { userId },
    orderBy: { id: "asc" },
    select: documentSelect,
  });
}

export function createDocument(userId: string, data: CreateDocument) {
  return prisma.document.create({
    data: { ...data, userId },
    select: documentSelect,
  });
}

export function deleteDocument(userId: string, id: number) {
  return prisma.document.delete({
    where: { id, userId },
  });
}
