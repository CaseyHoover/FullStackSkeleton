import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

import type { AppEnv } from "../../types.js";
import {
  CreateDocumentSchema,
  DocumentSchema,
  DocumentsArraySchema,
  SummaryCardsArraySchema,
  VisitorsArraySchema,
} from "@skeleton/shared";

import * as service from "./service.js";

export const dashboardRoutes = new OpenAPIHono<AppEnv>();

const visitorsRoute = createRoute({
  method: "get",
  path: "/visitors",
  responses: {
    200: {
      content: { "application/json": { schema: VisitorsArraySchema } },
      description: "Visitor data",
    },
  },
});

const summaryRoute = createRoute({
  method: "get",
  path: "/summary",
  responses: {
    200: {
      content: { "application/json": { schema: SummaryCardsArraySchema } },
      description: "Summary cards",
    },
  },
});

const documentsRoute = createRoute({
  method: "get",
  path: "/documents",
  responses: {
    200: {
      content: { "application/json": { schema: DocumentsArraySchema } },
      description: "Documents list",
    },
  },
});

const createDocumentRoute = createRoute({
  method: "post",
  path: "/documents",
  request: {
    body: {
      content: { "application/json": { schema: CreateDocumentSchema } },
    },
  },
  responses: {
    201: {
      content: { "application/json": { schema: DocumentSchema } },
      description: "Created document",
    },
  },
});

dashboardRoutes.openapi(visitorsRoute, (c) => c.json(service.getVisitors()));
dashboardRoutes.openapi(summaryRoute, (c) => c.json(service.getSummaryCards()));

dashboardRoutes.openapi(documentsRoute, async (c) => {
  const session = c.get("session");
  const docs = await service.getDocuments(session.user.id);
  return c.json(docs);
});

dashboardRoutes.openapi(createDocumentRoute, async (c) => {
  const session = c.get("session");
  const body = c.req.valid("json");
  const doc = await service.createDocument(session.user.id, body);
  return c.json(doc, 201);
});

const deleteDocumentRoute = createRoute({
  method: "delete",
  path: "/documents/{id}",
  request: {
    params: z.object({ id: z.string().pipe(z.coerce.number()) }),
  },
  responses: {
    204: { description: "Document deleted" },
  },
});

dashboardRoutes.openapi(deleteDocumentRoute, async (c) => {
  const session = c.get("session");
  const { id } = c.req.valid("param");
  await service.deleteDocument(session.user.id, id);
  return c.body(null, 204);
});
