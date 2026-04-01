import { endOfDay, format, isWithinInterval, parseISO, startOfDay, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ALL_TRANSACTIONS_FILTER_VALUE,
  transactionsCategoryAllLabel,
  transactionsContactAllLabel,
  transactionsCurrencyFormatter,
  transactionsPageSize,
  transactionsPeriodDayMap,
  transactionsPeriodOptions,
  transactionsTypeFilterValues,
  transactionsTypeOptions,
} from "@/modules/transactions/constants/transactions.constants";
import type {
  TransactionRecord,
  TransactionsEmptyStateVariant,
  TransactionsFilterOptions,
  TransactionsFilters,
  TransactionsOverview,
  TransactionsPaginationMeta,
  TransactionsPeriodKey,
  TransactionsSelectOption,
  TransactionsTypeFilter,
} from "@/modules/transactions/types/transactions.types";

function normalizeQuery(query: string) {
  return query.trim().toLocaleLowerCase("pt-BR");
}

function buildSelectOptions(values: string[], allLabel: string): TransactionsSelectOption[] {
  return [
    {
      value: ALL_TRANSACTIONS_FILTER_VALUE,
      label: allLabel,
    },
    ...values.map(value => ({
      value,
      label: value,
    })),
  ];
}

export function formatTransactionsCurrency(value: number) {
  return transactionsCurrencyFormatter.format(value);
}

export function formatTransactionsDate(date: string) {
  return format(parseISO(date), "dd/MM/yyyy", { locale: ptBR });
}

export function getTransactionsCountLabel(totalItems: number, filteredItems: number) {
  if (filteredItems === totalItems) {
    return `${filteredItems} lançamentos visíveis`;
  }

  return `${filteredItems} de ${totalItems} lançamentos visíveis`;
}

export function getTransactionsPaginationPages(totalPages: number) {
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

export function getTransactionsEmptyStateCopy(
  variant: TransactionsEmptyStateVariant,
  periodLabel: string,
  query: string
) {
  if (variant === "empty") {
    return {
      title: "Nenhum lançamento cadastrado",
      description: `Ainda não existem lançamentos registrados para ${periodLabel.toLowerCase()}. A listagem e a ação de novo lançamento já estão preparadas para as próximas etapas.`,
    };
  }

  if (query.trim().length > 0) {
    return {
      title: "Nenhum lançamento encontrado",
      description: `A busca por "${query}" não retornou resultados em ${periodLabel.toLowerCase()} com os filtros atuais.`,
    };
  }

  return {
    title: "Nenhum lançamento encontrado",
    description: `Os filtros atuais não retornaram registros em ${periodLabel.toLowerCase()}. Ajuste período, tipo, categoria ou contato para continuar a análise.`,
  };
}

export function isTransactionsTypeFilter(value: string): value is TransactionsTypeFilter {
  return transactionsTypeFilterValues.includes(value as TransactionsTypeFilter);
}

export function normalizeTransactionsTypeFilter(value: string): TransactionsTypeFilter {
  return isTransactionsTypeFilter(value) ? value : ALL_TRANSACTIONS_FILTER_VALUE;
}

export function getTransactionsPeriodInterval(period: TransactionsPeriodKey, referenceDate: Date) {
  const end = endOfDay(referenceDate);
  const start = startOfDay(subDays(referenceDate, transactionsPeriodDayMap[period]));

  return { start, end };
}

export function filterTransactionsByFilters(
  transactions: TransactionRecord[],
  filters: TransactionsFilters,
  referenceDate: Date
) {
  const interval = getTransactionsPeriodInterval(filters.period, referenceDate);
  const normalizedQuery = normalizeQuery(filters.query);

  return transactions
    .filter(transaction => isWithinInterval(parseISO(transaction.occurredAt), interval))
    .filter(transaction => (filters.type === ALL_TRANSACTIONS_FILTER_VALUE ? true : transaction.type === filters.type))
    .filter(transaction =>
      filters.category === ALL_TRANSACTIONS_FILTER_VALUE ? true : transaction.category === filters.category
    )
    .filter(transaction =>
      filters.contact === ALL_TRANSACTIONS_FILTER_VALUE ? true : transaction.contact === filters.contact
    )
    .filter(transaction =>
      normalizedQuery.length === 0 ? true : transaction.description.toLocaleLowerCase("pt-BR").includes(normalizedQuery)
    )
    .sort((left, right) => right.occurredAt.localeCompare(left.occurredAt));
}

export function buildTransactionsFilterOptions(transactions: TransactionRecord[]): TransactionsFilterOptions {
  const categories = [...new Set(transactions.map(transaction => transaction.category))].sort((left, right) =>
    left.localeCompare(right)
  );
  const contacts = [...new Set(transactions.map(transaction => transaction.contact))].sort((left, right) =>
    left.localeCompare(right)
  );

  return {
    periodOptions: transactionsPeriodOptions,
    typeOptions: transactionsTypeOptions,
    categoryOptions: buildSelectOptions(categories, transactionsCategoryAllLabel),
    contactOptions: buildSelectOptions(contacts, transactionsContactAllLabel),
  };
}

export function buildTransactionsPagination(
  totalItems: number,
  currentPage: number,
  pageSize: number = transactionsPageSize
): TransactionsPaginationMeta {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const startItem = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endItem = totalItems === 0 ? 0 : Math.min(safePage * pageSize, totalItems);

  return {
    currentPage: safePage,
    pageSize,
    totalPages,
    totalItems,
    startItem,
    endItem,
    hasPreviousPage: safePage > 1,
    hasNextPage: safePage < totalPages,
  };
}

export function buildTransactionsListing(
  transactions: TransactionRecord[],
  filters: TransactionsFilters,
  referenceDate: Date,
  page: number,
  pageSize: number = transactionsPageSize
): TransactionsOverview {
  const filteredTransactions = filterTransactionsByFilters(transactions, filters, referenceDate);
  const pagination = buildTransactionsPagination(filteredTransactions.length, page, pageSize);
  const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
  const items = filteredTransactions.slice(startIndex, startIndex + pagination.pageSize);

  return {
    items,
    totalItems: transactions.length,
    filteredItems: filteredTransactions.length,
    pagination,
  };
}
