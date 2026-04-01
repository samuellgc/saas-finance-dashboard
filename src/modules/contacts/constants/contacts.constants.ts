import type { ContactFormValues, ContactsFilters, ContactsSelectOption } from "@/modules/contacts/types/contacts.types";

export const contactStatusOptions: ContactsSelectOption[] = [
  { value: "active", label: "Ativo" },
  { value: "inactive", label: "Inativo" },
];

export const defaultContactsFilters: ContactsFilters = {
  query: "",
};

export const defaultContactFormValues: ContactFormValues = {
  name: "",
  document: "",
  email: "",
  phone: "",
  notes: "",
  status: "active",
};

export const contactCreateSuccessMessage = "Contato criado com sucesso.";

export const contactUpdateSuccessMessage = "Contato atualizado com sucesso.";

export const contactNotFoundErrorMessage = "Contato não encontrado.";

export const contactStatusCopy = {
  active: {
    label: "Ativo",
    className: "border-success/30 bg-success/10 text-success light:border-success/20 light:bg-success/5",
    note: "Disponível para associação em entradas e saídas.",
  },
  inactive: {
    label: "Inativo",
    className: "border-warning/30 bg-warning/10 text-warning light:border-warning/20 light:bg-warning/5",
    note: "Mantido apenas para histórico e manutenção do cadastro.",
  },
} as const;
