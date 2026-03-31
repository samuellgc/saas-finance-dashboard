"use client";

import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";
import { LayoutDashboard } from "lucide-react";
import { DashboardCashFlowChart } from "@/modules/dashboard/components/dashboard-cash-flow-chart";
import { DashboardCategorySummary } from "@/modules/dashboard/components/dashboard-category-summary";
import { DashboardEmptyState } from "@/modules/dashboard/components/dashboard-empty-state";
import { DashboardPeriodFilter } from "@/modules/dashboard/components/dashboard-period-filter";
import { DashboardRecentTransactions } from "@/modules/dashboard/components/dashboard-recent-transactions";
import { DashboardSummaryCards } from "@/modules/dashboard/components/dashboard-summary-cards";
import { useDashboardOverview } from "@/modules/dashboard/hooks/use-dashboard-overview";
import { dashboardService } from "@/modules/dashboard/services/dashboard.service";
import type { DashboardService } from "@/modules/dashboard/types/dashboard.types";

type DashboardPageProps = {
  service?: DashboardService;
};

export function DashboardPage({ service = dashboardService }: DashboardPageProps) {
  const { isLoading, overview, periodOptions, selectedPeriod, setSelectedPeriod } = useDashboardOverview({
    service,
  });

  const selectedPeriodOption = periodOptions.find(option => option.value === selectedPeriod) ?? periodOptions[0];
  const hasTransactions = overview.summary.transactionCount > 0;

  return (
    <Stack gap="6">
      <Stack
        as="header"
        gap="4"
        className="xl:flex-row xl:items-end xl:justify-between"
      >
        <Stack gap="3">
          <Box className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary light:border-black/10 light:bg-white">
            <LayoutDashboard
              className="size-4"
              aria-hidden="true"
            />
            Resumo financeiro
          </Box>

          <Stack gap="2">
            <Box
              as="h2"
              className="text-2xl font-bold tracking-tight text-gray-7 sm:text-3xl"
            >
              Painel
            </Box>
            <Typography className="max-w-3xl font-normal leading-6 text-gray-6 sm:text-base">
              Acompanhe entradas, saídas, saldo consolidado e as movimentações mais recentes do período selecionado.
            </Typography>
          </Stack>
        </Stack>

        <DashboardPeriodFilter
          options={periodOptions}
          selectedPeriod={selectedPeriod}
          onChange={setSelectedPeriod}
          disabled={isLoading}
        />
      </Stack>

      {!isLoading && !hasTransactions ? (
        <DashboardEmptyState periodLabel={selectedPeriodOption.label} />
      ) : (
        <>
          <DashboardSummaryCards
            summary={overview.summary}
            isLoading={isLoading}
          />

          <DashboardCashFlowChart
            points={overview.cashFlowChart}
            periodLabel={selectedPeriodOption.label}
            isLoading={isLoading}
          />

          <DashboardCategorySummary
            items={overview.categorySummary}
            isLoading={isLoading}
          />

          <DashboardRecentTransactions
            transactions={overview.recentTransactions}
            isLoading={isLoading}
          />
        </>
      )}
    </Stack>
  );
}
