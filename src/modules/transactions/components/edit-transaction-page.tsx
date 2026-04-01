"use client";

import Link from "next/link";
import { FilePenLine, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { TransactionForm } from "@/modules/transactions/components/transaction-form";
import { TransactionsSection } from "@/modules/transactions/components/transactions-section";
import { useEditTransactionForm } from "@/modules/transactions/hooks/use-edit-transaction-form";
import { transactionEditorService } from "@/modules/transactions/services/transaction-editor.service";
import type { EditTransactionPageProps } from "@/modules/transactions/types/transactions.types";
import { Button } from "@/shared/components/shadcn/ui/button";
import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";

export function EditTransactionPage({
  transactionId,
  service = transactionEditorService,
  confirmDelete,
  navigate,
}: EditTransactionPageProps) {
  const router = useRouter();
  const {
    form,
    typeOptions,
    categoryOptions,
    contactOptions,
    isLoading,
    isNotFound,
    isSubmitting,
    isDeleting,
    submitError,
    submitSuccessMessage,
    onSubmit,
    onDelete,
  } = useEditTransactionForm({
    transactionId,
    service,
    confirmDelete: confirmDelete ?? (message => window.confirm(message)),
    navigate: navigate ?? (href => router.push(href)),
  });

  return (
    <Stack gap="6">
      <Stack
        as="header"
        gap="4"
      >
        <Stack gap="3">
          <Box className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary light:border-black/10 light:bg-white">
            <FilePenLine
              className="size-4"
              aria-hidden="true"
            />
            Ajuste de lançamento
          </Box>

          <Stack gap="2">
            <Box
              as="h2"
              className="text-2xl font-bold tracking-tight text-gray-7 sm:text-3xl"
            >
              Editar lançamento
            </Box>
            <Typography className="max-w-3xl font-normal leading-6 text-gray-6 sm:text-base">
              Atualize os dados do lançamento mantendo as mesmas regras de validação e a estrutura já usada na criação.
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {isLoading ? (
        <TransactionsSection
          headingId="transaction-edit-loading-heading"
          title="Carregando lançamento"
          description="Buscando os dados mockados para preencher o formulário de edição."
        >
          <Stack gap="4">
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-44 w-full rounded-2xl" />
          </Stack>
        </TransactionsSection>
      ) : isNotFound ? (
        <TransactionsSection
          headingId="transaction-not-found-heading"
          title="Lançamento não encontrado"
          description="O identificador informado não corresponde a um lançamento mockado disponível para edição."
        >
          <Stack gap="4">
            <Typography className="font-normal leading-6 text-gray-6">
              Revise o link acessado ou volte para a listagem principal para escolher outro lançamento.
            </Typography>

            <Button
              asChild
              size="fit"
              className="min-h-10 rounded-xl px-4 py-2"
            >
              <Link href="/lancamentos">Voltar para lançamentos</Link>
            </Button>
          </Stack>
        </TransactionsSection>
      ) : (
        <TransactionForm
          form={form}
          onSubmit={onSubmit}
          typeOptions={typeOptions}
          categoryOptions={categoryOptions}
          contactOptions={contactOptions}
          isSubmitting={isSubmitting}
          isDisabled={isSubmitting || isDeleting}
          submitError={submitError}
          submitSuccessMessage={submitSuccessMessage}
          submitLabel="Salvar alterações"
          submittingLabel="Salvando alterações..."
          leadingAction={
            <Button
              type="button"
              variant="outline"
              size="fit"
              disabled={isSubmitting || isDeleting}
              className="min-h-10 rounded-xl border-destructive/30 px-4 py-2 text-destructive hover:border-destructive/50 hover:text-destructive"
              onClick={() => void onDelete()}
            >
              <Trash2
                className="size-4"
                aria-hidden="true"
              />
              {isDeleting ? "Excluindo..." : "Excluir"}
            </Button>
          }
        />
      )}
    </Stack>
  );
}
