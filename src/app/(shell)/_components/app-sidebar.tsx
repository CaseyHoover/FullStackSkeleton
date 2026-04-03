import { IconInnerShadowTop } from "@tabler/icons-react";
import Link from "next/link";
import * as React from "react";

import { NavDocuments } from "@/app/(shell)/_components/nav-documents";
import { NavMain } from "@/app/(shell)/_components/nav-main";
import { NavUser } from "@/app/(shell)/_components/nav-user";
import { getSession } from "@/auth/session";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const session = await getSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link href="/" />}
            >
              <IconInnerShadowTop className="size-5!" />
              <span className="text-base font-semibold">Acme Inc.</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavDocuments />
      </SidebarContent>
      {session?.user && (
        <SidebarFooter>
          <NavUser user={session.user} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
