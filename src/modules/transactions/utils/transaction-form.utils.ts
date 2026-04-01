import {
  transactionDeleteSuccessMessage,
  transactionFormSuccessMessage,
  transactionFormTypeOptions,
  transactionUpdateSuccessMessage,
} from "@/modules/transactions/constants/transactions.constants";
import {
  transactionFormCategoriesByTypeMock,
  transactionFormContactOptionsMock,
} from "@/modules/transactions/mocks/transaction-form.mock";
import type {
  CreateTransactionPayload,
  CreateTransactionResult,
  DeleteTransactionResult,
  TransactionFormOptions,
  TransactionFormValues,
  TransactionRecord,
  TransactionType,
  UpdateTransactionResult,
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

export function mapTransactionRecordToFormValues(record: TransactionRecord): TransactionFormValues {
  return {
    type: record.type,
    description: record.description,
    amount: record.amount,
    occurredAt: new Date(`${record.occurredAt}T12:00:00.000Z`),
    category: record.category,
    contact: record.contact,
    notes: "",
  };
}

function mapTransactionPayloadToRecord(id: string, payload: CreateTransactionPayload): TransactionRecord {
  return {
    id,
    type: payload.type,
    description: payload.description,
    amount: payload.amount,
    occurredAt: payload.occurredAt.slice(0, 10),
    category: payload.category,
    contact: payload.contact ?? "",
  };
}

export function buildCreatedTransactionResult(payload: CreateTransactionPayload): CreateTransactionResult {
  const transaction = mapTransactionPayloadToRecord(`transaction-${crypto.randomUUID()}`, payload);

  return {
    id: transaction.id,
    message: transactionFormSuccessMessage,
    transaction,
  };
}

export function buildUpdatedTransactionResult(id: string, payload: CreateTransactionPayload): UpdateTransactionResult {
  const transaction = mapTransactionPayloadToRecord(id, payload);

  return {
    id,
    message: transactionUpdateSuccessMessage,
    transaction,
  };
}

export function buildDeletedTransactionResult(id: string): DeleteTransactionResult {
  return {
    id,
    message: transactionDeleteSuccessMessage,
  };
}

export function getTransactionFormErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
    return error.message;
  }

  return "Não foi possível salvar o lançamento.";
}
