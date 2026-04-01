"use client";

import { useEffect, useState } from "react";
import { transactionDeleteConfirmationMessage } from "@/modules/transactions/constants/transactions.constants";
import { useTransactionFormController } from "@/modules/transactions/hooks/use-transaction-form-controller";
import { transactionEditorService } from "@/modules/transactions/services/transaction-editor.service";
import type {
  TransactionFormValues,
  UseEditTransactionFormOptions,
  UseEditTransactionFormResult,
} from "@/modules/transactions/types/transactions.types";
import {
  getTransactionFormErrorMessage,
  mapTransactionFormValuesToPayload,
  mapTransactionRecordToFormValues,
} from "@/modules/transactions/utils/transaction-form.utils";

export function useEditTransactionForm({
  transactionId,
  service = transactionEditorService,
  confirmDelete,
  navigate,
}: UseEditTransactionFormOptions): UseEditTransactionFormResult {
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState<string | null>(null);

  const { form, typeOptions, categoryOptions, contactOptions } = useTransactionFormController({
    source: service,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadTransaction() {
      setIsLoading(true);
      setIsNotFound(false);
      setSubmitError(null);
      setSubmitSuccessMessage(null);

      try {
        const transaction = await service.getTransactionById(transactionId);

        if (!isMounted) {
          return;
        }

        if (!transaction) {
          setIsNotFound(true);
          return;
        }

        form.reset(mapTransactionRecordToFormValues(transaction));
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setSubmitError(getTransactionFormErrorMessage(error));
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadTransaction();

    return () => {
      isMounted = false;
    };
  }, [form, service, transactionId]);

  const onSubmit = async (values: TransactionFormValues) => {
    setSubmitError(null);
    setSubmitSuccessMessage(null);

    try {
      const result = await service.updateTransaction(transactionId, mapTransactionFormValuesToPayload(values));

      form.reset(mapTransactionRecordToFormValues(result.transaction));
      setSubmitSuccessMessage(result.message);
    } catch (error) {
      setSubmitError(getTransactionFormErrorMessage(error));
    }
  };

  const onDelete = async () => {
    setSubmitError(null);
    setSubmitSuccessMessage(null);

    const shouldDelete = confirmDelete?.(transactionDeleteConfirmationMessage) ?? true;

    if (!shouldDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      const result = await service.deleteTransaction(transactionId);

      setSubmitSuccessMessage(result.message);
      navigate?.("/lancamentos");
    } catch (error) {
      setSubmitError(getTransactionFormErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    form,
    typeOptions,
    categoryOptions,
    contactOptions,
    isLoading,
    isNotFound,
    isSubmitting: form.formState.isSubmitting,
    isDeleting,
    submitError,
    submitSuccessMessage,
    onSubmit,
    onDelete,
  };
}
