import {
  eachMonthOfInterval,
  endOfDay,
  format,
  isWithinInterval,
  parseISO,
  startOfDay,
  startOfMonth,
  subDays,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ALL_CASH_FLOW_FILTER_VALUE,
  cashFlowCategoryAllLabel,
  cashFlowCompactCurrencyFormatter,
  cashFlowContactAllLabel,
  cashFlowCurrencyFormatter,
  cashFlowPeriodDayMap,
  cashFlowPeriodOptions,
  cashFlowTypeOptions,
  cashFlowTypeFilterValues,
} from "@/modules/cash-flow/constants/cash-flow.constants";
import type {
  CashFlowChartPoint,
  CashFlowFilterOptions,
  CashFlowFilters,
  CashFlowOverview,
  CashFlowPeriodKey,
  CashFlowSelectOption,
  CashFlowTypeFilter,
  CashFlowSummary,
  CashFlowTransaction,
} from "@/modules/cash-flow/types/cash-flow.types";

function formatMonthLabel(date: Date) {
  const label = format(date, "MMM/yy", { locale: ptBR }).replace(".", "");
  const firstChar = label.charAt(0).toUpperCase();

  return `${firstChar}${label.slice(1)}`;
}

function buildSelectOptions(values: string[], allLabel: string): CashFlowSelectOption[] {
  return [
    {
      value: ALL_CASH_FLOW_FILTER_VALUE,
      label: allLabel,
    },
    ...values.map(value => ({
      value,
      label: value,
    })),
  ];
}

export function formatCurrency(value: number) {
  return cashFlowCurrencyFormatter.format(value);
}

export function formatCompactCurrency(value: number) {
  return cashFlowCompactCurrencyFormatter.format(value);
}

export function isCashFlowTypeFilter(value: string): value is CashFlowTypeFilter {
  return cashFlowTypeFilterValues.includes(value as CashFlowTypeFilter);
}

export function normalizeCashFlowTypeFilter(value: string): CashFlowTypeFilter {
  return isCashFlowTypeFilter(value) ? value : ALL_CASH_FLOW_FILTER_VALUE;
}

export function getCashFlowBarHeight(value: number, maxValue: number) {
  if (value === 0) {
    return "0%";
  }

  return `${Math.max((value / maxValue) * 100, 10)}%`;
}

export function getCashFlowPeriodInterval(period: CashFlowPeriodKey, referenceDate: Date) {
  const end = endOfDay(referenceDate);
  const start = startOfDay(subDays(referenceDate, cashFlowPeriodDayMap[period]));

  return { start, end };
}

export function filterTransactionsByCashFlowFilters(
  transactions: CashFlowTransaction[],
  filters: CashFlowFilters,
  referenceDate: Date
) {
  const interval = getCashFlowPeriodInterval(filters.period, referenceDate);

  return transactions
    .filter(transaction => isWithinInterval(parseISO(transaction.occurredAt), interval))
    .filter(transaction => (filters.type === ALL_CASH_FLOW_FILTER_VALUE ? true : transaction.type === filters.type))
    .filter(transaction =>
      filters.category === ALL_CASH_FLOW_FILTER_VALUE ? true : transaction.category === filters.category
    )
    .filter(transaction =>
      filters.contact === ALL_CASH_FLOW_FILTER_VALUE ? true : transaction.contact === filters.contact
    );
}

export function buildCashFlowSummary(transactions: CashFlowTransaction[]): CashFlowSummary {
  const summary = transactions.reduce<CashFlowSummary>(
    (accumulator, transaction) => {
      if (transaction.type === "entry") {
        accumulator.totalEntries += transaction.amount;
      } else {
        accumulator.totalExits += transaction.amount;
      }

      accumulator.transactionCount += 1;

      return accumulator;
    },
    {
      totalEntries: 0,
      totalExits: 0,
      accumulatedBalance: 0,
      transactionCount: 0,
    }
  );

  summary.accumulatedBalance = summary.totalEntries - summary.totalExits;

  return summary;
}

export function buildCashFlowSeries(
  transactions: CashFlowTransaction[],
  period: CashFlowPeriodKey,
  referenceDate: Date
) {
  const { start, end } = getCashFlowPeriodInterval(period, referenceDate);
  const months = eachMonthOfInterval({
    start: startOfMonth(start),
    end: startOfMonth(end),
  });

  let accumulatedBalance = 0;

  return months.map<CashFlowChartPoint>(month => {
    const monthKey = format(month, "yyyy-MM");
    const monthTransactions = transactions.filter(transaction => transaction.occurredAt.startsWith(monthKey));
    const monthSummary = buildCashFlowSummary(monthTransactions);
    const net = monthSummary.totalEntries - monthSummary.totalExits;

    accumulatedBalance += net;

    return {
      id: monthKey,
      label: formatMonthLabel(month),
      entries: monthSummary.totalEntries,
      exits: monthSummary.totalExits,
      net,
      accumulatedBalance,
    };
  });
}

export function buildCashFlowFilterOptions(transactions: CashFlowTransaction[]): CashFlowFilterOptions {
  const categories = [...new Set(transactions.map(transaction => transaction.category))].sort((left, right) =>
    left.localeCompare(right)
  );
  const contacts = [...new Set(transactions.map(transaction => transaction.contact))].sort((left, right) =>
    left.localeCompare(right)
  );

  return {
    periodOptions: cashFlowPeriodOptions,
    typeOptions: cashFlowTypeOptions,
    categoryOptions: buildSelectOptions(categories, cashFlowCategoryAllLabel),
    contactOptions: buildSelectOptions(contacts, cashFlowContactAllLabel),
  };
}

export function buildCashFlowOverview(
  transactions: CashFlowTransaction[],
  filters: CashFlowFilters,
  referenceDate: Date
): CashFlowOverview {
  const filteredTransactions = filterTransactionsByCashFlowFilters(transactions, filters, referenceDate);
  const summary = buildCashFlowSummary(filteredTransactions);
  const series = buildCashFlowSeries(filteredTransactions, filters.period, referenceDate);

  return {
    summary,
    chartPoints: series,
    summaryRows: series,
  };
}
