import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CashFlowPage } from "@/modules/cash-flow/components/cash-flow-page";
import { CASH_FLOW_REFERENCE_DATE, cashFlowTransactionsMock } from "@/modules/cash-flow/mocks/cash-flow.mock";
import { createCashFlowService } from "@/modules/cash-flow/services/cash-flow.service";
import type { CashFlowTransaction } from "@/modules/cash-flow/types/cash-flow.types";

function renderCashFlowPage(transactions: CashFlowTransaction[] = cashFlowTransactionsMock) {
  const service = createCashFlowService({
    transactions,
    referenceDate: CASH_FLOW_REFERENCE_DATE,
    delayMs: 0,
  });

  return render(<CashFlowPage service={service} />);
}

describe("<CashFlowPage />", () => {
  it("renderiza a página com filtros, cards, gráfico e tabela", async () => {
    renderCashFlowPage();

    expect(screen.getByRole("heading", { name: "Fluxo de Caixa" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /90 dias/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo")).toBeInTheDocument();
    expect(screen.getByLabelText("Categoria")).toBeInTheDocument();
    expect(screen.getByLabelText("Contato")).toBeInTheDocument();

    expect(await screen.findByRole("region", { name: /indicadores do fluxo de caixa/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /gráfico principal/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /resumo por período/i })).toBeInTheDocument();
  });

  it("aplica os filtros de tipo e categoria ao overview do fluxo", async () => {
    const user = userEvent.setup();

    renderCashFlowPage();

    await screen.findByRole("region", { name: /indicadores do fluxo de caixa/i });

    await user.selectOptions(screen.getByLabelText("Tipo"), "exit");
    await user.selectOptions(screen.getByLabelText("Categoria"), "Marketing");

    const summarySection = await screen.findByRole("region", {
      name: /indicadores do fluxo de caixa/i,
    });

    expect(within(summarySection).getByText(/R\$\s?0,00/)).toBeInTheDocument();
    expect(within(summarySection).getByText(/^R\$\s?1\.790,00$/)).toBeInTheDocument();
    expect(within(summarySection).getByText(/-R\$\s?1\.790,00/)).toBeInTheDocument();
  });

  it("renderiza empty state quando os filtros removem todos os registros do período", async () => {
    const user = userEvent.setup();

    renderCashFlowPage();
    await screen.findByRole("region", { name: /indicadores do fluxo de caixa/i });

    await user.selectOptions(screen.getByLabelText("Contato"), "Logus");

    expect(await screen.findByText(/nenhum dado encontrado para o fluxo selecionado/i)).toBeInTheDocument();
  });
});
