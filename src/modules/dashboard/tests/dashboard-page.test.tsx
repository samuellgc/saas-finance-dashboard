import { render, screen, within } from "@testing-library/react";
import { DashboardPage } from "@/modules/dashboard/components/dashboard-page";
import { DASHBOARD_REFERENCE_DATE, dashboardTransactionsMock } from "@/modules/dashboard/mocks/dashboard.mock";
import { createDashboardService } from "@/modules/dashboard/services/dashboard.service";
import type { DashboardTransaction } from "@/modules/dashboard/types/dashboard.types";

function renderDashboardPage(transactions: DashboardTransaction[] = dashboardTransactionsMock) {
  const service = createDashboardService({
    transactions,
    referenceDate: DASHBOARD_REFERENCE_DATE,
    delayMs: 0,
  });

  return render(<DashboardPage service={service} />);
}

describe("<DashboardPage />", () => {
  it("renderiza a página com filtro, indicadores, gráfico, categorias e movimentações recentes", async () => {
    renderDashboardPage();

    expect(screen.getByRole("heading", { name: "Painel" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: /filtrar período do painel/i })).toBeInTheDocument();

    expect(await screen.findByRole("region", { name: /indicadores do painel/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /entradas vs saídas/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /resumo por categoria/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /últimas movimentações/i })).toBeInTheDocument();
  });

  it("renderiza os cards de indicadores com os totais do período padrão", async () => {
    renderDashboardPage();

    const indicatorsSection = await screen.findByRole("region", { name: /indicadores do painel/i });

    expect(within(indicatorsSection).getByText("Total de entradas")).toBeInTheDocument();
    expect(within(indicatorsSection).getByText(/37\.700,00/)).toBeInTheDocument();
    expect(within(indicatorsSection).getByText(/11\.710,00/)).toBeInTheDocument();
    expect(within(indicatorsSection).getByText(/25\.990,00/)).toBeInTheDocument();
    expect(within(indicatorsSection).getByText("12")).toBeInTheDocument();
  });

  it("renderiza empty state quando não há dados no período", async () => {
    renderDashboardPage([]);

    expect(await screen.findByText(/nenhuma movimentação encontrada/i)).toBeInTheDocument();
    expect(
      screen.getByText(/ajuste o período ou aguarde novos lançamentos para visualizar indicadores/i)
    ).toBeInTheDocument();
  });

  it("renderiza as últimas movimentações em ordem decrescente e limitadas a cinco itens", async () => {
    renderDashboardPage();

    const recentTransactionsSection = await screen.findByRole("region", {
      name: /últimas movimentações/i,
    });
    const items = within(recentTransactionsSection).getAllByRole("listitem");

    expect(items).toHaveLength(5);
    expect(within(items[0]).getByText("MRR - Plano Growth")).toBeInTheDocument();
    expect(within(items[1]).getByText("Infraestrutura em nuvem")).toBeInTheDocument();
    expect(within(items[4]).getByText("Folha operacional")).toBeInTheDocument();
  });
});
