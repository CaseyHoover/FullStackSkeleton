import { createApiClient } from "@health/api-client";
import useSWR from "swr";

const client = createApiClient();

export function useVisitorData() {
  return useSWR("/dashboard/visitors", async () => {
    const { data, error } = await client.GET("/dashboard/visitors");
    if (error) throw error;
    return data;
  });
}

export function useSummaryCards() {
  return useSWR("/dashboard/summary", async () => {
    const { data, error } = await client.GET("/dashboard/summary");
    if (error) throw error;
    return data;
  });
}

export function useDocuments() {
  return useSWR("/dashboard/documents", async () => {
    const { data, error } = await client.GET("/dashboard/documents");
    if (error) throw error;
    return data;
  });
}
