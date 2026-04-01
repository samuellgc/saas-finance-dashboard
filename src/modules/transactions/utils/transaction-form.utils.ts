import {
  transactionFormSuccessMessage,
  transactionFormTypeOptions,
} from "@/modules/transactions/constants/transactions.constants";
import {
  transactionFormCategoriesByTypeMock,
  transactionFormContactOptionsMock,
} from "@/modules/transactions/mocks/transaction-form.mock";
import type {
  CreateTransactionPayload,
  CreateTransactionResult,
  TransactionFormOptions,
  TransactionFormValues,
  TransactionRecord,
  TransactionType,
} from "@/modules/transactions/types/transactions.types";

export function getTransactionFormDefaultValues(): TransactionFormValues {
  return {
    type: "entry",
    description: "",
    amount: undefined,
    occurredAt: new Date(),
    category: "",
    contact: "",
    notes: "",
  };
}

export function buildTransactionFormOptions(): TransactionFormOptions {
  return {
    typeOptions: transactionFormTypeOptions,
    categoriesByType: transactionFormCategoriesByTypeMock,
    contactOptions: transactionFormContactOptionsMock,
  };
}

export function getTransactionCategoryOptions(type: TransactionType) {
  return transactionFormCategoriesByTypeMock[type];
}

export function isTransactionCategoryCompatible(type: TransactionType, category: string) {
  if (!category) {
    return false;
  }

  return getTransactionCategoryOptions(type).some(option => option.value === category);
}

export function mapTransactionFormValuesToPayload(values: TransactionFormValues): CreateTransactionPayload {
  return {
    type: values.type,
    description: values.description.trim(),
    amount: values.amount ?? 0,
    occurredAt: values.occurredAt.toISOString(),
    category: values.category,
    contact: values.contact.trim() || undefined,
    notes: values.notes.trim() || undefined,
  };
}

export function buildCreatedTransactionResult(payload: CreateTransactionPayload): CreateTransactionResult {
  const transaction: TransactionRecord = {
    id: `transaction-${crypto.randomUUID()}`,
    type: payload.type,
    description: payload.description,
    amount: payload.amount,
    occurredAt: payload.occurredAt.slice(0, 10),
    category: payload.category,
    contact: payload.contact ?? "",
  };

  return {
    id: transaction.id,
    message: transactionFormSuccessMessage,
    transaction,
  };
}

export function getTransactionFormErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
    return error.message;
  }

  return "Não foi possível salvar o lançamento.";
}
