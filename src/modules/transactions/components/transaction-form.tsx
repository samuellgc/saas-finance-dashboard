"use client";

import Link from "next/link";
import { Controller } from "react-hook-form";
import type { TransactionFormProps } from "@/modules/transactions/types/transactions.types";
import { TransactionFormSelectField } from "@/modules/transactions/components/transaction-form-select-field";
import { TransactionsSection } from "@/modules/transactions/components/transactions-section";
import { Button } from "@/shared/components/shadcn/ui/button";
import { Form } from "@/shared/components/shadcn/ui/form";
import { InputCurrency } from "@/shared/components/ui/inputs/input-currency";
import { InputDate } from "@/shared/components/ui/inputs/input-date";
import { InputText } from "@/shared/components/ui/inputs/input-text";
import { Box } from "@/shared/components/ui/box";
import { Grid } from "@/shared/components/ui/grid";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";
import { cn } from "@/shared/lib/utils";
import { Label } from "@/shared/components/shadcn/ui/label";

export function TransactionForm({
  form,
  onSubmit,
  typeOptions,
  categoryOptions,
  contactOptions,
  isSubmitting = false,
  submitError,
  submitSuccessMessage,
  cancelHref = "/lancamentos",
}: TransactionFormProps) {
  const descriptionError = form.formState.errors.description?.message;
  const dateError = form.formState.errors.occurredAt?.message;
  const notesError = form.formState.errors.notes?.message;

  return (
    <TransactionsSection
      headingId="transaction-form-heading"
      title="Formulário"
      description="Preencha os dados obrigatórios do lançamento e deixe os campos opcionais para complementar o registro."
    >
      <Form {...form}>
        <Box
          as="form"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Stack gap="6">
            <Grid
              cols="1"
              gap="4"
              className="md:grid-cols-2"
            >
              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TransactionFormSelectField
                    id="transaction-type"
                    label="Tipo"
                    value={field.value}
                    options={typeOptions}
                    placeholder="Selecione o tipo"
                    errorMessage={fieldState.error?.message}
                    disabled={isSubmitting}
                    onChange={field.onChange}
                  />
                )}
              />

              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TransactionFormSelectField
                    id="transaction-category"
                    label="Categoria"
                    value={field.value}
                    options={categoryOptions}
                    placeholder="Selecione a categoria"
                    errorMessage={fieldState.error?.message}
                    disabled={isSubmitting}
                    onChange={field.onChange}
                  />
                )}
              />

              <InputText
                id="transaction-description"
                label="Descrição"
                value={form.watch("description")}
                disabled={isSubmitting}
                hasError={Boolean(descriptionError)}
                helperText={
                  descriptionError
                    ? {
                        text: descriptionError,
                        type: "error",
                        variant: "auxiliary",
                      }
                    : undefined
                }
                onChange={event =>
                  form.setValue("description", event.target.value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              />

              <Controller
                name="amount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <InputCurrency
                    id="transaction-amount"
                    label="Valor"
                    value={field.value}
                    disabled={isSubmitting}
                    hasError={Boolean(fieldState.error?.message)}
                    helperText={
                      fieldState.error?.message
                        ? {
                            text: fieldState.error.message,
                            type: "error",
                            variant: "auxiliary",
                          }
                        : undefined
                    }
                    onChange={field.onChange}
                  />
                )}
              />

              <Controller
                name="occurredAt"
                control={form.control}
                render={({ field }) => (
                  <InputDate
                    id="transaction-date"
                    label="Data"
                    value={field.value}
                    disabled={isSubmitting}
                    hasError={Boolean(dateError)}
                    helperText={
                      dateError
                        ? {
                            text: dateError,
                            type: "error",
                            variant: "auxiliary",
                          }
                        : undefined
                    }
                    placeholder="DD/MM/AAAA"
                    onChange={field.onChange}
                  />
                )}
              />

              <Controller
                name="contact"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TransactionFormSelectField
                    id="transaction-contact"
                    label="Contato"
                    value={field.value}
                    options={contactOptions}
                    placeholder="Selecione um contato"
                    errorMessage={fieldState.error?.message}
                    disabled={isSubmitting}
                    onChange={field.onChange}
                  />
                )}
              />
            </Grid>

            <Stack gap="2">
              <Label htmlFor="transaction-notes">Observação</Label>
              <Box
                as="textarea"
                id="transaction-notes"
                rows={5}
                disabled={isSubmitting}
                value={form.watch("notes")}
                onChange={event =>
                  form.setValue("notes", event.target.value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                className={cn(
                  "w-full rounded border bg-white/5 px-4 py-3 text-sm text-gray-7 outline-none transition light:bg-white",
                  notesError
                    ? "border-error hover:border-error focus:border-error"
                    : "border-white/10 hover:border-white/20 focus:border-primary light:border-black/10 light:hover:border-black/20"
                )}
                placeholder="Contexto adicional, conciliação, referência do documento..."
              />
              {notesError ? (
                <Typography
                  variant="auxiliary"
                  type="error"
                  className="font-normal tracking-normal"
                >
                  {notesError}
                </Typography>
              ) : null}
            </Stack>

            {submitError ? (
              <Box className="rounded-2xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
                {submitError}
              </Box>
            ) : null}

            {submitSuccessMessage ? (
              <Box className="rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
                {submitSuccessMessage}
              </Box>
            ) : null}

            <Stack
              direction="row"
              gap="3"
              className="flex-wrap justify-end"
            >
              <Button
                asChild
                type="button"
                variant="outline"
                size="fit"
                className="min-h-10 rounded-xl px-4 py-2"
              >
                <Link href={cancelHref}>Cancelar</Link>
              </Button>

              <Button
                type="submit"
                size="fit"
                disabled={isSubmitting}
                className="min-h-10 rounded-xl px-4 py-2"
              >
                {isSubmitting ? "Salvando..." : "Salvar lançamento"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Form>
    </TransactionsSection>
  );
}
