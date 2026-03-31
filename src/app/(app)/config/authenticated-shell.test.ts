import { authenticatedAreaNavigation, getAuthenticatedRouteMetadata } from "@/app/(app)/config/authenticated-shell";

describe("authenticated-shell config", () => {
  it("expõe o catálogo esperado da navegação autenticada", () => {
    expect(authenticatedAreaNavigation.map(item => item.href)).toEqual([
      "/painel",
      "/fluxo-de-caixa",
      "/lancamentos",
      "/categorias",
      "/contatos",
    ]);
  });

  it("retorna metadata para rota exata mapeada", () => {
    expect(getAuthenticatedRouteMetadata("/painel")).toEqual({
      label: "Painel",
      description: "Visão geral do desempenho financeiro.",
    });
  });

  it("retorna metadata correta para rota filha", () => {
    expect(getAuthenticatedRouteMetadata("/fluxo-de-caixa/detalhes")).toEqual({
      label: "Fluxo de Caixa",
      description: "Entradas, saídas e saldo consolidado.",
    });
  });

  it("retorna metadata correta com barra final", () => {
    expect(getAuthenticatedRouteMetadata("/lancamentos/")).toEqual({
      label: "Lançamentos",
      description: "Movimentações financeiras do dia a dia.",
    });
  });

  it("retorna fallback quando a rota não está mapeada", () => {
    expect(getAuthenticatedRouteMetadata("/rota-inexistente")).toEqual({
      label: "Aplicação",
      description: "Área principal autenticada do sistema financeiro.",
    });
  });
});
