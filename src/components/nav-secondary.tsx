"use client";

import {
  IconBrightness,
  IconHelp,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import * as React from "react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useMounted } from "@/hooks/use-mounted";

const items = [
  { title: "Settings", url: "#", icon: IconSettings },
  { title: "Get Help", url: "#", icon: IconHelp },
  { title: "Search", url: "#", icon: IconSearch },
];

export function NavSecondary(
  props: Omit<React.ComponentPropsWithoutRef<typeof SidebarGroup>, "children">,
) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton render={<Link href={item.url} />}>
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- Switch is rendered as a child */}
            <SidebarMenuButton render={<label />}>
              <IconBrightness />
              <span>Dark Mode</span>
              {mounted ? (
                <Switch
                  className="ml-auto"
                  checked={resolvedTheme !== "light"}
                  onCheckedChange={() =>
                    { setTheme(resolvedTheme === "dark" ? "light" : "dark"); }
                  }
                />
              ) : (
                <Skeleton className="ml-auto h-4 w-8 rounded-full" />
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
