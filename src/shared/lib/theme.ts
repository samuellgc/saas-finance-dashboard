export type AppTheme = "dark" | "light";

export const THEME_STORAGE_KEY = "saas-finance-dashboard-theme";

function isThemeValue(value: string | null): value is AppTheme {
  return value === "dark" || value === "light";
}

export function getPreferredTheme(): AppTheme {
  if (typeof window === "undefined") return "dark";

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (isThemeValue(storedTheme)) return storedTheme;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyTheme(theme: AppTheme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.dataset.theme = theme;
}

export const themeInitializationScript = `
  (() => {
    try {
      const storageKey = "${THEME_STORAGE_KEY}";
      const storedTheme = window.localStorage.getItem(storageKey);
      const theme =
        storedTheme === "light" || storedTheme === "dark"
          ? storedTheme
          : window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark";

      document.documentElement.classList.toggle("light", theme === "light");
      document.documentElement.dataset.theme = theme;
    } catch {
      document.documentElement.dataset.theme = "dark";
    }
  })();
`;
