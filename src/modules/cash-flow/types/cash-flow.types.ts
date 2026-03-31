import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type CashFlowTransactionType = "entry" | "exit";

export type CashFlowPeriodKey = "30d" | "90d" | "180d" | "365d";

export type CashFlowTypeFilter = "all" | CashFlowTransactionType;

export type CashFlowTransaction = {
  id: string;
  description: string;
  category: string;
  contact: string;
  amount: number;
  type: CashFlowTransactionType;
  occurredAt: string;
};

export type CashFlowPeriodOption = {
  value: CashFlowPeriodKey;
  label: string;
  description: string;
};

export type CashFlowSelectOption = {
  value: string;
  label: string;
};

export type CashFlowFilters = {
  period: CashFlowPeriodKey;
  type: CashFlowTypeFilter;
  category: string;
  contact: string;
};

export type CashFlowFilterOptions = {
  periodOptions: CashFlowPeriodOption[];
  typeOptions: CashFlowSelectOption[];
  categoryOptions: CashFlowSelectOption[];
  contactOptions: CashFlowSelectOption[];
};

export type CashFlowSummary = {
  totalEntries: number;
  totalExits: number;
  accumulatedBalance: number;
  transactionCount: number;
};

export type CashFlowChartPoint = {
  id: string;
  label: string;
  entries: number;
  exits: number;
  net: number;
  accumulatedBalance: number;
};

export type CashFlowSummaryRow = CashFlowChartPoint;

export type CashFlowOverview = {
  summary: CashFlowSummary;
  chartPoints: CashFlowChartPoint[];
  summaryRows: CashFlowSummaryRow[];
};

export type CashFlowService = {
  getFilterOptions: () => CashFlowFilterOptions;
  getOverview: (filters: CashFlowFilters) => Promise<CashFlowOverview>;
};

export type CashFlowSummaryCardKey = keyof Pick<CashFlowSummary, "totalEntries" | "totalExits" | "accumulatedBalance">;

export type CashFlowSummaryCardConfig = {
  key: CashFlowSummaryCardKey;
  label: string;
  helper: string;
  toneClassName: string;
  icon: LucideIcon;
};

export type CashFlowPageProps = {
  service?: CashFlowService;
};

export type CashFlowSectionProps = {
  headingId: string;
  title: string;
  description: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  cardClassName?: string;
};

export type CashFlowEmptyStateProps = {
  periodLabel: string;
};

export type CashFlowSelectFieldProps = {
  id: string;
  label: string;
  value: string;
  options: CashFlowSelectOption[];
  disabled?: boolean;
  onChange: (value: string) => void;
};

export type CashFlowFiltersProps = {
  filters: CashFlowFilters;
  options: CashFlowFilterOptions;
  disabled?: boolean;
  onPeriodChange: (period: CashFlowPeriodKey) => void;
  onTypeChange: (type: CashFlowTypeFilter) => void;
  onCategoryChange: (category: string) => void;
  onContactChange: (contact: string) => void;
};

export type CashFlowChartProps = {
  points: CashFlowChartPoint[];
  periodLabel: string;
  isLoading?: boolean;
};

export type CashFlowSummaryCardsProps = {
  summary: CashFlowSummary;
  isLoading?: boolean;
};

export type CashFlowSummaryTableProps = {
  rows: CashFlowSummaryRow[];
  isLoading?: boolean;
};

export type CreateCashFlowServiceOptions = {
  transactions?: CashFlowTransaction[];
  referenceDate?: Date;
  delayMs?: number;
};

export type UseCashFlowOverviewOptions = {
  initialFilters?: CashFlowFilters;
  service?: CashFlowService;
};

export type UseCashFlowOverviewResult = {
  filterOptions: CashFlowFilterOptions;
  filters: CashFlowFilters;
  isLoading: boolean;
  overview: CashFlowOverview;
  periodLabel: string;
  hasTransactions: boolean;
  setPeriodFilter: (period: CashFlowPeriodKey) => void;
  setTypeFilter: (type: CashFlowTypeFilter) => void;
  setCategoryFilter: (category: string) => void;
  setContactFilter: (contact: string) => void;
};
