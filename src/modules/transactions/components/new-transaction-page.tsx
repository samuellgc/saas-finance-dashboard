"use client";

import { PlusCircle } from "lucide-react";
import { TransactionForm } from "@/modules/transactions/components/transaction-form";
import { useTransactionForm } from "@/modules/transactions/hooks/use-transaction-form";
import { transactionFormService } from "@/modules/transactions/services/transaction-form.service";
import type { NewTransactionPageProps } from "@/modules/transactions/types/transactions.types";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";

export function NewTransactionPage({ service = transactionFormService }: NewTransactionPageProps) {
  const {
    form,
    typeOptions,
    categoryOptions,
    contactOptions,
    isSubmitting,
    submitError,
    submitSuccessMessage,
    onSubmit,
  } = useTransactionForm({
    service,
  });

  return (
    <Stack gap="6">
      <Stack
        as="header"
        gap="4"
      >
        <Stack gap="3">
          <Box className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary light:border-black/10 light:bg-white">
            <PlusCircle
              className="size-4"
              aria-hidden="true"
            />
            Novo registro
          </Box>

          <Stack gap="2">
            <Box
              as="h2"
              className="text-2xl font-bold tracking-tight text-gray-7 sm:text-3xl"
            >
              Novo lançamento
            </Box>
            <Typography className="max-w-3xl font-normal leading-6 text-gray-6 sm:text-base">
              Cadastre um lançamento financeiro com validação por tipo, categoria e valor, preparando a base para o
              fluxo de edição futura.
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <TransactionForm
        form={form}
        onSubmit={onSubmit}
        typeOptions={typeOptions}
        categoryOptions={categoryOptions}
        contactOptions={contactOptions}
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitSuccessMessage={submitSuccessMessage}
      />
    </Stack>
  );
}
