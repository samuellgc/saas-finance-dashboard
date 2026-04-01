import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewTransactionPage } from "@/modules/transactions/components/new-transaction-page";
import { buildTransactionFormOptions } from "@/modules/transactions/utils/transaction-form.utils";
import type {
  CreateTransactionPayload,
  CreateTransactionResult,
  TransactionFormService,
  TransactionRecord,
} from "@/modules/transactions/types/transactions.types";

function createTransactionResult(payload: CreateTransactionPayload): CreateTransactionResult {
  const transaction: TransactionRecord = {
    id: "transaction-1",
    type: payload.type,
    description: payload.description,
    amount: payload.amount,
    occurredAt: payload.occurredAt.slice(0, 10),
    category: payload.category,
    contact: payload.contact ?? "",
  };

  return {
    id: transaction.id,
    message: "Lançamento salvo com sucesso.",
    transaction,
  };
}

function createFormService(overrides: Partial<TransactionFormService> = {}): {
  service: TransactionFormService;
  createTransaction: TransactionFormService["createTransaction"];
} {
  const createTransaction: TransactionFormService["createTransaction"] = async payload =>
    createTransactionResult(payload);

  const service: TransactionFormService = {
    getFormOptions: () => buildTransactionFormOptions(),
    createTransaction,
    ...overrides,
  };

  return {
    service,
    createTransaction: service.createTransaction,
  };
}

function renderNewTransactionPage(service?: TransactionFormService) {
  return render(<NewTransactionPage service={service} />);
}

describe("<NewTransactionPage />", () => {
  it("renderiza o header, o formulário e as ações principais", () => {
    renderNewTransactionPage();

    expect(screen.getByRole("heading", { name: "Novo lançamento" })).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo")).toBeInTheDocument();
    expect(screen.getByLabelText("Descrição")).toBeInTheDocument();
    expect(screen.getByLabelText("Valor")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /\d{2}\/\d{2}\/\d{4}/ })).toBeInTheDocument();
    expect(screen.getByLabelText("Categoria")).toBeInTheDocument();
    expect(screen.getByLabelText("Contato")).toBeInTheDocument();
    expect(screen.getByLabelText("Observação")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /salvar lançamento/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cancelar/i })).toHaveAttribute("href", "/lancamentos");
  });

  it("exibe erros de validação quando o formulário é enviado incompleto", async () => {
    const user = userEvent.setup();
    const { service } = createFormService();

    renderNewTransactionPage(service);

    await user.click(screen.getByRole("button", { name: /salvar lançamento/i }));

    expect(await screen.findByText("Descrição é obrigatória")).toBeInTheDocument();
    expect(screen.getByText("Valor é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Categoria é obrigatória")).toBeInTheDocument();
  });

  it("submete o formulário com payload derivado corretamente", async () => {
    const user = userEvent.setup();
    const createTransaction = vi.fn(async (payload: CreateTransactionPayload) => createTransactionResult(payload));
    const { service } = createFormService({
      createTransaction,
    });

    renderNewTransactionPage(service);

    await user.type(screen.getByLabelText("Descrição"), "Recebimento consultoria abril");
    fireEvent.change(screen.getByLabelText("Valor"), {
      target: { value: "125050" },
    });
    await user.selectOptions(screen.getByLabelText("Categoria"), "Serviços");
    await user.selectOptions(screen.getByLabelText("Contato"), "Acme Corp");
    await user.type(screen.getByLabelText("Observação"), "Contrato mensal");
    await user.click(screen.getByRole("button", { name: /salvar lançamento/i }));

    await waitFor(() => expect(createTransaction).toHaveBeenCalledTimes(1));
    expect(createTransaction).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "entry",
        description: "Recebimento consultoria abril",
        amount: 1250.5,
        category: "Serviços",
        contact: "Acme Corp",
        notes: "Contrato mensal",
        occurredAt: expect.any(String),
      })
    );
    expect(await screen.findByText("Lançamento salvo com sucesso.")).toBeInTheDocument();
  });

  it("exibe erro de submissão quando o service falha", async () => {
    const user = userEvent.setup();
    const createTransaction = vi.fn(async () => {
      throw new Error("Falha ao salvar lançamento.");
    });
    const { service } = createFormService({
      createTransaction,
    });

    renderNewTransactionPage(service);

    await user.type(screen.getByLabelText("Descrição"), "Mensalidade plataforma");
    fireEvent.change(screen.getByLabelText("Valor"), {
      target: { value: "8990" },
    });
    await user.selectOptions(screen.getByLabelText("Categoria"), "Serviços");
    await user.click(screen.getByRole("button", { name: /salvar lançamento/i }));

    expect(await screen.findByText("Falha ao salvar lançamento.")).toBeInTheDocument();
  });
});
