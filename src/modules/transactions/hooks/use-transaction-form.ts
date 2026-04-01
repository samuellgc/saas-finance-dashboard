"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import type { Resolver } from "react-hook-form";
import { useCustomForm } from "@/shared/hooks/useCustomForm";
import { transactionSchema } from "@/modules/transactions/schemas/transaction.schema";
import { transactionFormService } from "@/modules/transactions/services/transaction-form.service";
import type {
  TransactionFormOptions,
  TransactionFormValues,
  UseTransactionFormOptions,
  UseTransactionFormResult,
} from "@/modules/transactions/types/transactions.types";
import {
  getTransactionCategoryOptions,
  getTransactionFormDefaultValues,
  getTransactionFormErrorMessage,
  mapTransactionFormValuesToPayload,
} from "@/modules/transactions/utils/transaction-form.utils";

export function useTransactionForm({
  service = transactionFormService,
}: UseTransactionFormOptions = {}): UseTransactionFormResult {
  const [options, setOptions] = useState<TransactionFormOptions>(() => service.getFormOptions());
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState<string | null>(null);

  const form = useCustomForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema) as Resolver<TransactionFormValues>,
    defaultValues: getTransactionFormDefaultValues(),
  });

  const selectedType = form.watch("type");
  const categoryOptions = options.categoriesByType[selectedType] ?? getTransactionCategoryOptions(selectedType);
  const contactOptions = options.contactOptions;
  const typeOptions = options.typeOptions;

  useEffect(() => {
    setOptions(service.getFormOptions());
  }, [service]);

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

  const onSubmit = async (values: TransactionFormValues) => {
    setSubmitError(null);
    setSubmitSuccessMessage(null);

    try {
      const result = await service.createTransaction(mapTransactionFormValuesToPayload(values));

      setSubmitSuccessMessage(result.message);
      form.reset(getTransactionFormDefaultValues());
    } catch (error) {
      setSubmitError(getTransactionFormErrorMessage(error));
    }
  };

  return {
    form,
    typeOptions,
    categoryOptions,
    contactOptions,
    isSubmitting: form.formState.isSubmitting,
    submitError,
    submitSuccessMessage,
    onSubmit,
  };
}
