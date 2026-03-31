import { CASH_FLOW_REFERENCE_DATE, cashFlowTransactionsMock } from "@/modules/cash-flow/mocks/cash-flow.mock";
import { defaultCashFlowFilters } from "@/modules/cash-flow/constants/cash-flow.constants";
import { buildCashFlowOverview, filterTransactionsByCashFlowFilters } from "@/modules/cash-flow/utils/cash-flow.utils";

describe("cash-flow.utils", () => {
  it("calcula o saldo acumulado de forma progressiva e cronológica", () => {
    const overview = buildCashFlowOverview(cashFlowTransactionsMock, defaultCashFlowFilters, CASH_FLOW_REFERENCE_DATE);

    expect(overview.summary.totalEntries).toBe(39800);
    expect(overview.summary.totalExits).toBe(10290);
    expect(overview.summary.accumulatedBalance).toBe(29510);
    expect(overview.summaryRows.map(row => row.accumulatedBalance)).toEqual([7360, 17960, 29510]);
  });

  it("respeita os filtros por tipo, categoria e contato", () => {
    const filteredTransactions = filterTransactionsByCashFlowFilters(
      cashFlowTransactionsMock,
      {
        ...defaultCashFlowFilters,
        type: "exit",
        category: "Marketing",
        contact: "Media Labs",
      },
      CASH_FLOW_REFERENCE_DATE
    );

    expect(filteredTransactions).toHaveLength(2);
    expect(filteredTransactions.every(transaction => transaction.type === "exit")).toBe(true);
    expect(filteredTransactions.every(transaction => transaction.category === "Marketing")).toBe(true);
    expect(filteredTransactions.every(transaction => transaction.contact === "Media Labs")).toBe(true);
  });
});
