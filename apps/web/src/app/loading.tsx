import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div
        className="
          flex flex-col gap-4 py-4
          md:gap-6 md:py-6
        "
      >
        <div
          className="
            grid grid-cols-1 gap-4 px-4
            lg:px-6
            @xl/main:grid-cols-2
            @5xl/main:grid-cols-4
          "
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-35 rounded-xl" />
          ))}
        </div>
        <div
          className="
            px-4
            lg:px-6
          "
        >
          <Skeleton className="h-87.5 rounded-xl" />
        </div>
        <div
          className="
            px-4
            lg:px-6
          "
        >
          <Skeleton className="h-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
