import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import * as service from "./service.js";
import {
  DocumentsResponseSchema,
  SummaryResponseSchema,
  VisitorsResponseSchema,
} from "./types.js";

export const dashboardRoutes = new OpenAPIHono();

const visitorsRoute = createRoute({
  method: "get",
  path: "/visitors",
  responses: {
    200: {
      content: { "application/json": { schema: VisitorsResponseSchema } },
      description: "Visitor data",
    },
  },
});

const summaryRoute = createRoute({
  method: "get",
  path: "/summary",
  responses: {
    200: {
      content: { "application/json": { schema: SummaryResponseSchema } },
      description: "Summary cards",
    },
  },
});

const documentsRoute = createRoute({
  method: "get",
  path: "/documents",
  responses: {
    200: {
      content: { "application/json": { schema: DocumentsResponseSchema } },
      description: "Documents list",
    },
  },
});

dashboardRoutes.openapi(visitorsRoute, (c) => c.json(service.getVisitors()));
dashboardRoutes.openapi(summaryRoute, (c) => c.json(service.getSummaryCards()));
dashboardRoutes.openapi(documentsRoute, (c) => c.json(service.getDocuments()));
