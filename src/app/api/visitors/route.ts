import { getVisitorData } from "@/lib/data";
import { requireSession } from "@/lib/session";

export async function GET() {
  await requireSession();
  const visitors = await getVisitorData();
  return Response.json(visitors);
}
