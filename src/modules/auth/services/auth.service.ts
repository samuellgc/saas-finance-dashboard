import type { LoginFormData, LoginResponse } from "@/modules/auth/types/auth.types";
import { delay } from "@/shared/utils/async";

const mockUser: LoginResponse["data"] = {
  id: "user-demo-01",
  name: "Usuário Demo",
  email: "demo@saas.com",
  document: "000.000.000-00",
  phone: "(00) 00000-0000",
};

export const authService = {
  login: async (_data: LoginFormData): Promise<LoginResponse> => {
    await delay(600);
    return { data: mockUser };
  },
};
