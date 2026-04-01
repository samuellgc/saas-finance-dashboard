import { delay } from "@/shared/utils/async";
import {
  buildDeletedTransactionResult,
  buildTransactionFormOptions,
  buildUpdatedTransactionResult,
} from "@/modules/transactions/utils/transaction-form.utils";
import { transactionsMock } from "@/modules/transactions/mocks/transactions.mock";
import type {
  CreateTransactionEditorServiceOptions,
  TransactionEditorService,
} from "@/modules/transactions/types/transactions.types";

export function createTransactionEditorService({
  transactions = transactionsMock,
  delayMs = 180,
}: CreateTransactionEditorServiceOptions = {}): TransactionEditorService {
  return {
    getFormOptions() {
      return buildTransactionFormOptions();
    },
    async getTransactionById(id) {
      await delay(delayMs);

      return transactions.find(transaction => transaction.id === id) ?? null;
    },
    async updateTransaction(id, payload) {
      await delay(delayMs);

      const currentTransaction = transactions.find(transaction => transaction.id === id);

      if (!currentTransaction) {
        throw new Error("Lançamento não encontrado.");
      }

      return buildUpdatedTransactionResult(id, payload);
    },
    async deleteTransaction(id) {
      await delay(delayMs);

      const currentTransaction = transactions.find(transaction => transaction.id === id);

      if (!currentTransaction) {
        throw new Error("Lançamento não encontrado.");
      }

      return buildDeletedTransactionResult(id);
    },
  };
}

export const transactionEditorService = createTransactionEditorService();
