import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome do contato."),
  document: z.union([z.literal(""), z.string().trim().max(32, "Limite de 32 caracteres.")]),
  email: z.union([z.literal(""), z.string().trim().email("Informe um e-mail válido.")]),
  phone: z.union([z.literal(""), z.string().trim().max(20, "Limite de 20 caracteres.")]),
  notes: z.union([z.literal(""), z.string().trim().max(240, "Limite de 240 caracteres.")]),
  status: z.enum(["active", "inactive"]),
});
