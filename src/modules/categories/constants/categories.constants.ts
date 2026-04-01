import type {
  CategoryFilterType,
  CategoryFilters,
  CategoryFormValues,
  CategoryStatus,
  CategoryType,
  CategoriesSelectOption,
} from "@/modules/categories/types/categories.types";

export const ALL_CATEGORY_FILTER_VALUE: CategoryFilterType = "all";

export const categoryFilterTypeOptions: CategoriesSelectOption[] = [
  { value: ALL_CATEGORY_FILTER_VALUE, label: "Todos os tipos" },
  { value: "entry", label: "Entradas" },
  { value: "exit", label: "Saídas" },
];

export const categoryFormTypeOptions: CategoriesSelectOption[] = [
  { value: "entry", label: "Entrada" },
  { value: "exit", label: "Saída" },
];

export const categoryStatusOptions: CategoriesSelectOption[] = [
  { value: "active", label: "Ativa" },
  { value: "inactive", label: "Inativa" },
];

export const categoryIconOptions: CategoriesSelectOption[] = [
  { value: "banknote", label: "Receitas" },
  { value: "briefcase", label: "Serviços" },
  { value: "landmark", label: "Impostos" },
  { value: "megaphone", label: "Marketing" },
  { value: "receipt", label: "Operação" },
  { value: "wallet", label: "Carteira" },
];

export const defaultCategoryFilters: CategoryFilters = {
  type: ALL_CATEGORY_FILTER_VALUE,
  query: "",
};

export const defaultCategoryFormValues: CategoryFormValues = {
  name: "",
  type: "entry",
  color: "#16a34a",
  icon: "banknote",
  status: "active",
};

export const categoryNameUniqueErrorMessage = "Já existe uma categoria com esse nome para o tipo selecionado.";

export const categoryCreateSuccessMessage = "Categoria criada com sucesso.";
export const categoryUpdateSuccessMessage = "Categoria atualizada com sucesso.";

export const categoryTypeCopy: Record<CategoryType, { label: string; className: string }> = {
  entry: {
    label: "Entrada",
    className: "border-primary/20 bg-primary/10 text-primary",
  },
  exit: {
    label: "Saída",
    className: "border-destructive/20 bg-destructive/10 text-destructive",
  },
};

export const categoryStatusCopy: Record<CategoryStatus, { label: string; className: string; note: string }> = {
  active: {
    label: "Ativa",
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
    note: "Disponível para uso.",
  },
  inactive: {
    label: "Inativa",
    className: "border-amber-500/20 bg-amber-500/10 text-amber-600",
    note: "Não pode ser usada em novos lançamentos.",
  },
};
