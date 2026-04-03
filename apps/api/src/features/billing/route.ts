import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import * as service from "./service.js";
import { BillingStatusResponseSchema } from "./types.js";

export const billingRoutes = new OpenAPIHono();

const statusRoute = createRoute({
  method: "get",
  path: "/status",
  responses: {
    200: {
      content: { "application/json": { schema: BillingStatusResponseSchema } },
      description: "Current billing status",
    },
  },
});

billingRoutes.openapi(statusRoute, (c) =>
  c.json(service.getBillingStatus()),
);
