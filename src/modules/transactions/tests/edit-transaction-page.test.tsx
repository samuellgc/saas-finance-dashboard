import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditTransactionPage } from "@/modules/transactions/components/edit-transaction-page";
import { buildTransactionFormOptions } from "@/modules/transactions/utils/transaction-form.utils";
import { transactionsMock } from "@/modules/transactions/mocks/transactions.mock";
import type {
  CreateTransactionPayload,
  DeleteTransactionResult,
  TransactionEditorService,
  TransactionRecord,
  UpdateTransactionResult,
} from "@/modules/transactions/types/transactions.types";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const transactionToEdit = transactionsMock[2] as TransactionRecord;

function createUpdateResult(id: string, payload: CreateTransactionPayload): UpdateTransactionResult {
  return {
    id,
    message: "Lançamento atualizado com sucesso.",
    transaction: {
      id,
      type: payload.type,
      description: payload.description,
      amount: payload.amount,
      occurredAt: payload.occurredAt.slice(0, 10),
      category: payload.category,
      contact: payload.contact ?? "",
    },
  };
}

function createDeleteResult(id: string): DeleteTransactionResult {
  return {
    id,
    message: "Lançamento excluído com sucesso.",
  };
}

function createEditorService(overrides: Partial<TransactionEditorService> = {}): TransactionEditorService {
  return {
    getFormOptions: () => buildTransactionFormOptions(),
    getTransactionById: async id => transactionsMock.find(transaction => transaction.id === id) ?? null,
    updateTransaction: async (id, payload) => createUpdateResult(id, payload),
    deleteTransaction: async id => createDeleteResult(id),
    ...overrides,
  };
}

function renderEditTransactionPage(
  service?: TransactionEditorService,
  overrides: Partial<Parameters<typeof EditTransactionPage>[0]> = {}
) {
  return render(
    <EditTransactionPage
      transactionId={transactionToEdit.id}
      service={service}
      confirmDelete={() => true}
      navigate={vi.fn()}
      {...overrides}
    />
  );
}

describe("<EditTransactionPage />", () => {
  it("renderiza estado de loading enquanto o lançamento é carregado", () => {
    const service = createEditorService({
      getTransactionById: () => new Promise(() => undefined),
    });

    renderEditTransactionPage(service);

    expect(screen.getByRole("heading", { name: "Carregando lançamento" })).toBeInTheDocument();
    expect(screen.getByText(/buscando os dados mockados/i)).toBeInTheDocument();
  });

  it("preenche o formulário com os dados do lançamento e salva a edição", async () => {
    const user = userEvent.setup();
    const updateTransaction = vi.fn(async (id: string, payload: CreateTransactionPayload) =>
      createUpdateResult(id, payload)
    );
    const service = createEditorService({
      updateTransaction,
    });

    renderEditTransactionPage(service);

    expect(await screen.findByDisplayValue("Campanha LinkedIn março")).toBeInTheDocument();

    await user.clear(screen.getByLabelText("Descrição"));
    await user.type(screen.getByLabelText("Descrição"), "Campanha LinkedIn abril");
    fireEvent.change(screen.getByLabelText("Valor"), {
      target: { value: "132000" },
    });
    await user.click(screen.getByRole("button", { name: /salvar alterações/i }));

    await waitFor(() => expect(updateTransaction).toHaveBeenCalledTimes(1));
    expect(updateTransaction).toHaveBeenCalledWith(
      transactionToEdit.id,
      expect.objectContaining({
        type: "exit",
        description: "Campanha LinkedIn abril",
        amount: 1320,
        category: "Marketing",
        contact: "Media Labs",
        occurredAt: expect.any(String),
      })
    );
    expect(await screen.findByText("Lançamento atualizado com sucesso.")).toBeInTheDocument();
  });

  it("mantém as validações do formulário ao editar", async () => {
    const user = userEvent.setup();
    const updateTransaction = vi.fn(async (id: string, payload: CreateTransactionPayload) =>
      createUpdateResult(id, payload)
    );
    const service = createEditorService({
      updateTransaction,
    });

    renderEditTransactionPage(service);
    await screen.findByDisplayValue("Campanha LinkedIn março");

    await user.clear(screen.getByLabelText("Descrição"));
    await user.click(screen.getByRole("button", { name: /salvar alterações/i }));

    expect(await screen.findByText("Descrição é obrigatória")).toBeInTheDocument();
    expect(updateTransaction).not.toHaveBeenCalled();
  });

  it("renderiza estado de não encontrado quando o id não existe", async () => {
    const service = createEditorService({
      getTransactionById: async () => null,
    });

    render(
      <EditTransactionPage
        transactionId="transaction-inexistente"
        service={service}
        confirmDelete={() => true}
        navigate={vi.fn()}
      />
    );

    expect(await screen.findByRole("heading", { name: "Lançamento não encontrado" })).toBeInTheDocument();
  });

  it("solicita confirmação antes de excluir e retorna para a listagem após sucesso", async () => {
    const user = userEvent.setup();
    const confirmDelete = vi.fn(() => true);
    const navigate = vi.fn();
    const deleteTransaction = vi.fn(async (id: string) => createDeleteResult(id));
    const service = createEditorService({
      deleteTransaction,
    });

    render(
      <EditTransactionPage
        transactionId={transactionToEdit.id}
        service={service}
        confirmDelete={confirmDelete}
        navigate={navigate}
      />
    );

    await screen.findByDisplayValue("Campanha LinkedIn março");
    await user.click(screen.getByRole("button", { name: /excluir/i }));

    await waitFor(() => expect(deleteTransaction).toHaveBeenCalledWith(transactionToEdit.id));
    expect(confirmDelete).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith("/lancamentos");
  });
});
