"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRequest } from "alova/client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useCustomForm } from "@/shared/hooks/useCustomForm";
import { useCustomToast } from "@/shared/hooks/useCustomToast";
import type { AppDispatch } from "@/shared/store";
import { loginSchema } from "@/modules/auth/schemas/login.schema";
import { authService } from "@/modules/auth/services/auth.service";
import { setUser } from "@/modules/auth/store/auth.slice";
import type { LoginFormData } from "@/modules/auth/types/auth.types";

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null) {
    if (
      "data" in error &&
      typeof error.data === "object" &&
      error.data !== null &&
      "message" in error.data &&
      typeof error.data.message === "string"
    ) {
      return error.data.message;
    }

    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
  }

  return "Erro ao realizar login";
}

export function useLoginForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { toastError } = useCustomToast();
  const { send, loading } = useRequest(authService.login, {
    immediate: false,
  });

  const form = useCustomForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      cpf: "",
      password: "",
    },
  });

  const onSubmit = async (body: LoginFormData) => {
    try {
      const result = await send(body);

      if (result.data) {
        dispatch(setUser(result.data));
        router.push("/dashboard");
      }
    } catch (error) {
      toastError(getErrorMessage(error));
    }
  };

  return { form, onSubmit, loading };
}
