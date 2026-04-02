import { redirect } from "next/navigation";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { getDocuments, getSummaryCards, getVisitorData } from "@/lib/data";
import { getSession } from "@/lib/session";

export default async function Page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  const [documents, visitorData, summaryCards] = await Promise.all([
    getDocuments(),
    getVisitorData(),
    getSummaryCards(),
  ]);

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="
        flex flex-col gap-4 py-4
        md:gap-6 md:py-6
      ">
        <SectionCards cards={summaryCards} />
        <div className="
          px-4
          lg:px-6
        ">
          <ChartAreaInteractive data={visitorData} />
        </div>
        <DataTable data={documents} />
      </div>
    </div>
  );
}
