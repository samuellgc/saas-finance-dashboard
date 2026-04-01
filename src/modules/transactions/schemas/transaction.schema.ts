import { z } from "zod";
import { isTransactionCategoryCompatible } from "@/modules/transactions/utils/transaction-form.utils";

export const transactionSchema = z
  .object({
    type: z.enum(["entry", "exit"], { message: "Selecione o tipo do lançamento" }),
    description: z.string().trim().min(1, "Descrição é obrigatória"),
    amount: z.number().optional(),
    occurredAt: z.date({ message: "Data é obrigatória" }),
    category: z.string().trim().min(1, "Categoria é obrigatória"),
    contact: z.string(),
    notes: z.string(),
  })
  .superRefine((values, context) => {
    if (values.amount === undefined) {
      context.addIssue({
        code: "custom",
        path: ["amount"],
        message: "Valor é obrigatório",
      });
    } else if (values.amount <= 0) {
      context.addIssue({
        code: "custom",
        path: ["amount"],
        message: "Valor deve ser maior que zero",
      });
    }

    if (!isTransactionCategoryCompatible(values.type, values.category)) {
      context.addIssue({
        code: "custom",
        path: ["category"],
        message: "Categoria incompatível com o tipo selecionado",
      });
    }
  });
