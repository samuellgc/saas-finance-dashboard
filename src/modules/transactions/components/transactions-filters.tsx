import { Search } from "lucide-react";
import { TransactionsSection } from "@/modules/transactions/components/transactions-section";
import { TransactionsSelectField } from "@/modules/transactions/components/transactions-select-field";
import type { TransactionsFiltersProps } from "@/modules/transactions/types/transactions.types";
import { normalizeTransactionsTypeFilter } from "@/modules/transactions/utils/transactions.utils";
import { Button } from "@/shared/components/shadcn/ui/button";
import { Input } from "@/shared/components/shadcn/ui/input";
import { Label } from "@/shared/components/shadcn/ui/label";
import { Box } from "@/shared/components/ui/box";
import { Grid } from "@/shared/components/ui/grid";
import { Stack } from "@/shared/components/ui/stack";
import { cn } from "@/shared/lib/utils";

export function TransactionsFilters({
  filters,
  options,
  disabled = false,
  onPeriodChange,
  onTypeChange,
  onCategoryChange,
  onContactChange,
  onQueryChange,
}: TransactionsFiltersProps) {
  return (
    <TransactionsSection
      headingId="transactions-filters-heading"
      title="Filtros"
      description="Combine período, tipo, categoria, contato e busca textual para refinar a listagem de lançamentos."
    >
      <Stack gap="6">
        <fieldset>
          <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-5">Período</legend>

          <Box className="flex flex-wrap items-center gap-2">
            {options.periodOptions.map(option => {
              const isSelected = option.value === filters.period;

              return (
                <Button
                  key={option.value}
                  type="button"
                  size="fit"
                  variant={isSelected ? "default" : "ghost"}
                  disabled={disabled}
                  aria-pressed={isSelected}
                  onClick={() => onPeriodChange(option.value)}
                  className={cn(
                    "min-h-10 rounded-xl px-4 py-2 text-left",
                    isSelected
                      ? "shadow-sm"
                      : "border border-transparent text-gray-6 hover:border-white/10 hover:bg-white/5 light:hover:border-black/10 light:hover:bg-black/5"
                  )}
                >
                  <Stack
                    as="span"
                    gap="1"
                    className="items-start"
                  >
                    <Box
                      as="span"
                      className="text-sm font-semibold"
                    >
                      {option.label}
                    </Box>
                    <Box
                      as="span"
                      className={cn(
                        "hidden text-xs md:block",
                        isSelected ? "text-primary-foreground/80" : "text-gray-5"
                      )}
                    >
                      {option.description}
                    </Box>
                  </Stack>
                </Button>
              );
            })}
          </Box>
        </fieldset>

        <Grid
          cols="1"
          gap="4"
          className="md:grid-cols-2 xl:grid-cols-4"
        >
          <TransactionsSelectField
            id="transactions-type-filter"
            label="Tipo"
            value={filters.type}
            options={options.typeOptions}
            disabled={disabled}
            onChange={value => onTypeChange(normalizeTransactionsTypeFilter(value))}
          />

          <TransactionsSelectField
            id="transactions-category-filter"
            label="Categoria"
            value={filters.category}
            options={options.categoryOptions}
            disabled={disabled}
            onChange={onCategoryChange}
          />

          <TransactionsSelectField
            id="transactions-contact-filter"
            label="Contato"
            value={filters.contact}
            options={options.contactOptions}
            disabled={disabled}
            onChange={onContactChange}
          />

          <Stack gap="2">
            <Label htmlFor="transactions-query-filter">Buscar descrição</Label>

            <Box className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-5"
                aria-hidden="true"
              />
              <Input
                id="transactions-query-filter"
                value={filters.query}
                disabled={disabled}
                onChange={event => onQueryChange(event.target.value)}
                placeholder="Ex.: campanha, consultoria, reembolso"
                className="h-11 rounded border border-white/10 bg-white/5 pr-4 pl-10 text-sm text-gray-7 placeholder:text-gray-5 hover:border-white/20 focus:border-primary light:border-black/10 light:bg-white light:hover:border-black/20"
              />
            </Box>
          </Stack>
        </Grid>
      </Stack>
    </TransactionsSection>
  );
}
