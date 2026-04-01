"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import type { Resolver } from "react-hook-form";
import { transactionSchema } from "@/modules/transactions/schemas/transaction.schema";
import type {
  TransactionFormOptions,
  TransactionFormValues,
  UseTransactionFormControllerOptions,
  UseTransactionFormControllerResult,
} from "@/modules/transactions/types/transactions.types";
import {
  getTransactionCategoryOptions,
  getTransactionFormDefaultValues,
} from "@/modules/transactions/utils/transaction-form.utils";
import { useCustomForm } from "@/shared/hooks/useCustomForm";

export function useTransactionFormController({
  source,
  defaultValues = getTransactionFormDefaultValues(),
}: UseTransactionFormControllerOptions): UseTransactionFormControllerResult {
  const [options, setOptions] = useState<TransactionFormOptions>(() => source.getFormOptions());

  const form = useCustomForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema) as Resolver<TransactionFormValues>,
    defaultValues,
  });

  const selectedType = form.watch("type");
  const categoryOptions = options.categoriesByType[selectedType] ?? getTransactionCategoryOptions(selectedType);
  const contactOptions = options.contactOptions;
  const typeOptions = options.typeOptions;

  useEffect(() => {
    setOptions(source.getFormOptions());
  }, [source]);

  useEffect(() => {
    const currentCategory = form.getValues("category");

    if (!currentCategory) {
      return;
    }

    if (!categoryOptions.some(option => option.value === currentCategory)) {
      form.setValue("category", "", {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [categoryOptions, form]);

  return {
    form,
    typeOptions,
    categoryOptions,
    contactOptions,
  };
}
