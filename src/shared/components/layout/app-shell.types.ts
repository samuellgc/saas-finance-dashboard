import type { LucideIcon } from "lucide-react";

export type AppShellNavigationItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export type AppShellRouteMetadata = Pick<AppShellNavigationItem, "label" | "description">;

export type AppShellBrand = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

export type AppShellSidebarNote = {
  title: string;
  description: string;
};
