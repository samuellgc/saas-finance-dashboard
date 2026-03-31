import { CASH_FLOW_REFERENCE_DATE, cashFlowTransactionsMock } from "@/modules/cash-flow/mocks/cash-flow.mock";
import type {
  CreateCashFlowServiceOptions,
  CashFlowFilters,
  CashFlowService,
} from "@/modules/cash-flow/types/cash-flow.types";
import { buildCashFlowFilterOptions, buildCashFlowOverview } from "@/modules/cash-flow/utils/cash-flow.utils";

function wait(delayMs: number) {
  if (delayMs <= 0) {
    return Promise.resolve();
  }

  return new Promise(resolve => {
    setTimeout(resolve, delayMs);
  });
}

export function createCashFlowService({
  transactions = cashFlowTransactionsMock,
  referenceDate = CASH_FLOW_REFERENCE_DATE,
  delayMs = 180,
}: CreateCashFlowServiceOptions = {}): CashFlowService {
  return {
    getFilterOptions() {
      return buildCashFlowFilterOptions(transactions);
    },
    async getOverview(filters: CashFlowFilters) {
      await wait(delayMs);

      return buildCashFlowOverview(transactions, filters, referenceDate);
    },
  };
}

export const cashFlowService = createCashFlowService();
