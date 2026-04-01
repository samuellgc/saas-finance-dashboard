import { TRANSACTIONS_REFERENCE_DATE, transactionsMock } from "@/modules/transactions/mocks/transactions.mock";
import { defaultTransactionsFilters } from "@/modules/transactions/constants/transactions.constants";
import { buildTransactionsListing, filterTransactionsByFilters } from "@/modules/transactions/utils/transactions.utils";

describe("transactions.utils", () => {
  it("combina filtros de período, tipo, categoria, contato e busca", () => {
    const filteredTransactions = filterTransactionsByFilters(
      transactionsMock,
      {
        ...defaultTransactionsFilters,
        type: "exit",
        category: "Marketing",
        contact: "Media Labs",
        query: "podcast",
      },
      TRANSACTIONS_REFERENCE_DATE
    );

    expect(filteredTransactions).toHaveLength(1);
    expect(filteredTransactions[0]?.description).toBe("Patrocínio podcast finanças");
  });

  it("monta a listagem paginada com totais e intervalo corretos", () => {
    const overview = buildTransactionsListing(
      transactionsMock,
      defaultTransactionsFilters,
      TRANSACTIONS_REFERENCE_DATE,
      2
    );

    expect(overview.totalItems).toBe(11);
    expect(overview.filteredItems).toBe(10);
    expect(overview.pagination.currentPage).toBe(2);
    expect(overview.pagination.totalPages).toBe(2);
    expect(overview.pagination.startItem).toBe(6);
    expect(overview.pagination.endItem).toBe(10);
    expect(overview.items).toHaveLength(5);
  });
});
