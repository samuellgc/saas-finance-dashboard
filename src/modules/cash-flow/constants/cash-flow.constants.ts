import { ArrowDownRight, ArrowUpRight, Landmark } from "lucide-react";
import type {
  CashFlowFilters,
  CashFlowOverview,
  CashFlowPeriodKey,
  CashFlowPeriodOption,
  CashFlowSelectOption,
  CashFlowSummaryCardConfig,
  CashFlowTypeFilter,
} from "@/modules/cash-flow/types/cash-flow.types";

export const ALL_CASH_FLOW_FILTER_VALUE: CashFlowTypeFilter = "all";

export const cashFlowPeriodOptions: CashFlowPeriodOption[] = [
  {
    value: "30d",
    label: "30 dias",
    description: "Janela curta para leitura operacional.",
  },
  {
    value: "90d",
    label: "90 dias",
    description: "Visão trimestral do caixa.",
  },
  {
    value: "180d",
    label: "6 meses",
    description: "Evolução semestral consolidada.",
  },
  {
    value: "365d",
    label: "12 meses",
    description: "Linha do tempo anual do fluxo.",
  },
];

export const cashFlowTypeFilterValues = [
  ALL_CASH_FLOW_FILTER_VALUE,
  "entry",
  "exit",
] as const satisfies readonly CashFlowTypeFilter[];

export const cashFlowPeriodDayMap: Record<CashFlowPeriodKey, number> = {
  "30d": 29,
  "90d": 89,
  "180d": 179,
  "365d": 364,
};

export const defaultCashFlowFilters: CashFlowFilters = {
  period: "90d",
  type: ALL_CASH_FLOW_FILTER_VALUE,
  category: ALL_CASH_FLOW_FILTER_VALUE,
  contact: ALL_CASH_FLOW_FILTER_VALUE,
};

export const emptyCashFlowOverview: CashFlowOverview = {
  summary: {
    totalEntries: 0,
    totalExits: 0,
    accumulatedBalance: 0,
    transactionCount: 0,
  },
  chartPoints: [],
  summaryRows: [],
};

export const cashFlowCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 2,
});

export const cashFlowCompactCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  maximumFractionDigits: 1,
});

export const cashFlowTypeOptions: CashFlowSelectOption[] = [
  { value: ALL_CASH_FLOW_FILTER_VALUE, label: "Todos os tipos" },
  { value: "entry", label: "Entradas" },
  { value: "exit", label: "Saídas" },
];

export const cashFlowCategoryAllLabel = "Todas as categorias";

export const cashFlowContactAllLabel = "Todos os contatos";

export const cashFlowSummaryCardsConfig: CashFlowSummaryCardConfig[] = [
  {
    key: "totalEntries",
    label: "Total entradas",
    helper: "Volume positivo do período filtrado.",
    toneClassName: "text-primary",
    icon: ArrowUpRight,
  },
  {
    key: "totalExits",
    label: "Total saídas",
    helper: "Volume de saídas consideradas na análise.",
    toneClassName: "text-destructive",
    icon: ArrowDownRight,
  },
  {
    key: "accumulatedBalance",
    label: "Saldo acumulado",
    helper: "Resultado progressivo ao fim da linha do tempo.",
    toneClassName: "text-gray-7",
    icon: Landmark,
  },
];

export const cashFlowChartSkeletonColumnCount = 6;
