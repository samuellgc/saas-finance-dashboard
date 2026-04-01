"use client";

import { Tags } from "lucide-react";
import { CategoriesFilters } from "@/modules/categories/components/categories-filters";
import { CategoryForm } from "@/modules/categories/components/category-form";
import { CategoriesTable } from "@/modules/categories/components/categories-table";
import { CategoriesToolbar } from "@/modules/categories/components/categories-toolbar";
import { useCategoriesManager } from "@/modules/categories/hooks/use-categories-manager";
import { categoriesService } from "@/modules/categories/services/categories.service";
import type { CategoriesPageProps } from "@/modules/categories/types/categories.types";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";

export function CategoriesPage({ service = categoriesService }: CategoriesPageProps) {
  const {
    form,
    filters,
    filteredCategories,
    allCategoriesCount,
    hasAnyCategories,
    isFormOpen,
    isLoading,
    isSubmitting,
    editingCategory,
    submitError,
    feedbackMessage,
    filterTypeOptions,
    setTypeFilter,
    setQueryFilter,
    onOpenChange,
    openCreateForm,
    openEditForm,
    onSubmit,
  } = useCategoriesManager({
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
            <Tags
              className="size-4"
              aria-hidden="true"
            />
            Catálogo financeiro
          </Box>

          <Stack gap="2">
            <Box
              as="h2"
              className="text-2xl font-bold tracking-tight text-gray-7 sm:text-3xl"
            >
              Categorias
            </Box>
            <Typography className="max-w-3xl font-normal leading-6 text-gray-6 sm:text-base">
              Gerencie categorias por tipo, controle quais permanecem ativas e mantenha a base pronta para uso nos
              demais fluxos financeiros.
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <CategoriesToolbar
        totalItems={allCategoriesCount}
        filteredItems={filteredCategories.length}
        onCreate={openCreateForm}
        isLoading={isLoading}
      />

      <CategoriesFilters
        filters={filters}
        typeOptions={filterTypeOptions}
        disabled={isLoading}
        onTypeChange={setTypeFilter}
        onQueryChange={setQueryFilter}
      />

      {feedbackMessage ? (
        <Box className="rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
          {feedbackMessage}
        </Box>
      ) : null}

      <CategoriesTable
        items={filteredCategories}
        hasAnyCategories={hasAnyCategories}
        isLoading={isLoading}
        onEdit={openEditForm}
      />

      <CategoryForm
        open={isFormOpen}
        mode={editingCategory ? "edit" : "create"}
        form={form}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />
    </Stack>
  );
}
