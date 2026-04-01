"use client";

import { useEffect, useState } from "react";
import {
  defaultTransactionsFilters,
  emptyTransactionsOverview,
} from "@/modules/transactions/constants/transactions.constants";
import { transactionsService } from "@/modules/transactions/services/transactions.service";
import type {
  TransactionsFilterOptions,
  TransactionsFilters,
  TransactionsOverview,
  TransactionsPeriodKey,
  TransactionsTypeFilter,
  UseTransactionsListingOptions,
  UseTransactionsListingResult,
} from "@/modules/transactions/types/transactions.types";

export function useTransactionsListing({
  initialFilters = defaultTransactionsFilters,
  initialPage = 1,
  service = transactionsService,
}: UseTransactionsListingOptions = {}): UseTransactionsListingResult {
  const [filters, setFilters] = useState<TransactionsFilters>(initialFilters);
  const [page, setPage] = useState(initialPage);
  const [filterOptions, setFilterOptions] = useState<TransactionsFilterOptions>(() => service.getFilterOptions());
  const [overview, setOverview] = useState<TransactionsOverview>(emptyTransactionsOverview);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFilterOptions(service.getFilterOptions());
  }, [service]);

  useEffect(() => {
    let isActive = true;

    setIsLoading(true);

    void service.getListing(filters, page).then(result => {
      if (!isActive) {
        return;
      }

      setOverview(result);
      setIsLoading(false);
    });

    return () => {
      isActive = false;
    };
  }, [filters, page, service]);

  const selectedPeriodOption =
    filterOptions.periodOptions.find(option => option.value === filters.period) ?? filterOptions.periodOptions[0];
  const periodLabel = selectedPeriodOption?.label ?? filterOptions.periodOptions[0]?.label ?? "Período";
  const hasAnyTransactions = service.getTotalTransactions() > 0;
  const hasVisibleResults = overview.filteredItems > 0;

  function updateFilter<Key extends keyof TransactionsFilters>(key: Key, value: TransactionsFilters[Key]) {
    setPage(1);
    setFilters(current => ({ ...current, [key]: value }));
  }

  return {
    filterOptions,
    filters,
    isLoading,
    overview,
    periodLabel,
    hasAnyTransactions,
    hasVisibleResults,
    setPage: (nextPage: number) => setPage(nextPage),
    setPeriodFilter: (period: TransactionsPeriodKey) => updateFilter("period", period),
    setTypeFilter: (type: TransactionsTypeFilter) => updateFilter("type", type),
    setCategoryFilter: (category: string) => updateFilter("category", category),
    setContactFilter: (contact: string) => updateFilter("contact", contact),
    setQueryFilter: (query: string) => updateFilter("query", query),
  };
}
