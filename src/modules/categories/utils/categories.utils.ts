import {
  categoryCreateSuccessMessage,
  categoryNameUniqueErrorMessage,
  categoryUpdateSuccessMessage,
  defaultCategoryFormValues,
} from "@/modules/categories/constants/categories.constants";
import type {
  CategoryFilters,
  CategoryFormValues,
  CategoryMutationResult,
  CategoryPayload,
  CategoryRecord,
  CategoryType,
} from "@/modules/categories/types/categories.types";

function normalizeCategoryName(name: string) {
  return name.trim().toLocaleLowerCase("pt-BR");
}

export function getCategoryFormDefaultValues(): CategoryFormValues {
  return {
    ...defaultCategoryFormValues,
  };
}

export function applyCategoryFilters(categories: CategoryRecord[], filters: CategoryFilters) {
  const normalizedQuery = filters.query.trim().toLocaleLowerCase("pt-BR");

  return [...categories]
    .filter(category => (filters.type === "all" ? true : category.type === filters.type))
    .filter(category => (normalizedQuery ? category.name.toLocaleLowerCase("pt-BR").includes(normalizedQuery) : true))
    .sort((left, right) => {
      if (left.status !== right.status) {
        return left.status === "active" ? -1 : 1;
      }

      return left.name.localeCompare(right.name, "pt-BR");
    });
}

export function findDuplicateCategoryName(
  categories: CategoryRecord[],
  name: string,
  type: CategoryType,
  excludeId?: string
) {
  const normalizedName = normalizeCategoryName(name);

  return (
    categories.find(
      category =>
        category.type === type && normalizeCategoryName(category.name) === normalizedName && category.id !== excludeId
    ) ?? null
  );
}

export function mapCategoryToFormValues(category: CategoryRecord): CategoryFormValues {
  return {
    name: category.name,
    type: category.type,
    color: category.color,
    icon: category.icon,
    status: category.status,
  };
}

export function mapCategoryFormValuesToPayload(values: CategoryFormValues): CategoryPayload {
  return {
    name: values.name.trim(),
    type: values.type,
    color: values.color.trim(),
    icon: values.icon,
    status: values.status,
  };
}

export function buildCreatedCategoryResult(payload: CategoryPayload): CategoryMutationResult {
  return {
    message: categoryCreateSuccessMessage,
    category: {
      id: `category-${crypto.randomUUID()}`,
      ...payload,
      updatedAt: new Date().toISOString(),
    },
  };
}

export function buildUpdatedCategoryResult(id: string, payload: CategoryPayload): CategoryMutationResult {
  return {
    message: categoryUpdateSuccessMessage,
    category: {
      id,
      ...payload,
      updatedAt: new Date().toISOString(),
    },
  };
}

export function getCategoryErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
    return error.message;
  }

  return "Não foi possível salvar a categoria.";
}

export function isCategoryDuplicateError(message: string) {
  return message === categoryNameUniqueErrorMessage;
}
