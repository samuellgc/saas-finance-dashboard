import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactsPage } from "@/modules/contacts/components/contacts-page";
import { contactsMock } from "@/modules/contacts/mocks/contacts.mock";
import { createContactsService } from "@/modules/contacts/services/contacts.service";

function renderContactsPage() {
  const service = createContactsService({
    contacts: contactsMock,
    delayMs: 0,
  });

  return render(<ContactsPage service={service} />);
}

describe("<ContactsPage />", () => {
  it("cria um novo contato pelo modal", async () => {
    const user = userEvent.setup();

    renderContactsPage();

    await user.click(await screen.findByRole("button", { name: /novo contato/i }));
    const dialog = within(screen.getByRole("dialog"));

    await user.type(dialog.getByLabelText("Nome"), "Parceria fiscal");
    await user.type(dialog.getByLabelText("E-mail"), "contato@parceriafiscal.com");
    await user.click(dialog.getByRole("button", { name: /criar contato/i }));

    expect(await screen.findByText("Contato criado com sucesso.")).toBeInTheDocument();
    expect(screen.getByText("Parceria fiscal")).toBeInTheDocument();
  });

  it("edita um contato existente", async () => {
    const user = userEvent.setup();

    renderContactsPage();

    await user.click(await screen.findByRole("button", { name: /editar banco horizonte/i }));
    const dialog = within(screen.getByRole("dialog"));
    const nameInput = dialog.getByLabelText("Nome");

    await user.clear(nameInput);
    await user.type(nameInput, "Banco Horizonte Prime");
    await user.click(dialog.getByRole("button", { name: /salvar alterações/i }));

    expect(await screen.findByText("Contato atualizado com sucesso.")).toBeInTheDocument();
    expect(screen.getByText("Banco Horizonte Prime")).toBeInTheDocument();
  });

  it("aplica busca na lista de contatos", async () => {
    const user = userEvent.setup();

    renderContactsPage();

    await screen.findByText("Banco Horizonte");
    await user.type(screen.getByLabelText("Buscar contato"), "acme");

    expect(await screen.findByText("Acme consultoria")).toBeInTheDocument();
    expect(screen.queryByText("Banco Horizonte")).not.toBeInTheDocument();
  });

  it("valida nome obrigatório e e-mail inválido", async () => {
    const user = userEvent.setup();

    renderContactsPage();

    await user.click(await screen.findByRole("button", { name: /novo contato/i }));
    const dialog = within(screen.getByRole("dialog"));

    await user.type(dialog.getByLabelText("E-mail"), "email-invalido");
    await user.click(dialog.getByRole("button", { name: /criar contato/i }));

    expect(await screen.findByText("Informe o nome do contato.")).toBeInTheDocument();
    expect(screen.getByText("Informe um e-mail válido.")).toBeInTheDocument();
  });
});
