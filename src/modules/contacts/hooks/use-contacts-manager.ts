"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import type { Resolver } from "react-hook-form";
import { defaultContactsFilters } from "@/modules/contacts/constants/contacts.constants";
import { contactSchema } from "@/modules/contacts/schemas/contact.schema";
import { contactsService } from "@/modules/contacts/services/contacts.service";
import type {
  ContactFormValues,
  ContactRecord,
  UseContactsManagerOptions,
  UseContactsManagerResult,
} from "@/modules/contacts/types/contacts.types";
import {
  applyContactsFilters,
  getContactErrorMessage,
  getContactFormDefaultValues,
  mapContactFormValuesToPayload,
  mapContactToFormValues,
} from "@/modules/contacts/utils/contacts.utils";
import { useCustomForm } from "@/shared/hooks/useCustomForm";

export function useContactsManager({
  service = contactsService,
}: UseContactsManagerOptions = {}): UseContactsManagerResult {
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [filters, setFilters] = useState(defaultContactsFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactRecord | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const form = useCustomForm<ContactFormValues>({
    resolver: zodResolver(contactSchema) as Resolver<ContactFormValues>,
    defaultValues: getContactFormDefaultValues(),
  });

  useEffect(() => {
    let isMounted = true;

    async function loadContacts() {
      setIsLoading(true);

      try {
        const data = await service.getContacts();

        if (isMounted) {
          setContacts(data);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadContacts();

    return () => {
      isMounted = false;
    };
  }, [service]);

  const filteredContacts = applyContactsFilters(contacts, filters);
  const hasAnyContacts = contacts.length > 0;

  function resetFormState() {
    form.reset(getContactFormDefaultValues());
    form.clearErrors();
    setSubmitError(null);
  }

  function onOpenChange(open: boolean) {
    setIsFormOpen(open);

    if (!open) {
      setEditingContact(null);
      resetFormState();
    }
  }

  function openCreateForm() {
    setFeedbackMessage(null);
    setEditingContact(null);
    resetFormState();
    setIsFormOpen(true);
  }

  function openEditForm(contact: ContactRecord) {
    setFeedbackMessage(null);
    setEditingContact(contact);
    form.reset(mapContactToFormValues(contact));
    setSubmitError(null);
    setIsFormOpen(true);
  }

  async function onSubmit(values: ContactFormValues) {
    setSubmitError(null);
    setFeedbackMessage(null);

    try {
      const payload = mapContactFormValuesToPayload(values);

      if (editingContact) {
        const result = await service.updateContact(editingContact.id, payload);

        setContacts(current => current.map(contact => (contact.id === result.contact.id ? result.contact : contact)));
        setFeedbackMessage(result.message);
      } else {
        const result = await service.createContact(payload);

        setContacts(current => [result.contact, ...current]);
        setFeedbackMessage(result.message);
      }

      setIsFormOpen(false);
      setEditingContact(null);
      resetFormState();
    } catch (error) {
      setSubmitError(getContactErrorMessage(error));
    }
  }

  return {
    form,
    filters,
    filteredContacts,
    allContactsCount: contacts.length,
    hasAnyContacts,
    isFormOpen,
    isLoading,
    isSubmitting: form.formState.isSubmitting,
    editingContact,
    submitError,
    feedbackMessage,
    onOpenChange,
    openCreateForm,
    openEditForm,
    setQueryFilter: query => setFilters(current => ({ ...current, query })),
    onSubmit,
  };
}
