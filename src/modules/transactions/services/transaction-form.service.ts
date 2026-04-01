import { delay } from "@/shared/utils/async";
import type {
  CreateTransactionFormServiceOptions,
  TransactionFormService,
} from "@/modules/transactions/types/transactions.types";
import {
  buildCreatedTransactionResult,
  buildTransactionFormOptions,
} from "@/modules/transactions/utils/transaction-form.utils";

export function createTransactionFormService({
  delayMs = 180,
}: CreateTransactionFormServiceOptions = {}): TransactionFormService {
  return {
    getFormOptions() {
      return buildTransactionFormOptions();
    },
    async createTransaction(payload) {
      await delay(delayMs);

      return buildCreatedTransactionResult(payload);
    },
  };
}

export const transactionFormService = createTransactionFormService();
