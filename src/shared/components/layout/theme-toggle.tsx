"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/shared/components/shadcn/ui/button";
import { THEME_STORAGE_KEY, applyTheme, getPreferredTheme, type AppTheme } from "@/shared/lib/theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<AppTheme>("dark");

  useEffect(() => {
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);
    applyTheme(preferredTheme);
  }, []);

  const isDarkTheme = theme === "dark";

  function handleToggleTheme() {
    const nextTheme: AppTheme = isDarkTheme ? "light" : "dark";

    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="fit"
      onClick={handleToggleTheme}
      aria-label={isDarkTheme ? "Ativar modo claro" : "Ativar modo escuro"}
      title={isDarkTheme ? "Ativar modo claro" : "Ativar modo escuro"}
      className="h-10 rounded-full border-white/10 bg-white/5 px-3 text-gray-7 hover:bg-white/10 light:border-black/10 light:bg-white light:text-gray-7 light:hover:bg-black/5"
    >
      {isDarkTheme ? (
        <SunMedium
          className="size-4"
          aria-hidden="true"
        />
      ) : (
        <MoonStar
          className="size-4"
          aria-hidden="true"
        />
      )}
      <span className="hidden sm:inline">{isDarkTheme ? "Modo claro" : "Modo escuro"}</span>
    </Button>
  );
}
