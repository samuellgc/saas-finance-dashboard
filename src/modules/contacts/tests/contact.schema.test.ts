import { contactSchema } from "@/modules/contacts/schemas/contact.schema";

describe("contactSchema", () => {
  it("aceita um contato válido", () => {
    const result = contactSchema.safeParse({
      name: "Banco Horizonte",
      document: "12.345.678/0001-12",
      email: "relacionamento@horizonte.com.br",
      phone: "(85) 3333-1200",
      notes: "Contato principal.",
      status: "active",
    });

    expect(result.success).toBe(true);
  });

  it("rejeita nome vazio", () => {
    const result = contactSchema.safeParse({
      name: "",
      document: "",
      email: "",
      phone: "",
      notes: "",
      status: "active",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Informe o nome do contato.");
  });

  it("rejeita e-mail inválido quando preenchido", () => {
    const result = contactSchema.safeParse({
      name: "Contato inválido",
      document: "",
      email: "email-invalido",
      phone: "",
      notes: "",
      status: "active",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Informe um e-mail válido.");
  });
});
