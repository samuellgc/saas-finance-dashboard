import type { z } from "zod";
import type { loginSchema } from "@/modules/auth/schemas/login.schema";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  document: string;
  phone: string;
};

export type LoginFormData = z.infer<typeof loginSchema>;

export interface LoginResponse {
  data: AuthUser;
}
