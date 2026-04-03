import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { stringify } from "yaml";

// Import the Hono app to extract the OpenAPI spec
import { app } from "../../../apps/api/src/app.js";

const spec = app.getOpenAPI31Document({
  openapi: "3.1.0",
  info: { title: "HealthDash API", version: "0.1.0" },
});

const outPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../openapi.yaml",
);

writeFileSync(outPath, stringify(spec));
console.log(`Generated ${outPath}`);
