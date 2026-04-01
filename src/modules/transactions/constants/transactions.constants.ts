import type {
  TransactionType,
  TransactionsFilters,
  TransactionsOverview,
  TransactionsPeriodKey,
  TransactionsPeriodOption,
  TransactionsSelectOption,
  TransactionsTypeFilter,
} from "@/modules/transactions/types/transactions.types";

export const ALL_TRANSACTIONS_FILTER_VALUE: TransactionsTypeFilter = "all";

export const transactionsPageSize = 5;

export const transactionsPeriodOptions: TransactionsPeriodOption[] = [
  {
    value: "30d",
    label: "30 dias",
    description: "Recorte curto para operação recente.",
  },
  {
    value: "90d",
    label: "90 dias",
    description: "Leitura trimestral dos lançamentos.",
  },
  {
    value: "180d",
    label: "6 meses",
    description: "Histórico semestral para conferência.",
  },
  {
    value: "365d",
    label: "12 meses",
    description: "Linha do tempo anual consolidada.",
  },
];

export const transactionsTypeFilterValues = [
  ALL_TRANSACTIONS_FILTER_VALUE,
  "entry",
  "exit",
] as const satisfies readonly TransactionsTypeFilter[];

export const transactionsTypeOptions: TransactionsSelectOption[] = [
  { value: ALL_TRANSACTIONS_FILTER_VALUE, label: "Todos os tipos" },
  { value: "entry", label: "Entradas" },
  { value: "exit", label: "Saídas" },
];

export const transactionFormTypeOptions: TransactionsSelectOption[] = [
  { value: "entry", label: "Entrada" },
  { value: "exit", label: "Saída" },
];

export const transactionsPeriodDayMap: Record<TransactionsPeriodKey, number> = {
  "30d": 29,
  "90d": 89,
  "180d": 179,
  "365d": 364,
};

export const defaultTransactionsFilters: TransactionsFilters = {
  period: "90d",
  type: ALL_TRANSACTIONS_FILTER_VALUE,
  category: ALL_TRANSACTIONS_FILTER_VALUE,
  contact: ALL_TRANSACTIONS_FILTER_VALUE,
  query: "",
};

export const emptyTransactionsOverview: TransactionsOverview = {
  items: [],
  totalItems: 0,
  filteredItems: 0,
  pagination: {
    currentPage: 1,
    pageSize: transactionsPageSize,
    totalPages: 1,
    totalItems: 0,
    startItem: 0,
    endItem: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};

export const transactionsCategoryAllLabel = "Todas as categorias";

export const transactionsContactAllLabel = "Todos os contatos";

export const transactionsCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 2,
});

export const transactionTypeBadgeCopy: Record<TransactionType, { label: string; className: string }> = {
  entry: {
    label: "Entrada",
    className: "border-primary/20 bg-primary/10 text-primary",
  },
  exit: {
    label: "Saída",
    className: "border-destructive/20 bg-destructive/10 text-destructive",
  },
};

export const transactionFormSuccessMessage = "Lançamento validado e pronto para persistência.";
