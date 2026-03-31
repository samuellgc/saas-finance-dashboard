"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppShell } from "@/shared/components/layout/app-shell";
import {
  authenticatedAreaBrand,
  authenticatedAreaNavigation,
  authenticatedAreaSidebarNote,
  getAuthenticatedRouteMetadata,
} from "@/app/(app)/config/authenticated-shell";

export function AuthenticatedAreaShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";

  return (
    <AppShell
      pathname={pathname}
      brand={authenticatedAreaBrand}
      sidebarNote={authenticatedAreaSidebarNote}
      navigationItems={authenticatedAreaNavigation}
      currentRoute={getAuthenticatedRouteMetadata(pathname)}
    >
      {children}
    </AppShell>
  );
}
