import type { ReactNode } from "react";

export type TransactionType = "entry" | "exit";

export type TransactionsPeriodKey = "30d" | "90d" | "180d" | "365d";

export type TransactionsTypeFilter = "all" | TransactionType;

export type TransactionRecord = {
  id: string;
  description: string;
  category: string;
  contact: string;
  amount: number;
  type: TransactionType;
  occurredAt: string;
};

export type TransactionsPeriodOption = {
  value: TransactionsPeriodKey;
  label: string;
  description: string;
};

export type TransactionsSelectOption = {
  value: string;
  label: string;
};

export type TransactionsFilters = {
  period: TransactionsPeriodKey;
  type: TransactionsTypeFilter;
  category: string;
  contact: string;
  query: string;
};

export type TransactionsFilterOptions = {
  periodOptions: TransactionsPeriodOption[];
  typeOptions: TransactionsSelectOption[];
  categoryOptions: TransactionsSelectOption[];
  contactOptions: TransactionsSelectOption[];
};

export type TransactionsPaginationMeta = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  startItem: number;
  endItem: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type TransactionsOverview = {
  items: TransactionRecord[];
  totalItems: number;
  filteredItems: number;
  pagination: TransactionsPaginationMeta;
};

export type TransactionsEmptyStateVariant = "empty" | "no-results";

export type TransactionsService = {
  getFilterOptions: () => TransactionsFilterOptions;
  getListing: (filters: TransactionsFilters, page: number) => Promise<TransactionsOverview>;
  getTotalTransactions: () => number;
};

export type TransactionsPageProps = {
  service?: TransactionsService;
};

export type TransactionsSectionProps = {
  headingId: string;
  title: string;
  description: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  cardClassName?: string;
};

export type TransactionsToolbarProps = {
  totalItems: number;
  filteredItems: number;
  periodLabel: string;
  isLoading?: boolean;
};

export type TransactionsSelectFieldProps = {
  id: string;
  label: string;
  value: string;
  options: TransactionsSelectOption[];
  disabled?: boolean;
  onChange: (value: string) => void;
};

export type TransactionsFiltersProps = {
  filters: TransactionsFilters;
  options: TransactionsFilterOptions;
  disabled?: boolean;
  onPeriodChange: (period: TransactionsPeriodKey) => void;
  onTypeChange: (type: TransactionsTypeFilter) => void;
  onCategoryChange: (category: string) => void;
  onContactChange: (contact: string) => void;
  onQueryChange: (query: string) => void;
};

export type TransactionTypeBadgeProps = {
  type: TransactionType;
};

export type TransactionsTableProps = {
  items: TransactionRecord[];
  isLoading?: boolean;
};

export type TransactionsPaginationProps = {
  pagination: TransactionsPaginationMeta;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
};

export type TransactionsEmptyStateProps = {
  variant: TransactionsEmptyStateVariant;
  periodLabel: string;
  query: string;
};

export type CreateTransactionsServiceOptions = {
  transactions?: TransactionRecord[];
  referenceDate?: Date;
  delayMs?: number;
};

export type UseTransactionsListingOptions = {
  initialFilters?: TransactionsFilters;
  initialPage?: number;
  service?: TransactionsService;
};

export type UseTransactionsListingResult = {
  filterOptions: TransactionsFilterOptions;
  filters: TransactionsFilters;
  isLoading: boolean;
  overview: TransactionsOverview;
  periodLabel: string;
  hasAnyTransactions: boolean;
  hasVisibleResults: boolean;
  setPage: (page: number) => void;
  setPeriodFilter: (period: TransactionsPeriodKey) => void;
  setTypeFilter: (type: TransactionsTypeFilter) => void;
  setCategoryFilter: (category: string) => void;
  setContactFilter: (contact: string) => void;
  setQueryFilter: (query: string) => void;
};
