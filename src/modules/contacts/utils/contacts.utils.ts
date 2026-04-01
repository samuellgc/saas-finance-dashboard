import {
  contactCreateSuccessMessage,
  contactNotFoundErrorMessage,
  contactUpdateSuccessMessage,
  defaultContactFormValues,
} from "@/modules/contacts/constants/contacts.constants";
import type {
  ContactFormValues,
  ContactMutationResult,
  ContactPayload,
  ContactRecord,
  ContactsFilters,
} from "@/modules/contacts/types/contacts.types";

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function sanitizeText(value: string) {
  return value.trim();
}

function generateContactId() {
  return `contact-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function sortContacts(a: ContactRecord, b: ContactRecord) {
  if (a.status !== b.status) {
    return a.status === "active" ? -1 : 1;
  }

  return a.name.localeCompare(b.name, "pt-BR");
}

export function getContactFormDefaultValues(): ContactFormValues {
  return { ...defaultContactFormValues };
}

export function applyContactsFilters(contacts: ContactRecord[], filters: ContactsFilters) {
  const query = normalizeText(filters.query);

  const filteredContacts = !query
    ? contacts
    : contacts.filter(contact =>
        [contact.name, contact.document, contact.email, contact.phone, contact.notes].some(value =>
          normalizeText(value).includes(query)
        )
      );

  return [...filteredContacts].sort(sortContacts);
}

export function mapContactToFormValues(contact: ContactRecord): ContactFormValues {
  return {
    name: contact.name,
    document: contact.document,
    email: contact.email,
    phone: contact.phone,
    notes: contact.notes,
    status: contact.status,
  };
}

export function mapContactFormValuesToPayload(values: ContactFormValues): ContactPayload {
  return {
    name: sanitizeText(values.name),
    document: sanitizeText(values.document),
    email: sanitizeText(values.email).toLowerCase(),
    phone: sanitizeText(values.phone),
    notes: sanitizeText(values.notes),
    status: values.status,
  };
}

export function buildCreatedContactResult(payload: ContactPayload): ContactMutationResult {
  return {
    message: contactCreateSuccessMessage,
    contact: {
      ...payload,
      id: generateContactId(),
      updatedAt: new Date().toISOString(),
    },
  };
}

export function buildUpdatedContactResult(id: string, payload: ContactPayload): ContactMutationResult {
  return {
    message: contactUpdateSuccessMessage,
    contact: {
      ...payload,
      id,
      updatedAt: new Date().toISOString(),
    },
  };
}

export function getContactErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return contactNotFoundErrorMessage;
}
