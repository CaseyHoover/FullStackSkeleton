import { createApiClient } from "@skeleton/api-client";
import type { paths } from "@skeleton/api-client";
import useSWR, { useSWRConfig } from "swr";

const client = createApiClient();

const opts = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60_000,
} as const;

export function useVisitorData() {
  return useSWR(
    "/dashboard/visitors",
    async () => {
      const { data } = await client.GET("/dashboard/visitors");
      return data;
    },
    opts,
  );
}

export function useSummaryCards() {
  return useSWR(
    "/dashboard/summary",
    async () => {
      const { data } = await client.GET("/dashboard/summary");
      return data;
    },
    opts,
  );
}

export function useDocuments() {
  return useSWR(
    "/dashboard/documents",
    async () => {
      const { data } = await client.GET("/dashboard/documents");
      return data;
    },
    opts,
  );
}

type CreateDocumentBody = NonNullable<
  paths["/dashboard/documents"]["post"]["requestBody"]
>["content"]["application/json"];

export function useCreateDocument() {
  const { mutate } = useSWRConfig();

  async function createDocument(body: CreateDocumentBody) {
    const { data } = await client.POST("/dashboard/documents", { body });
    await mutate("/dashboard/documents");
    return data;
  }

  return { createDocument };
}

export function useDeleteDocument() {
  const { mutate } = useSWRConfig();

  async function deleteDocument(id: number) {
    await client.DELETE("/dashboard/documents/{id}", {
      params: { path: { id: String(id) } },
    });
    await mutate("/dashboard/documents");
  }

  return { deleteDocument };
}
