import type { AnchorHTMLAttributes, ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import {
  authenticatedAreaBrand,
  authenticatedAreaNavigation,
  authenticatedAreaSidebarNote,
  getAuthenticatedRouteMetadata,
} from "@/app/(app)/config/authenticated-shell";
import { AppShell } from "@/shared/components/layout/app-shell";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: ReactNode;
  }) => (
    <a
      href={href}
      {...props}
    >
      {children}
    </a>
  ),
}));

describe("<AppShell />", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("light");
    document.documentElement.removeAttribute("data-theme");
  });

  function renderShell(pathname = "/painel") {
    return render(
      <AppShell
        pathname={pathname}
        brand={authenticatedAreaBrand}
        sidebarNote={authenticatedAreaSidebarNote}
        navigationItems={authenticatedAreaNavigation}
        currentRoute={getAuthenticatedRouteMetadata(pathname)}
      >
        <div>Conteúdo de teste</div>
      </AppShell>
    );
  }

  it("renderiza sidebar, header e área principal com a navegação do sistema", () => {
    renderShell();

    expect(screen.getByRole("navigation", { name: /navegação principal/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Painel" })).toBeInTheDocument();
    expect(screen.getByText("Conteúdo de teste")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /fluxo de caixa/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ativar modo claro/i })).toBeInTheDocument();
  });

  it("destaca a rota ativa quando o caminho atual corresponde ao item da sidebar", () => {
    renderShell("/fluxo-de-caixa");

    expect(screen.getByRole("heading", { name: "Fluxo de Caixa" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /fluxo de caixa/i })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /painel/i })).not.toHaveAttribute("aria-current", "page");
  });
});
