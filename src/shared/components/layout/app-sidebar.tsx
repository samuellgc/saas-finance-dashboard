"use client";

import Link from "next/link";
import type {
  AppShellBrand,
  AppShellNavigationItem,
  AppShellSidebarNote,
} from "@/shared/components/layout/app-shell.types";
import { PanelLeftClose } from "lucide-react";
import { isRouteActive } from "@/shared/lib/route-matching";
import { cn } from "@/shared/lib/utils";

type AppSidebarProps = {
  pathname: string;
  brand: AppShellBrand;
  sidebarNote: AppShellSidebarNote;
  navigationItems: AppShellNavigationItem[];
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export function AppSidebar({
  pathname,
  brand,
  sidebarNote,
  navigationItems,
  mobileOpen,
  onCloseMobile,
}: AppSidebarProps) {
  const BrandIcon = brand.icon;

  return (
    <>
      <button
        type="button"
        aria-label="Fechar navegação"
        onClick={onCloseMobile}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-74 flex-col border-r border-white/10 bg-[rgba(11,14,16,0.94)] px-3 py-4 text-gray-7 shadow-2xl transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 md:shadow-none light:border-black/10 light:bg-[rgba(255,255,255,0.94)]",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between gap-3 px-3 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <BrandIcon
                className="size-5"
                aria-hidden="true"
              />
            </div>

            <div>
              <p className="text-sm font-bold text-gray-7">{brand.title}</p>
              <p className="text-xs text-gray-6">{brand.subtitle}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Fechar menu lateral"
            className="inline-flex size-10 items-center justify-center rounded-full text-gray-6 transition hover:bg-white/10 hover:text-gray-7 md:hidden light:hover:bg-black/5"
          >
            <PanelLeftClose
              className="size-5"
              aria-hidden="true"
            />
          </button>
        </div>

        <nav
          aria-label="Navegação principal"
          className="flex-1"
        >
          <ul className="space-y-1">
            {navigationItems.map(item => {
              const Icon = item.icon;
              const isActive = isRouteActive(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onCloseMobile}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group flex items-center gap-3 rounded-2xl border px-3 py-3 transition-colors",
                      isActive
                        ? "border-primary/25 bg-primary/15 text-primary shadow-card"
                        : "border-transparent text-gray-6 hover:border-white/10 hover:bg-white/10 hover:text-gray-7 light:hover:border-black/10 light:hover:bg-black/5"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                        isActive
                          ? "bg-primary/15 text-primary"
                          : "bg-white/10 text-gray-6 group-hover:text-gray-7 light:bg-black/5"
                      )}
                    >
                      <Icon
                        className="size-5"
                        aria-hidden="true"
                      />
                    </span>

                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{item.label}</span>
                      <span className="block truncate text-xs text-gray-5">{item.description}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-3 pt-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 light:border-black/10 light:bg-black/5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{sidebarNote.title}</p>
            <p className="mt-2 text-sm text-gray-6">{sidebarNote.description}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
