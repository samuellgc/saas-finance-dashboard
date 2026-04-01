"use client";

import { ReceiptText } from "lucide-react";
import { TransactionsEmptyState } from "@/modules/transactions/components/transactions-empty-state";
import { TransactionsFilters } from "@/modules/transactions/components/transactions-filters";
import { TransactionsPagination } from "@/modules/transactions/components/transactions-pagination";
import { TransactionsTable } from "@/modules/transactions/components/transactions-table";
import { TransactionsToolbar } from "@/modules/transactions/components/transactions-toolbar";
import { useTransactionsListing } from "@/modules/transactions/hooks/use-transactions-listing";
import { transactionsService } from "@/modules/transactions/services/transactions.service";
import type { TransactionsPageProps } from "@/modules/transactions/types/transactions.types";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";

export function TransactionsPage({ service = transactionsService }: TransactionsPageProps) {
  const {
    filterOptions,
    filters,
    hasAnyTransactions,
    hasVisibleResults,
    isLoading,
    overview,
    periodLabel,
    setCategoryFilter,
    setContactFilter,
    setPage,
    setPeriodFilter,
    setQueryFilter,
    setTypeFilter,
  } = useTransactionsListing({
    service,
  });

  return (
    <Stack gap="6">
      <Stack
        as="header"
        gap="4"
      >
        <Stack gap="3">
          <Box className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary light:border-black/10 light:bg-white">
            <ReceiptText
              className="size-4"
              aria-hidden="true"
            />
            Operação financeira
          </Box>

          <Stack gap="2">
            <Box
              as="h2"
              className="text-2xl font-bold tracking-tight text-gray-7 sm:text-3xl"
            >
              Lançamentos
            </Box>
            <Typography className="max-w-3xl font-normal leading-6 text-gray-6 sm:text-base">
              Consulte, filtre e navegue pelos lançamentos financeiros sem antecipar ainda os fluxos de criação e
              edição.
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <TransactionsToolbar
        totalItems={overview.totalItems}
        filteredItems={overview.filteredItems}
        periodLabel={periodLabel}
        isLoading={isLoading}
      />

      <TransactionsFilters
        filters={filters}
        options={filterOptions}
        disabled={isLoading}
        onPeriodChange={setPeriodFilter}
        onTypeChange={setTypeFilter}
        onCategoryChange={setCategoryFilter}
        onContactChange={setContactFilter}
        onQueryChange={setQueryFilter}
      />

      {!isLoading && !hasAnyTransactions ? (
        <TransactionsEmptyState
          variant="empty"
          periodLabel={periodLabel}
          query={filters.query}
        />
      ) : !isLoading && !hasVisibleResults ? (
        <TransactionsEmptyState
          variant="no-results"
          periodLabel={periodLabel}
          query={filters.query}
        />
      ) : (
        <>
          <TransactionsTable
            items={overview.items}
            isLoading={isLoading}
          />

          <TransactionsPagination
            pagination={overview.pagination}
            isLoading={isLoading}
            onPageChange={setPage}
          />
        </>
      )}
    </Stack>
  );
}
