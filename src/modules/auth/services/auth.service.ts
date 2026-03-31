import { alovaInstance } from "@/shared/lib/alovaInstance";
import type { LoginFormData, LoginResponse } from "@/modules/auth/types/auth.types";

export const authService = {
  login: (data: LoginFormData) =>
    alovaInstance.Post<LoginResponse, LoginFormData>("/auth/login", data, {
      meta: {
        skipAuth: true,
        skipRedirectOnAuthError: true,
      },
    }),
};
