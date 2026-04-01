import { contactNotFoundErrorMessage } from "@/modules/contacts/constants/contacts.constants";
import { contactsMock } from "@/modules/contacts/mocks/contacts.mock";
import type {
  ContactRecord,
  CreateContactsServiceOptions,
  ContactsService,
} from "@/modules/contacts/types/contacts.types";
import { buildCreatedContactResult, buildUpdatedContactResult } from "@/modules/contacts/utils/contacts.utils";
import { delay } from "@/shared/utils/async";

function cloneContacts(contacts: ContactRecord[]) {
  return contacts.map(contact => ({ ...contact }));
}

export function createContactsService({
  contacts = contactsMock,
  delayMs = 180,
}: CreateContactsServiceOptions = {}): ContactsService {
  let currentContacts = cloneContacts(contacts);

  return {
    async getContacts() {
      await delay(delayMs);
      return cloneContacts(currentContacts);
    },
    async createContact(payload) {
      await delay(delayMs);

      const result = buildCreatedContactResult(payload);
      currentContacts = [result.contact, ...currentContacts];

      return result;
    },
    async updateContact(id, payload) {
      await delay(delayMs);

      const currentContact = currentContacts.find(contact => contact.id === id);

      if (!currentContact) {
        throw new Error(contactNotFoundErrorMessage);
      }

      const result = buildUpdatedContactResult(id, payload);
      currentContacts = currentContacts.map(contact => (contact.id === id ? result.contact : contact));

      return result;
    },
  };
}

export const contactsService = createContactsService();
