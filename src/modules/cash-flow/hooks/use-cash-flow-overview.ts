"use client";

import { useEffect, useState } from "react";
import { defaultCashFlowFilters, emptyCashFlowOverview } from "@/modules/cash-flow/constants/cash-flow.constants";
import { cashFlowService } from "@/modules/cash-flow/services/cash-flow.service";
import type {
  CashFlowFilterOptions,
  CashFlowFilters,
  CashFlowOverview,
  CashFlowPeriodKey,
  CashFlowTypeFilter,
  UseCashFlowOverviewOptions,
  UseCashFlowOverviewResult,
} from "@/modules/cash-flow/types/cash-flow.types";

export function useCashFlowOverview({
  initialFilters = defaultCashFlowFilters,
  service = cashFlowService,
}: UseCashFlowOverviewOptions = {}): UseCashFlowOverviewResult {
  const [filters, setFilters] = useState<CashFlowFilters>(initialFilters);
  const [filterOptions, setFilterOptions] = useState<CashFlowFilterOptions>(() => service.getFilterOptions());
  const [overview, setOverview] = useState<CashFlowOverview>(emptyCashFlowOverview);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFilterOptions(service.getFilterOptions());
  }, [service]);

  useEffect(() => {
    let isActive = true;

    setIsLoading(true);

    void service.getOverview(filters).then(result => {
      if (!isActive) {
        return;
      }

      setOverview(result);
      setIsLoading(false);
    });

    return () => {
      isActive = false;
    };
  }, [filters, service]);

  const selectedPeriodOption =
    filterOptions.periodOptions.find(option => option.value === filters.period) ?? filterOptions.periodOptions[0];
  const periodLabel = selectedPeriodOption?.label ?? filterOptions.periodOptions[0]?.label ?? "Período";
  const hasTransactions = overview.summary.transactionCount > 0;

  return {
    filterOptions,
    filters,
    hasTransactions,
    isLoading,
    overview,
    periodLabel,
    setPeriodFilter: (period: CashFlowPeriodKey) => setFilters(current => ({ ...current, period })),
    setTypeFilter: (type: CashFlowTypeFilter) => setFilters(current => ({ ...current, type })),
    setCategoryFilter: (category: string) => setFilters(current => ({ ...current, category })),
    setContactFilter: (contact: string) => setFilters(current => ({ ...current, contact })),
  };
}
