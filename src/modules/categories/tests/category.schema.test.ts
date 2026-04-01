import { categorySchema } from "@/modules/categories/schemas/category.schema";

const validCategory = {
  name: "Serviços",
  type: "entry" as const,
  color: "#2563EB",
  icon: "briefcase" as const,
  status: "active" as const,
};

describe("category.schema", () => {
  it("aceita uma categoria válida", () => {
    const result = categorySchema.safeParse(validCategory);

    expect(result.success).toBe(true);
  });

  it("rejeita nome vazio", () => {
    const result = categorySchema.safeParse({
      ...validCategory,
      name: "",
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.name).toContain("Nome é obrigatório");
  });

  it("rejeita cor fora do padrão hexadecimal", () => {
    const result = categorySchema.safeParse({
      ...validCategory,
      color: "azul",
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.color).toContain(
      "Cor deve estar no formato hexadecimal, por exemplo #2563EB"
    );
  });
});
