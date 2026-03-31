import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { ThemeToggle } from "@/shared/components/layout/theme-toggle";
import { THEME_STORAGE_KEY } from "@/shared/lib/theme";

describe("<ThemeToggle />", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("light");
    document.documentElement.removeAttribute("data-theme");
  });

  it("aplica o tema salvo no localStorage ao montar", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "light");

    render(<ThemeToggle />);

    expect(document.documentElement).toHaveClass("light");
    expect(screen.getByRole("button", { name: /ativar modo escuro/i })).toBeInTheDocument();
  });

  it("alterna o tema e persiste a preferência do usuário", async () => {
    const user = userEvent.setup();

    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /ativar modo claro/i });
    await user.click(button);

    expect(document.documentElement).toHaveClass("light");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(screen.getByRole("button", { name: /ativar modo escuro/i })).toBeInTheDocument();
  });
});
