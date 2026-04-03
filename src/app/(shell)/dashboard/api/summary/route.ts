import { readFile } from "node:fs/promises";
import path from "node:path";

import { requireSession } from "@/auth/session";

export async function GET() {
  await requireSession();
  const content = await readFile(
    path.join(process.cwd(), "src/app/(shell)/dashboard/api/summary/summary-cards.json"),
    "utf-8",
  );
  return Response.json(JSON.parse(content));
}
