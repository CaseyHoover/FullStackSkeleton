"use client";

import { IconUserOff } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

import { ModeToggle } from "@/app/(shell)/_components/mode-toggle";
import { authClient } from "@/auth/client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

function titleFromPathname(pathname: string) {
  const segment = pathname.split("/").filter(Boolean).pop() ?? "dashboard";
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function SiteHeader({
  isImpersonating = false,
}: {
  isImpersonating?: boolean;
}) {
  const pathname = usePathname();

  return (
    <header
      className="
        flex h-(--header-height) shrink-0 items-center gap-2 border-b
        transition-[width,height] ease-linear
        group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)
      "
    >
      <div
        className="
          flex w-full items-center gap-1 px-4
          lg:gap-2 lg:px-6
        "
      >
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="
            mx-2
            data-[orientation=vertical]:h-4
          "
        />
        <h1 className="text-base font-medium">{titleFromPathname(pathname)}</h1>
        <div className="ml-auto flex items-center gap-2">
          {isImpersonating && (
            <Button
              size="sm"
              variant="outline"
              className="
                h-7 gap-1.5 border-amber-500/50 bg-amber-500/10 text-xs
                text-amber-600
                hover:bg-amber-500/20
                dark:text-amber-400
              "
              onClick={() => {
                void authClient.admin.stopImpersonating({
                  fetchOptions: {
                    onSuccess: () => {
                      window.location.reload();
                    },
                  },
                });
              }}
            >
              <IconUserOff className="size-3.5" />
              Stop Impersonating
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
