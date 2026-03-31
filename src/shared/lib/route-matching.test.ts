import { isRouteActive, normalizePathname } from "@/shared/lib/route-matching";

describe("route-matching", () => {
  it("normaliza barra final sem alterar a raiz", () => {
    expect(normalizePathname("/fluxo-de-caixa/")).toBe("/fluxo-de-caixa");
    expect(normalizePathname("/")).toBe("/");
  });

  it("considera ativa quando a rota é exata", () => {
    expect(isRouteActive("/painel", "/painel")).toBe(true);
  });

  it("considera ativa quando a rota atual é filha da rota base", () => {
    expect(isRouteActive("/fluxo-de-caixa/detalhes", "/fluxo-de-caixa")).toBe(true);
  });

  it("considera ativa mesmo com barra final na rota atual", () => {
    expect(isRouteActive("/categorias/", "/categorias")).toBe(true);
  });

  it("retorna falso para rotas não relacionadas", () => {
    expect(isRouteActive("/contatos", "/painel")).toBe(false);
  });
});
