import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import {
  DocumentsArraySchema,
  SummaryCardsArraySchema,
  VisitorsArraySchema,
} from "@health/shared";

import * as service from "./service.js";

export const dashboardRoutes = new OpenAPIHono();

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

dashboardRoutes.openapi(visitorsRoute, (c) => c.json(service.getVisitors()));
dashboardRoutes.openapi(summaryRoute, (c) => c.json(service.getSummaryCards()));
dashboardRoutes.openapi(documentsRoute, (c) => c.json(service.getDocuments()));
