import { IconBarrierBlock } from "@tabler/icons-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function UnderConstruction({ title }: { title: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <IconBarrierBlock className="size-12 text-muted-foreground" />
      <div className="text-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mt-1 text-muted-foreground">
          This page is under construction.
        </p>
      </div>
      <Button nativeButton={false} render={<Link href="/" />}>
        Go home
      </Button>
    </div>
  );
}
