"use client";

import { Controller } from "react-hook-form";
import {
  categoryFormTypeOptions,
  categoryIconOptions,
  categoryStatusCopy,
  categoryStatusOptions,
} from "@/modules/categories/constants/categories.constants";
import { CategoryIcon } from "@/modules/categories/components/category-icon";
import { CategorySelectField } from "@/modules/categories/components/category-select-field";
import type { CategoryFormProps } from "@/modules/categories/types/categories.types";
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
import { Box } from "@/shared/components/ui/box";
import { Grid } from "@/shared/components/ui/grid";
import { InputText } from "@/shared/components/ui/inputs/input-text";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";

export function CategoryForm({
  open,
  mode,
  form,
  isSubmitting = false,
  submitError,
  onOpenChange,
  onSubmit,
}: CategoryFormProps) {
  const formTitle = mode === "create" ? "Nova categoria" : "Editar categoria";
  const submitLabel = mode === "create" ? "Criar categoria" : "Salvar alterações";
  const selectedIcon = form.watch("icon");
  const selectedColor = form.watch("color");
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
            Defina nome, tipo, cor, ícone e status mantendo a unicidade do nome por tipo.
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
                  id="category-name"
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

                <Controller
                  name="type"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <CategorySelectField
                      id="category-type"
                      label="Tipo"
                      value={field.value}
                      options={categoryFormTypeOptions}
                      placeholder="Selecione o tipo"
                      disabled={isSubmitting}
                      errorMessage={fieldState.error?.message}
                      onChange={field.onChange}
                    />
                  )}
                />

                <Stack gap="2">
                  <InputText
                    id="category-color"
                    label="Cor"
                    value={selectedColor}
                    disabled={isSubmitting}
                    hasError={Boolean(form.formState.errors.color?.message)}
                    helperText={
                      form.formState.errors.color?.message
                        ? {
                            text: form.formState.errors.color.message,
                            type: "error",
                            variant: "auxiliary",
                          }
                        : {
                            text: "Use hexadecimal, por exemplo #2563EB.",
                            variant: "auxiliary",
                          }
                    }
                    onChange={event =>
                      form.setValue("color", event.target.value, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                  />

                  <Stack
                    direction="row"
                    gap="2"
                    alignment="center"
                  >
                    <Box
                      className="size-5 rounded-full border border-white/10"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <Typography
                      variant="auxiliary"
                      className="font-normal tracking-normal text-gray-5"
                    >
                      Pré-visualização da cor.
                    </Typography>
                  </Stack>
                </Stack>

                <Controller
                  name="icon"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Stack gap="2">
                      <CategorySelectField
                        id="category-icon"
                        label="Ícone"
                        value={field.value}
                        options={categoryIconOptions}
                        placeholder="Selecione o ícone"
                        disabled={isSubmitting}
                        errorMessage={fieldState.error?.message}
                        onChange={field.onChange}
                      />

                      <Stack
                        direction="row"
                        gap="2"
                        alignment="center"
                      >
                        <Box
                          className="flex size-8 items-center justify-center rounded-xl border border-white/10"
                          style={{ color: selectedColor, backgroundColor: `${selectedColor}20` }}
                        >
                          <CategoryIcon icon={selectedIcon} />
                        </Box>
                        <Typography
                          variant="auxiliary"
                          className="font-normal tracking-normal text-gray-5"
                        >
                          Pré-visualização do ícone.
                        </Typography>
                      </Stack>
                    </Stack>
                  )}
                />

                <Controller
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Stack gap="2">
                      <CategorySelectField
                        id="category-status"
                        label="Status"
                        value={field.value}
                        options={categoryStatusOptions}
                        placeholder="Selecione o status"
                        disabled={isSubmitting}
                        errorMessage={fieldState.error?.message}
                        onChange={field.onChange}
                      />

                      <Typography
                        variant="auxiliary"
                        className="font-normal tracking-normal text-gray-5"
                      >
                        {categoryStatusCopy[selectedStatus].note}
                      </Typography>
                    </Stack>
                  )}
                />
              </Grid>

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
