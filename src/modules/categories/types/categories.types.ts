import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";

export type CategoryType = "entry" | "exit";

export type CategoryStatus = "active" | "inactive";

export type CategoryIconKey = "banknote" | "briefcase" | "landmark" | "megaphone" | "receipt" | "wallet";

export type CategoryFilterType = "all" | CategoryType;

export type CategoryRecord = {
  id: string;
  name: string;
  type: CategoryType;
  color: string;
  icon: CategoryIconKey;
  status: CategoryStatus;
  updatedAt: string;
};

export type CategoryPayload = {
  name: string;
  type: CategoryType;
  color: string;
  icon: CategoryIconKey;
  status: CategoryStatus;
};

export type CategoryFormValues = CategoryPayload;

export type CategoryFilters = {
  type: CategoryFilterType;
  query: string;
};

export type CategoriesSelectOption = {
  value: string;
  label: string;
};

export type CategoryMutationResult = {
  message: string;
  category: CategoryRecord;
};

export type CategoriesService = {
  getCategories: () => Promise<CategoryRecord[]>;
  createCategory: (payload: CategoryPayload) => Promise<CategoryMutationResult>;
  updateCategory: (id: string, payload: CategoryPayload) => Promise<CategoryMutationResult>;
};

export type CreateCategoriesServiceOptions = {
  categories?: CategoryRecord[];
  delayMs?: number;
};

export type CategoriesPageProps = {
  service?: CategoriesService;
};

export type CategoriesToolbarProps = {
  totalItems: number;
  filteredItems: number;
  onCreate: () => void;
  isLoading?: boolean;
};

export type CategoriesFiltersProps = {
  filters: CategoryFilters;
  typeOptions: CategoriesSelectOption[];
  disabled?: boolean;
  onTypeChange: (type: CategoryFilterType) => void;
  onQueryChange: (query: string) => void;
};

export type CategoriesTableProps = {
  items: CategoryRecord[];
  hasAnyCategories: boolean;
  isLoading?: boolean;
  onEdit: (category: CategoryRecord) => void;
};

export type CategoryIconProps = {
  icon: CategoryIconKey;
  className?: string;
};

export type CategorySelectFieldProps = {
  id: string;
  label: string;
  value: string;
  options: CategoriesSelectOption[];
  placeholder: string;
  disabled?: boolean;
  errorMessage?: string;
  onChange: (value: string) => void;
};

export type CategoryFormMode = "create" | "edit";

export type CategoryFormProps = {
  open: boolean;
  mode: CategoryFormMode;
  form: UseFormReturn<CategoryFormValues>;
  isSubmitting?: boolean;
  submitError?: string | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
};

export type UseCategoriesManagerOptions = {
  service?: CategoriesService;
};

export type UseCategoriesManagerResult = {
  form: UseFormReturn<CategoryFormValues>;
  filters: CategoryFilters;
  filteredCategories: CategoryRecord[];
  allCategoriesCount: number;
  hasAnyCategories: boolean;
  isFormOpen: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  editingCategory: CategoryRecord | null;
  submitError: string | null;
  feedbackMessage: string | null;
  filterTypeOptions: CategoriesSelectOption[];
  setTypeFilter: (type: CategoryFilterType) => void;
  setQueryFilter: (query: string) => void;
  onOpenChange: (open: boolean) => void;
  openCreateForm: () => void;
  openEditForm: (category: CategoryRecord) => void;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
};

export type CategoriesSectionProps = {
  title: string;
  description: ReactNode;
  children: ReactNode;
};
