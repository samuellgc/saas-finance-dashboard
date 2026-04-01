import { Search } from "lucide-react";
import type { CategoriesFiltersProps } from "@/modules/categories/types/categories.types";
import { CategorySelectField } from "@/modules/categories/components/category-select-field";
import { Card } from "@/shared/components/shadcn/ui/card";
import { Grid } from "@/shared/components/ui/grid";
import { InputText } from "@/shared/components/ui/inputs/input-text";

export function CategoriesFilters({
  filters,
  typeOptions,
  disabled = false,
  onTypeChange,
  onQueryChange,
}: CategoriesFiltersProps) {
  return (
    <Card className="border border-white/10 bg-card/90 p-4 light:border-black/10">
      <Grid
        cols="1"
        gap="4"
        className="md:grid-cols-[220px_minmax(0,1fr)]"
      >
        <CategorySelectField
          id="categories-filter-type"
          label="Tipo"
          value={filters.type}
          options={typeOptions}
          placeholder="Filtrar por tipo"
          disabled={disabled}
          onChange={value => onTypeChange(value as CategoriesFiltersProps["filters"]["type"])}
        />

        <InputText
          id="categories-filter-query"
          label="Buscar categoria"
          value={filters.query}
          disabled={disabled}
          placeholder="Nome da categoria"
          rightIcon={
            <Search
              className="size-4 text-gray-5"
              aria-hidden="true"
            />
          }
          onChange={event => onQueryChange(event.target.value)}
        />
      </Grid>
    </Card>
  );
}
