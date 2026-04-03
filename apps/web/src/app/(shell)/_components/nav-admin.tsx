"use client";

import { IconApi, IconDatabase, IconUserScan } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { name: "API Docs", url: "/api-docs", icon: IconApi },
  { name: "DB Studio", url: "/db-studio", icon: IconDatabase },
  {
    name: "Impersonate",
    url: "/impersonate",
    icon: IconUserScan,
    hideWhenImpersonating: true,
  },
];

export function NavAdmin({
  isImpersonating = false,
}: {
  isImpersonating?: boolean;
}) {
  const pathname = usePathname();
  const visibleItems = isImpersonating
    ? items.filter((i) => !i.hideWhenImpersonating)
    : items;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin</SidebarGroupLabel>
      <SidebarMenu>
        {visibleItems.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              tooltip={item.name}
              isActive={pathname === item.url}
              render={<Link href={item.url} />}
            >
              <item.icon />
              <span>{item.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
