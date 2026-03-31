export type DashboardTransactionType = "entry" | "exit";

export type DashboardPeriodKey = "30d" | "90d" | "180d" | "365d";

export type DashboardTransaction = {
  id: string;
  description: string;
  category: string;
  contact: string;
  amount: number;
  type: DashboardTransactionType;
  occurredAt: string;
};

export type DashboardPeriodOption = {
  value: DashboardPeriodKey;
  label: string;
  description: string;
};

export type DashboardSummary = {
  totalEntries: number;
  totalExits: number;
  balance: number;
  transactionCount: number;
};

export type DashboardChartPoint = {
  label: string;
  entries: number;
  exits: number;
};

export type DashboardCategorySummaryItem = {
  id: string;
  category: string;
  type: DashboardTransactionType;
  amount: number;
  share: number;
  transactionCount: number;
};

export type DashboardOverview = {
  summary: DashboardSummary;
  cashFlowChart: DashboardChartPoint[];
  categorySummary: DashboardCategorySummaryItem[];
  recentTransactions: DashboardTransaction[];
};

export type DashboardService = {
  getOverview: (period: DashboardPeriodKey) => Promise<DashboardOverview>;
};
