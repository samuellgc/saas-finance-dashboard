"use client";

import { useState } from "react";
import { useTransactionFormController } from "@/modules/transactions/hooks/use-transaction-form-controller";
import { transactionFormService } from "@/modules/transactions/services/transaction-form.service";
import type {
  TransactionFormValues,
  UseTransactionFormOptions,
  UseTransactionFormResult,
} from "@/modules/transactions/types/transactions.types";
import {
  getTransactionFormErrorMessage,
  mapTransactionFormValuesToPayload,
} from "@/modules/transactions/utils/transaction-form.utils";

export function useTransactionForm({
  service = transactionFormService,
}: UseTransactionFormOptions = {}): UseTransactionFormResult {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState<string | null>(null);

  const { form, typeOptions, categoryOptions, contactOptions } = useTransactionFormController({
    source: service,
  });

  const onSubmit = async (values: TransactionFormValues) => {
    setSubmitError(null);
    setSubmitSuccessMessage(null);

    try {
      const result = await service.createTransaction(mapTransactionFormValuesToPayload(values));

      setSubmitSuccessMessage(result.message);
      form.reset();
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
