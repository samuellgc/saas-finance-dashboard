import { CashFlowSelectField } from "@/modules/cash-flow/components/cash-flow-select-field";
import type { CashFlowFiltersProps } from "@/modules/cash-flow/types/cash-flow.types";
import { normalizeCashFlowTypeFilter } from "@/modules/cash-flow/utils/cash-flow.utils";
import { CashFlowSection } from "@/modules/cash-flow/components/cash-flow-section";
import { Button } from "@/shared/components/shadcn/ui/button";
import { Box } from "@/shared/components/ui/box";
import { Grid } from "@/shared/components/ui/grid";
import { Stack } from "@/shared/components/ui/stack";
import { cn } from "@/shared/lib/utils";

export function CashFlowFilters({
  filters,
  options,
  disabled = false,
  onPeriodChange,
  onTypeChange,
  onCategoryChange,
  onContactChange,
}: CashFlowFiltersProps) {
  return (
    <CashFlowSection
      headingId="cash-flow-filters-heading"
      title="Filtros"
      description="Refine o fluxo de caixa por período, tipo de movimentação, categoria e contato."
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
          className="md:grid-cols-3"
        >
          <CashFlowSelectField
            id="cash-flow-type-filter"
            label="Tipo"
            value={filters.type}
            options={options.typeOptions}
            disabled={disabled}
            onChange={value => onTypeChange(normalizeCashFlowTypeFilter(value))}
          />

          <CashFlowSelectField
            id="cash-flow-category-filter"
            label="Categoria"
            value={filters.category}
            options={options.categoryOptions}
            disabled={disabled}
            onChange={onCategoryChange}
          />

          <CashFlowSelectField
            id="cash-flow-contact-filter"
            label="Contato"
            value={filters.contact}
            options={options.contactOptions}
            disabled={disabled}
            onChange={onContactChange}
          />
        </Grid>
      </Stack>
    </CashFlowSection>
  );
}
