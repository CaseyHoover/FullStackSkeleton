import { getSummaryCards } from "@/lib/data";
import { requireSession } from "@/lib/session";

export async function GET() {
  await requireSession();
  const summary = await getSummaryCards();
  return Response.json(summary);
}
