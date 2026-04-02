import { getDocuments } from "@/lib/data";
import { requireSession } from "@/lib/session";

export async function GET() {
  await requireSession();
  const documents = await getDocuments();
  return Response.json(documents);
}
