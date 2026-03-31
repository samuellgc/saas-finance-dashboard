"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AppHeader } from "@/shared/components/layout/app-header";
import { AppSidebar } from "@/shared/components/layout/app-sidebar";
import { PageContainer } from "@/shared/components/layout/page-container";
import type {
  AppShellBrand,
  AppShellNavigationItem,
  AppShellRouteMetadata,
  AppShellSidebarNote,
} from "@/shared/components/layout/app-shell.types";

type AppShellProps = {
  children: ReactNode;
  pathname: string;
  brand: AppShellBrand;
  sidebarNote: AppShellSidebarNote;
  navigationItems: AppShellNavigationItem[];
  currentRoute: AppShellRouteMetadata;
};

export function AppShell({ children, pathname, brand, sidebarNote, navigationItems, currentRoute }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(46,167,138,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_22%)] light:bg-[radial-gradient(circle_at_top_left,rgba(46,167,138,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.06),transparent_22%)]" />

      <div className="relative flex min-h-screen">
        <AppSidebar
          pathname={pathname}
          brand={brand}
          sidebarNote={sidebarNote}
          navigationItems={navigationItems}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader
            title={currentRoute.label}
            description={currentRoute.description}
            onOpenNavigation={() => setMobileOpen(true)}
          />

          <main className="flex-1 overflow-y-auto">
            <PageContainer
              as="section"
              className="pb-8"
            >
              {children}
            </PageContainer>
          </main>
        </div>
      </div>
    </div>
  );
}
