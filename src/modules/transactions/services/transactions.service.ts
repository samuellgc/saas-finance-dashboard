import { TRANSACTIONS_REFERENCE_DATE, transactionsMock } from "@/modules/transactions/mocks/transactions.mock";
import type {
  CreateTransactionsServiceOptions,
  TransactionsFilters,
  TransactionsService,
} from "@/modules/transactions/types/transactions.types";
import {
  buildTransactionsFilterOptions,
  buildTransactionsListing,
} from "@/modules/transactions/utils/transactions.utils";
import { delay } from "@/shared/utils/async";

export function createTransactionsService({
  transactions = transactionsMock,
  referenceDate = TRANSACTIONS_REFERENCE_DATE,
  delayMs = 180,
}: CreateTransactionsServiceOptions = {}): TransactionsService {
  return {
    getFilterOptions() {
      return buildTransactionsFilterOptions(transactions);
    },
    async getListing(filters: TransactionsFilters, page: number) {
      await delay(delayMs);

      return buildTransactionsListing(transactions, filters, referenceDate, page);
    },
    getTotalTransactions() {
      return transactions.length;
    },
  };
}

export const transactionsService = createTransactionsService();
