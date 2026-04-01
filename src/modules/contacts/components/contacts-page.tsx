"use client";

import { Users } from "lucide-react";
import { ContactForm } from "@/modules/contacts/components/contact-form";
import { ContactsTable } from "@/modules/contacts/components/contacts-table";
import { ContactsToolbar } from "@/modules/contacts/components/contacts-toolbar";
import { useContactsManager } from "@/modules/contacts/hooks/use-contacts-manager";
import { contactsService } from "@/modules/contacts/services/contacts.service";
import type { ContactsPageProps } from "@/modules/contacts/types/contacts.types";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";

export function ContactsPage({ service = contactsService }: ContactsPageProps) {
  const {
    form,
    filters,
    filteredContacts,
    allContactsCount,
    hasAnyContacts,
    isFormOpen,
    isLoading,
    isSubmitting,
    editingContact,
    submitError,
    feedbackMessage,
    onOpenChange,
    openCreateForm,
    openEditForm,
    setQueryFilter,
    onSubmit,
  } = useContactsManager({
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
            <Users
              className="size-4"
              aria-hidden="true"
            />
            Relacionamento financeiro
          </Box>

          <Stack gap="2">
            <Box
              as="h2"
              className="text-2xl font-bold tracking-tight text-gray-7 sm:text-3xl"
            >
              Contatos
            </Box>
            <Typography className="max-w-3xl font-normal leading-6 text-gray-6 sm:text-base">
              Centralize pessoas e empresas em um único cadastro para dar contexto aos lançamentos, sem separar cliente
              e fornecedor.
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <ContactsToolbar
        filters={filters}
        totalItems={allContactsCount}
        filteredItems={filteredContacts.length}
        isLoading={isLoading}
        onCreate={openCreateForm}
        onQueryChange={setQueryFilter}
      />

      {feedbackMessage ? (
        <Box className="rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
          {feedbackMessage}
        </Box>
      ) : null}

      <ContactsTable
        items={filteredContacts}
        hasAnyContacts={hasAnyContacts}
        isLoading={isLoading}
        onEdit={openEditForm}
      />

      <ContactForm
        open={isFormOpen}
        mode={editingContact ? "edit" : "create"}
        form={form}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />
    </Stack>
  );
}
