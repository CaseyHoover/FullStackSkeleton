import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";
import "./theme.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
  ),
  title: {
    template: "%s | HealthDash",
    default: "HealthDash",
  },
  description: "Your personal health dashboard",
  openGraph: {
    title: "HealthDash",
    description: "Your personal health dashboard",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SidebarProvider
              defaultOpen={defaultOpen}
              className="[--sidebar-width:calc(var(--spacing)*72)]"
            >
              <AppSidebar variant="inset" />
              <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">{children}</div>
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
