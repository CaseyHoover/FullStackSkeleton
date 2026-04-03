import { cookies } from "next/headers";

import { AppSidebar } from "@/app/(shell)/_components/app-sidebar";
import { SiteHeader } from "@/app/(shell)/_components/site-header";
import { getSession } from "@/auth/session";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";
  const session = await getSession();
  const isImpersonating = Boolean(session?.session.impersonatedBy);

  return (
    <SidebarProvider defaultOpen={defaultOpen} className="[--sidebar-width:--spacing(72)]">
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader isImpersonating={isImpersonating} />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
