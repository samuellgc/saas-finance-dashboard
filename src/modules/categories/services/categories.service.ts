import { delay } from "@/shared/utils/async";
import { categoryNameUniqueErrorMessage } from "@/modules/categories/constants/categories.constants";
import { categoriesMock } from "@/modules/categories/mocks/categories.mock";
import type { CategoriesService, CreateCategoriesServiceOptions } from "@/modules/categories/types/categories.types";
import {
  buildCreatedCategoryResult,
  buildUpdatedCategoryResult,
  findDuplicateCategoryName,
} from "@/modules/categories/utils/categories.utils";

export function createCategoriesService({
  categories = categoriesMock,
  delayMs = 180,
}: CreateCategoriesServiceOptions = {}): CategoriesService {
  let currentCategories = [...categories];

  return {
    async getCategories() {
      await delay(delayMs);

      return [...currentCategories];
    },
    async createCategory(payload) {
      await delay(delayMs);

      if (findDuplicateCategoryName(currentCategories, payload.name, payload.type)) {
        throw new Error(categoryNameUniqueErrorMessage);
      }

      const result = buildCreatedCategoryResult(payload);
      currentCategories = [result.category, ...currentCategories];

      return result;
    },
    async updateCategory(id, payload) {
      await delay(delayMs);

      if (findDuplicateCategoryName(currentCategories, payload.name, payload.type, id)) {
        throw new Error(categoryNameUniqueErrorMessage);
      }

      const currentCategory = currentCategories.find(category => category.id === id);

      if (!currentCategory) {
        throw new Error("Categoria não encontrada.");
      }

      const result = buildUpdatedCategoryResult(id, payload);
      currentCategories = currentCategories.map(category => (category.id === id ? result.category : category));

      return result;
    },
  };
}

export const categoriesService = createCategoriesService();
