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
import type {
  DashboardCategorySummaryItem,
  DashboardChartPoint,
  DashboardOverview,
  DashboardPeriodKey,
  DashboardSummary,
  DashboardTransaction,
  DashboardTransactionType,
} from "@/modules/dashboard/types/dashboard.types";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 2,
});

const compactCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  maximumFractionDigits: 1,
});

const dashboardPeriodDayMap: Record<DashboardPeriodKey, number> = {
  "30d": 29,
  "90d": 89,
  "180d": 179,
  "365d": 364,
};

export const emptyDashboardOverview: DashboardOverview = {
  summary: {
    totalEntries: 0,
    totalExits: 0,
    balance: 0,
    transactionCount: 0,
  },
  cashFlowChart: [],
  categorySummary: [],
  recentTransactions: [],
};

function formatMonthLabel(date: Date) {
  const label = format(date, "MMM", { locale: ptBR }).replace(".", "");

  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function formatCompactCurrency(value: number) {
  return compactCurrencyFormatter.format(value);
}

export function formatSignedCurrency(value: number, type: DashboardTransactionType) {
  const signal = type === "entry" ? "+" : "-";

  return `${signal}${formatCurrency(value)}`;
}

export function formatTransactionDate(value: string) {
  return format(parseISO(value), "dd 'de' MMM", { locale: ptBR }).replace(".", "");
}

export function getDashboardPeriodInterval(period: DashboardPeriodKey, referenceDate: Date) {
  const end = endOfDay(referenceDate);
  const start = startOfDay(subDays(referenceDate, dashboardPeriodDayMap[period]));

  return { start, end };
}

export function filterTransactionsByPeriod(
  transactions: DashboardTransaction[],
  period: DashboardPeriodKey,
  referenceDate: Date
) {
  const interval = getDashboardPeriodInterval(period, referenceDate);

  return transactions.filter(transaction => isWithinInterval(parseISO(transaction.occurredAt), interval));
}

export function buildDashboardSummary(transactions: DashboardTransaction[]): DashboardSummary {
  const summary = transactions.reduce<DashboardSummary>(
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
      balance: 0,
      transactionCount: 0,
    }
  );

  summary.balance = summary.totalEntries - summary.totalExits;

  return summary;
}

export function buildDashboardCashFlowChart(
  transactions: DashboardTransaction[],
  period: DashboardPeriodKey,
  referenceDate: Date
) {
  const { start, end } = getDashboardPeriodInterval(period, referenceDate);
  const months = eachMonthOfInterval({
    start: startOfMonth(start),
    end: startOfMonth(end),
  });

  return months.map<DashboardChartPoint>(month => {
    const monthKey = format(month, "yyyy-MM");
    const monthlyTransactions = transactions.filter(transaction => transaction.occurredAt.startsWith(monthKey));

    const monthlySummary = buildDashboardSummary(monthlyTransactions);

    return {
      label: formatMonthLabel(month),
      entries: monthlySummary.totalEntries,
      exits: monthlySummary.totalExits,
    };
  });
}

export function buildDashboardCategorySummary(transactions: DashboardTransaction[]) {
  const totalVolume = transactions.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
  const summaryMap = new Map<string, Omit<DashboardCategorySummaryItem, "share">>();

  for (const transaction of transactions) {
    const key = `${transaction.type}-${transaction.category}`;
    const currentItem = summaryMap.get(key);

    if (currentItem) {
      currentItem.amount += transaction.amount;
      currentItem.transactionCount += 1;
      continue;
    }

    summaryMap.set(key, {
      id: key,
      category: transaction.category,
      type: transaction.type,
      amount: transaction.amount,
      transactionCount: 1,
    });
  }

  return Array.from(summaryMap.values())
    .map<DashboardCategorySummaryItem>(item => ({
      ...item,
      share: totalVolume === 0 ? 0 : (item.amount / totalVolume) * 100,
    }))
    .sort((left, right) => right.amount - left.amount);
}

export function buildDashboardRecentTransactions(transactions: DashboardTransaction[]) {
  return [...transactions].sort((left, right) => right.occurredAt.localeCompare(left.occurredAt)).slice(0, 5);
}

export function buildDashboardOverview(
  transactions: DashboardTransaction[],
  period: DashboardPeriodKey,
  referenceDate: Date
) {
  const filteredTransactions = filterTransactionsByPeriod(transactions, period, referenceDate);

  return {
    summary: buildDashboardSummary(filteredTransactions),
    cashFlowChart: buildDashboardCashFlowChart(filteredTransactions, period, referenceDate),
    categorySummary: buildDashboardCategorySummary(filteredTransactions),
    recentTransactions: buildDashboardRecentTransactions(filteredTransactions),
  } satisfies DashboardOverview;
}
