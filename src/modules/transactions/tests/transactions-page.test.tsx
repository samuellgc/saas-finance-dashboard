import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TransactionsPage } from "@/modules/transactions/components/transactions-page";
import { TRANSACTIONS_REFERENCE_DATE, transactionsMock } from "@/modules/transactions/mocks/transactions.mock";
import { createTransactionsService } from "@/modules/transactions/services/transactions.service";
import type { TransactionRecord } from "@/modules/transactions/types/transactions.types";

function renderTransactionsPage(transactions: TransactionRecord[] = transactionsMock) {
  const service = createTransactionsService({
    transactions,
    referenceDate: TRANSACTIONS_REFERENCE_DATE,
    delayMs: 0,
  });

  return render(<TransactionsPage service={service} />);
}

describe("<TransactionsPage />", () => {
  it("renderiza a página com toolbar, filtros, tabela e paginação", async () => {
    renderTransactionsPage();

    expect(screen.getByRole("heading", { name: "Lançamentos" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /90 dias/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo")).toBeInTheDocument();
    expect(screen.getByLabelText("Categoria")).toBeInTheDocument();
    expect(screen.getByLabelText("Contato")).toBeInTheDocument();
    expect(screen.getByLabelText("Buscar descrição")).toBeInTheDocument();

    expect(await screen.findByRole("button", { name: /novo lançamento/i })).toBeInTheDocument();
    expect(await screen.findByRole("region", { name: /tabela/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /paginação de lançamentos/i })).toBeInTheDocument();
  });

  it("combina filtros de tipo e categoria na tabela", async () => {
    const user = userEvent.setup();

    renderTransactionsPage();
    await screen.findByRole("region", { name: /tabela/i });

    await user.selectOptions(screen.getByLabelText("Tipo"), "exit");
    await user.selectOptions(screen.getByLabelText("Categoria"), "Marketing");

    expect(await screen.findByText("Campanha LinkedIn março")).toBeInTheDocument();
    expect(screen.getByText("Patrocínio podcast finanças")).toBeInTheDocument();
    expect(screen.queryByText("Recebimento mensal Acme")).not.toBeInTheDocument();
  });

  it("aplica busca na descrição", async () => {
    const user = userEvent.setup();

    renderTransactionsPage();
    await screen.findByRole("region", { name: /tabela/i });

    await user.type(screen.getByLabelText("Buscar descrição"), "aurora");

    expect(await screen.findByText("Recebimento projeto Aurora")).toBeInTheDocument();
    expect(screen.queryByText("Campanha LinkedIn março")).not.toBeInTheDocument();
  });

  it("renderiza empty state quando não existem lançamentos", async () => {
    renderTransactionsPage([]);

    expect(await screen.findByText(/nenhum lançamento cadastrado/i)).toBeInTheDocument();
  });

  it("renderiza estado sem resultados quando os filtros não retornam registros", async () => {
    const user = userEvent.setup();

    renderTransactionsPage();
    await screen.findByRole("region", { name: /tabela/i });

    await user.type(screen.getByLabelText("Buscar descrição"), "inexistente");

    expect(await screen.findByText(/nenhum lançamento encontrado/i)).toBeInTheDocument();
  });
});
