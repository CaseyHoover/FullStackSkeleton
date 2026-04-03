import useSWR from "swr";

import type { Document, SummaryCard, VisitorDataPoint } from "@health/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json() as Promise<T>;
}

export function useVisitorData() {
  return useSWR<VisitorDataPoint[]>(`${API_URL}/dashboard/visitors`, fetcher);
}

export function useSummaryCards() {
  return useSWR<SummaryCard[]>(`${API_URL}/dashboard/summary`, fetcher);
}

export function useDocuments() {
  return useSWR<Document[]>(`${API_URL}/dashboard/documents`, fetcher);
}
