import useSWR from "swr";

import type { Document, SummaryCard, VisitorDataPoint } from "@/app/(shell)/dashboard/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useVisitorData() {
  return useSWR<VisitorDataPoint[]>("/dashboard/api/visitors", fetcher);
}

export function useSummaryCards() {
  return useSWR<SummaryCard[]>("/dashboard/api/summary", fetcher);
}

export function useDocuments() {
  return useSWR<Document[]>("/dashboard/api/documents", fetcher);
}
