"use client";

import { TrendingUpDown, WalletCards } from "lucide-react";
import { CashFlowChart } from "@/modules/cash-flow/components/cash-flow-chart";
import { CashFlowEmptyState } from "@/modules/cash-flow/components/cash-flow-empty-state";
import { CashFlowFilters } from "@/modules/cash-flow/components/cash-flow-filters";
import { CashFlowSummaryCards } from "@/modules/cash-flow/components/cash-flow-summary-cards";
import { CashFlowSummaryTable } from "@/modules/cash-flow/components/cash-flow-summary-table";
import { useCashFlowOverview } from "@/modules/cash-flow/hooks/use-cash-flow-overview";
import { cashFlowService } from "@/modules/cash-flow/services/cash-flow.service";
import type { CashFlowPageProps } from "@/modules/cash-flow/types/cash-flow.types";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";

export function CashFlowPage({ service = cashFlowService }: CashFlowPageProps) {
  const {
    filterOptions,
    filters,
    hasTransactions,
    isLoading,
    overview,
    periodLabel,
    setCategoryFilter,
    setContactFilter,
    setPeriodFilter,
    setTypeFilter,
  } = useCashFlowOverview({
    service,
  });

  return (
    <Stack gap="6">
      <Stack
        as="header"
        gap="4"
        className="xl:flex-row xl:items-end xl:justify-between"
      >
        <Stack gap="3">
          <Box className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary light:border-black/10 light:bg-white">
            <WalletCards
              className="size-4"
              aria-hidden="true"
            />
            Evolução financeira
          </Box>

          <Stack gap="2">
            <Box
              as="h2"
              className="text-2xl font-bold tracking-tight text-gray-7 sm:text-3xl"
            >
              Fluxo de Caixa
            </Box>
            <Typography className="max-w-3xl font-normal leading-6 text-gray-6 sm:text-base">
              Acompanhe a evolução do caixa ao longo do tempo com filtros por período, tipo, categoria e contato.
            </Typography>
          </Stack>
        </Stack>

        <Box className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-2 text-sm font-medium text-gray-6 light:border-black/10 light:bg-black/3">
          <TrendingUpDown
            className="size-4 text-primary"
            aria-hidden="true"
          />
          Visão ativa: {periodLabel}
        </Box>
      </Stack>

      <CashFlowFilters
        filters={filters}
        options={filterOptions}
        disabled={isLoading}
        onPeriodChange={setPeriodFilter}
        onTypeChange={setTypeFilter}
        onCategoryChange={setCategoryFilter}
        onContactChange={setContactFilter}
      />

      {!isLoading && !hasTransactions ? (
        <CashFlowEmptyState periodLabel={periodLabel} />
      ) : (
        <>
          <CashFlowSummaryCards
            summary={overview.summary}
            isLoading={isLoading}
          />

          <CashFlowChart
            points={overview.chartPoints}
            periodLabel={periodLabel}
            isLoading={isLoading}
          />

          <CashFlowSummaryTable
            rows={overview.summaryRows}
            isLoading={isLoading}
          />
        </>
      )}
    </Stack>
  );
}
