import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { vi } from "vitest";
import { LoginForm } from "@/modules/auth/components/login-form";

const mockOnSubmit = vi.fn();

vi.mock("@/modules/auth/hooks/use-login-form", () => ({
  useLoginForm: () => ({
    form: useForm({
      defaultValues: {
        cpf: "",
        password: "",
      },
    }),
    onSubmit: mockOnSubmit,
    loading: false,
  }),
}));

describe("<LoginForm />", () => {
  it("renderiza os campos do formulário e o botão de envio", () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText("000.000.000-00")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite sua senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });
});
