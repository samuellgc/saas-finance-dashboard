"use client";

import { Controller } from "react-hook-form";
import { contactStatusCopy, contactStatusOptions } from "@/modules/contacts/constants/contacts.constants";
import type { ContactFormProps } from "@/modules/contacts/types/contacts.types";
import { Button } from "@/shared/components/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/shadcn/ui/dialog";
import { Form } from "@/shared/components/shadcn/ui/form";
import { Label } from "@/shared/components/shadcn/ui/label";
import { Box } from "@/shared/components/ui/box";
import { Grid } from "@/shared/components/ui/grid";
import { InputPhone } from "@/shared/components/ui/inputs/input-phone";
import { InputText } from "@/shared/components/ui/inputs/input-text";
import { SelectWrapper } from "@/shared/components/ui/inputs/select-wrapper";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";
import { cn } from "@/shared/lib/utils";

export function ContactForm({
  open,
  mode,
  form,
  isSubmitting = false,
  submitError,
  onOpenChange,
  onSubmit,
}: ContactFormProps) {
  const formTitle = mode === "create" ? "Novo contato" : "Editar contato";
  const submitLabel = mode === "create" ? "Criar contato" : "Salvar alterações";
  const notesError = form.formState.errors.notes?.message;
  const selectedStatus = form.watch("status");

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="border border-white/10 bg-card/95 sm:max-w-2xl light:border-black/10">
        <DialogHeader>
          <DialogTitle>{formTitle}</DialogTitle>
          <DialogDescription>
            Mantenha um cadastro financeiro único para uso em lançamentos de entrada e saída.
          </DialogDescription>
        </DialogHeader>

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
                <InputText
                  id="contact-name"
                  label="Nome"
                  value={form.watch("name")}
                  disabled={isSubmitting}
                  hasError={Boolean(form.formState.errors.name?.message)}
                  helperText={
                    form.formState.errors.name?.message
                      ? {
                          text: form.formState.errors.name.message,
                          type: "error",
                          variant: "auxiliary",
                        }
                      : undefined
                  }
                  onChange={event =>
                    form.setValue("name", event.target.value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                />

                <InputText
                  id="contact-document"
                  label="Documento"
                  value={form.watch("document")}
                  disabled={isSubmitting}
                  hasError={Boolean(form.formState.errors.document?.message)}
                  helperText={
                    form.formState.errors.document?.message
                      ? {
                          text: form.formState.errors.document.message,
                          type: "error",
                          variant: "auxiliary",
                        }
                      : undefined
                  }
                  onChange={event =>
                    form.setValue("document", event.target.value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                />

                <InputText
                  id="contact-email"
                  type="email"
                  label="E-mail"
                  value={form.watch("email")}
                  disabled={isSubmitting}
                  hasError={Boolean(form.formState.errors.email?.message)}
                  helperText={
                    form.formState.errors.email?.message
                      ? {
                          text: form.formState.errors.email.message,
                          type: "error",
                          variant: "auxiliary",
                        }
                      : undefined
                  }
                  onChange={event =>
                    form.setValue("email", event.target.value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                />

                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <InputPhone
                      id="contact-phone"
                      label="Telefone"
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
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Stack gap="2">
                      <SelectWrapper
                        id="contact-status"
                        label="Status"
                        value={field.value}
                        items={contactStatusOptions}
                        placeholder="Selecione o status"
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

                      <Typography
                        variant="auxiliary"
                        className="font-normal tracking-normal text-gray-5"
                      >
                        {contactStatusCopy[selectedStatus].note}
                      </Typography>
                    </Stack>
                  )}
                />
              </Grid>

              <Stack gap="2">
                <Label htmlFor="contact-notes">Observação</Label>
                <Box
                  as="textarea"
                  id="contact-notes"
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
                  placeholder="Contexto adicional sobre relacionamento, cobrança ou histórico do contato..."
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

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  size="fit"
                  className="min-h-10 rounded-xl px-4 py-2"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  size="fit"
                  disabled={isSubmitting}
                  className="min-h-10 rounded-xl px-4 py-2"
                >
                  {isSubmitting ? "Salvando..." : submitLabel}
                </Button>
              </DialogFooter>
            </Stack>
          </Box>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
