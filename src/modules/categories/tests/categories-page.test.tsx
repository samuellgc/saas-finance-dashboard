import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CategoriesPage } from "@/modules/categories/components/categories-page";
import { categoriesMock } from "@/modules/categories/mocks/categories.mock";
import { createCategoriesService } from "@/modules/categories/services/categories.service";

function renderCategoriesPage() {
  const service = createCategoriesService({
    categories: categoriesMock,
    delayMs: 0,
  });

  return render(<CategoriesPage service={service} />);
}

describe("<CategoriesPage />", () => {
  it("cria uma nova categoria pelo modal", async () => {
    const user = userEvent.setup();

    renderCategoriesPage();

    await user.click(await screen.findByRole("button", { name: /nova categoria/i }));
    const dialog = within(screen.getByRole("dialog"));

    await user.type(dialog.getByLabelText("Nome"), "Parcerias");
    await user.selectOptions(dialog.getByLabelText("Tipo"), "entry");
    await user.clear(dialog.getByLabelText("Cor"));
    await user.type(dialog.getByLabelText("Cor"), "#0F766E");
    await user.selectOptions(dialog.getByLabelText("Ícone"), "wallet");
    await user.selectOptions(dialog.getByLabelText("Status"), "active");
    await user.click(dialog.getByRole("button", { name: /criar categoria/i }));

    expect(await screen.findByText("Categoria criada com sucesso.")).toBeInTheDocument();
    expect(screen.getByText("Parcerias")).toBeInTheDocument();
  });

  it("edita uma categoria existente", async () => {
    const user = userEvent.setup();

    renderCategoriesPage();

    await user.click(await screen.findByRole("button", { name: /editar marketing/i }));
    const dialog = within(screen.getByRole("dialog"));
    const nameInput = dialog.getByLabelText("Nome");
    await user.clear(nameInput);
    await user.type(nameInput, "Marketing digital");
    await user.click(dialog.getByRole("button", { name: /salvar alterações/i }));

    expect(await screen.findByText("Categoria atualizada com sucesso.")).toBeInTheDocument();
    expect(screen.getByText("Marketing digital")).toBeInTheDocument();
  });

  it("aplica filtros por tipo e busca", async () => {
    const user = userEvent.setup();

    renderCategoriesPage();

    await screen.findByText("Receita recorrente");
    await user.selectOptions(screen.getByLabelText("Tipo"), "exit");
    await user.type(screen.getByLabelText("Buscar categoria"), "mark");

    expect(await screen.findByText("Marketing")).toBeInTheDocument();
    expect(screen.queryByText("Receita recorrente")).not.toBeInTheDocument();
  });

  it("valida unicidade do nome por tipo", async () => {
    const user = userEvent.setup();

    renderCategoriesPage();

    await user.click(await screen.findByRole("button", { name: /nova categoria/i }));
    const dialog = within(screen.getByRole("dialog"));

    await user.type(dialog.getByLabelText("Nome"), "Marketing");
    await user.selectOptions(dialog.getByLabelText("Tipo"), "exit");
    await user.click(dialog.getByRole("button", { name: /criar categoria/i }));

    expect(
      await screen.findByText("Já existe uma categoria com esse nome para o tipo selecionado.")
    ).toBeInTheDocument();
  });
});
