import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  type: z.enum(["entry", "exit"], { message: "Selecione o tipo da categoria" }),
  color: z
    .string()
    .trim()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Cor deve estar no formato hexadecimal, por exemplo #2563EB"),
  icon: z.enum(["banknote", "briefcase", "landmark", "megaphone", "receipt", "wallet"], {
    message: "Selecione um ícone",
  }),
  status: z.enum(["active", "inactive"], { message: "Selecione o status" }),
});
