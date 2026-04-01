import { transactionSchema } from "@/modules/transactions/schemas/transaction.schema";

const validTransactionValues = {
  type: "entry" as const,
  description: "Recebimento consultoria",
  amount: 1250,
  occurredAt: new Date("2026-04-01T12:00:00.000Z"),
  category: "Serviços",
  contact: "",
  notes: "",
};

describe("transaction.schema", () => {
  it("aceita um lançamento válido", () => {
    const result = transactionSchema.safeParse(validTransactionValues);

    expect(result.success).toBe(true);
  });

  it("rejeita valor menor ou igual a zero", () => {
    const result = transactionSchema.safeParse({
      ...validTransactionValues,
      amount: 0,
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.amount).toContain("Valor deve ser maior que zero");
  });

  it("rejeita categoria incompatível com o tipo selecionado", () => {
    const result = transactionSchema.safeParse({
      ...validTransactionValues,
      category: "Marketing",
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.category).toContain("Categoria incompatível com o tipo selecionado");
  });
});
