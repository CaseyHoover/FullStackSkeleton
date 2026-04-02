import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

export interface Document {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
}

export interface VisitorDataPoint {
  date: string;
  desktop: number;
  mobile: number;
}

export interface SummaryCard {
  title: string;
  value: string;
  badge: string;
  trend: "up" | "down";
  footerText: string;
  footerSub: string;
}

const dataDir = path.join(process.cwd(), "src", "data");

async function readJson<T>(filename: string): Promise<T> {
  const content = await readFile(path.join(dataDir, filename), "utf-8");
  return JSON.parse(content) as T;
}

export async function getDocuments(): Promise<Document[]> {
  return readJson<Document[]>("documents.json");
}

export async function getVisitorData(): Promise<VisitorDataPoint[]> {
  return readJson<VisitorDataPoint[]>("visitors.json");
}

export async function getSummaryCards(): Promise<SummaryCard[]> {
  return readJson<SummaryCard[]>("summary-cards.json");
}
