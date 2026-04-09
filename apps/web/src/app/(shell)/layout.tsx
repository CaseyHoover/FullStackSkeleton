import { cookies } from "next/headers";

import { AppSidebar } from "@/app/(shell)/_components/app-sidebar";
import { SiteHeader } from "@/app/(shell)/_components/site-header";
import { getSession } from "@/auth/session";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

async function getSidebarDefault() {
  const cookieStore = await cookies();
  return cookieStore.get("sidebar_state")?.value !== "false";
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultOpen = await getSidebarDefault();
  const session = await getSession();
  const isImpersonating = Boolean(session?.session.impersonatedBy);

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="[--sidebar-width:--spacing(72)]"
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader isImpersonating={isImpersonating} />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
