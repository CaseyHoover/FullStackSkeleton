import { createApiClient } from "@health/api-client";
import type { paths } from "@health/api-client";
import useSWR, { useSWRConfig } from "swr";

const client = createApiClient();

const opts = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60_000,
} as const;

export function useVisitorData() {
  return useSWR("/dashboard/visitors", async () => {
    const { data, error } = await client.GET("/dashboard/visitors");
    if (error) throw error;
    return data;
  }, opts);
}

export function useSummaryCards() {
  return useSWR("/dashboard/summary", async () => {
    const { data, error } = await client.GET("/dashboard/summary");
    if (error) throw error;
    return data;
  }, opts);
}

export function useDocuments() {
  return useSWR("/dashboard/documents", async () => {
    const { data, error } = await client.GET("/dashboard/documents");
    if (error) throw error;
    return data;
  }, opts);
}

type CreateDocumentBody = NonNullable<paths["/dashboard/documents"]["post"]["requestBody"]>["content"]["application/json"];

export function useCreateDocument() {
  const { mutate } = useSWRConfig();

  async function createDocument(body: CreateDocumentBody) {
    const { data, error } = await client.POST("/dashboard/documents", { body });
    if (error) throw error;
    await mutate("/dashboard/documents");
    return data;
  }

  return { createDocument };
}

export function useDeleteDocument() {
  const { mutate } = useSWRConfig();

  async function deleteDocument(id: number) {
    const { error } = await client.DELETE("/dashboard/documents/{id}", {
      params: { path: { id: String(id) } },
    });
    if (error) throw error;
    await mutate("/dashboard/documents");
  }

  return { deleteDocument };
}
