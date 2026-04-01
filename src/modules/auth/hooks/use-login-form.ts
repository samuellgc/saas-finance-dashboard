"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Erro ao realizar login";
}

export function useLoginForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { toastError } = useCustomToast();
  const [loading, setLoading] = useState(false);

  const form = useCustomForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      cpf: "",
      password: "",
    },
  });

  const onSubmit = async (body: LoginFormData) => {
    setLoading(true);

    try {
      const result = await authService.login(body);

      dispatch(setUser(result.data));
      router.push("/painel");
    } catch (error) {
      toastError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return { form, onSubmit, loading };
}
