import type { UseFormReturn } from "react-hook-form";

export type ContactStatus = "active" | "inactive";

export type ContactRecord = {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  notes: string;
  status: ContactStatus;
  updatedAt: string;
};

export type ContactPayload = {
  name: string;
  document: string;
  email: string;
  phone: string;
  notes: string;
  status: ContactStatus;
};

export type ContactFormValues = ContactPayload;

export type ContactsFilters = {
  query: string;
};

export type ContactsSelectOption = {
  value: string;
  label: string;
};

export type ContactMutationResult = {
  message: string;
  contact: ContactRecord;
};

export type ContactsService = {
  getContacts: () => Promise<ContactRecord[]>;
  createContact: (payload: ContactPayload) => Promise<ContactMutationResult>;
  updateContact: (id: string, payload: ContactPayload) => Promise<ContactMutationResult>;
};

export type CreateContactsServiceOptions = {
  contacts?: ContactRecord[];
  delayMs?: number;
};

export type ContactsPageProps = {
  service?: ContactsService;
};

export type ContactsToolbarProps = {
  filters: ContactsFilters;
  totalItems: number;
  filteredItems: number;
  isLoading?: boolean;
  onCreate: () => void;
  onQueryChange: (query: string) => void;
};

export type ContactsTableProps = {
  items: ContactRecord[];
  hasAnyContacts: boolean;
  isLoading?: boolean;
  onEdit: (contact: ContactRecord) => void;
};

export type ContactFormMode = "create" | "edit";

export type ContactFormProps = {
  open: boolean;
  mode: ContactFormMode;
  form: UseFormReturn<ContactFormValues>;
  isSubmitting?: boolean;
  submitError?: string | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ContactFormValues) => Promise<void>;
};

export type UseContactsManagerOptions = {
  service?: ContactsService;
};

export type UseContactsManagerResult = {
  form: UseFormReturn<ContactFormValues>;
  filters: ContactsFilters;
  filteredContacts: ContactRecord[];
  allContactsCount: number;
  hasAnyContacts: boolean;
  isFormOpen: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  editingContact: ContactRecord | null;
  submitError: string | null;
  feedbackMessage: string | null;
  onOpenChange: (open: boolean) => void;
  openCreateForm: () => void;
  openEditForm: (contact: ContactRecord) => void;
  setQueryFilter: (query: string) => void;
  onSubmit: (values: ContactFormValues) => Promise<void>;
};
