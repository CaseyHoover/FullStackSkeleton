import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">FullStackSkeleton</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A full-stack application skeleton
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/sign-in" />}
        >
          Sign in
        </Button>
        <Button nativeButton={false} render={<Link href="/sign-in" />}>
          Get started
        </Button>
      </div>
    </div>
  );
}
