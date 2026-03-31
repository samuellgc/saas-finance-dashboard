"use client";

import type { ReactNode } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/shared/components/shadcn/ui/button";
import { PageContainer } from "@/shared/components/layout/page-container";
import { ThemeToggle } from "@/shared/components/layout/theme-toggle";

type AppHeaderProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  onOpenNavigation: () => void;
};

export function AppHeader({ title, description, actions, onOpenNavigation }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[rgba(14,18,20,0.86)] backdrop-blur-xl light:border-black/10 light:bg-[rgba(255,255,255,0.88)]">
      <PageContainer className="py-4 sm:py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="fit"
              onClick={onOpenNavigation}
              aria-label="Abrir menu de navegação"
              className="flex size-10 items-center justify-center rounded-full border-white/10 bg-white/5 p-0 md:hidden light:border-black/10 light:bg-white"
            >
              <Menu
                className="size-5"
                aria-hidden="true"
              />
            </Button>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Área autenticada</p>
              <h1 className="truncate text-xl font-bold text-gray-7 sm:text-2xl">{title}</h1>
              <p className="mt-1 hidden text-sm text-gray-6 sm:block">{description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div
              data-slot="header-actions"
              className="hidden items-center gap-3 md:flex"
            >
              {actions}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
