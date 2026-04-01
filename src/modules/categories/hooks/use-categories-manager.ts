"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import type { Resolver } from "react-hook-form";
import {
  categoryFilterTypeOptions,
  categoryNameUniqueErrorMessage,
  defaultCategoryFilters,
} from "@/modules/categories/constants/categories.constants";
import { categorySchema } from "@/modules/categories/schemas/category.schema";
import { categoriesService } from "@/modules/categories/services/categories.service";
import type {
  CategoryFilterType,
  CategoryFormValues,
  CategoryRecord,
  UseCategoriesManagerOptions,
  UseCategoriesManagerResult,
} from "@/modules/categories/types/categories.types";
import {
  applyCategoryFilters,
  findDuplicateCategoryName,
  getCategoryErrorMessage,
  getCategoryFormDefaultValues,
  isCategoryDuplicateError,
  mapCategoryFormValuesToPayload,
  mapCategoryToFormValues,
} from "@/modules/categories/utils/categories.utils";
import { useCustomForm } from "@/shared/hooks/useCustomForm";

export function useCategoriesManager({
  service = categoriesService,
}: UseCategoriesManagerOptions = {}): UseCategoriesManagerResult {
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [filters, setFilters] = useState(defaultCategoryFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryRecord | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const form = useCustomForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema) as Resolver<CategoryFormValues>,
    defaultValues: getCategoryFormDefaultValues(),
  });

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      setIsLoading(true);

      try {
        const data = await service.getCategories();

        if (isMounted) {
          setCategories(data);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadCategories();

    return () => {
      isMounted = false;
    };
  }, [service]);

  const filteredCategories = applyCategoryFilters(categories, filters);
  const hasAnyCategories = categories.length > 0;

  function resetFormState() {
    form.reset(getCategoryFormDefaultValues());
    form.clearErrors();
    setSubmitError(null);
  }

  function onOpenChange(open: boolean) {
    setIsFormOpen(open);

    if (!open) {
      setEditingCategory(null);
      resetFormState();
    }
  }

  function openCreateForm() {
    setFeedbackMessage(null);
    setEditingCategory(null);
    form.reset(getCategoryFormDefaultValues());
    setSubmitError(null);
    setIsFormOpen(true);
  }

  function openEditForm(category: CategoryRecord) {
    setFeedbackMessage(null);
    setEditingCategory(category);
    form.reset(mapCategoryToFormValues(category));
    setSubmitError(null);
    setIsFormOpen(true);
  }

  async function onSubmit(values: CategoryFormValues) {
    setSubmitError(null);
    setFeedbackMessage(null);
    form.clearErrors("name");

    const duplicate = findDuplicateCategoryName(categories, values.name, values.type, editingCategory?.id);

    if (duplicate) {
      form.setError("name", {
        type: "manual",
        message: categoryNameUniqueErrorMessage,
      });
      return;
    }

    try {
      const payload = mapCategoryFormValuesToPayload(values);

      if (editingCategory) {
        const result = await service.updateCategory(editingCategory.id, payload);

        setCategories(current =>
          current.map(category => (category.id === result.category.id ? result.category : category))
        );
        setFeedbackMessage(result.message);
      } else {
        const result = await service.createCategory(payload);

        setCategories(current => [result.category, ...current]);
        setFeedbackMessage(result.message);
      }

      setIsFormOpen(false);
      setEditingCategory(null);
      resetFormState();
    } catch (error) {
      const message = getCategoryErrorMessage(error);

      if (isCategoryDuplicateError(message)) {
        form.setError("name", {
          type: "manual",
          message,
        });
        return;
      }

      setSubmitError(message);
    }
  }

  return {
    form,
    filters,
    filteredCategories,
    allCategoriesCount: categories.length,
    hasAnyCategories,
    isFormOpen,
    isLoading,
    isSubmitting: form.formState.isSubmitting,
    editingCategory,
    submitError,
    feedbackMessage,
    filterTypeOptions: categoryFilterTypeOptions,
    setTypeFilter: (type: CategoryFilterType) => setFilters(current => ({ ...current, type })),
    setQueryFilter: query => setFilters(current => ({ ...current, query })),
    onOpenChange,
    openCreateForm,
    openEditForm,
    onSubmit,
  };
}
