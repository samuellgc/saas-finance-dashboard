"use client";

import { Button } from "@/shared/components/shadcn/ui/button";
import { Card } from "@/shared/components/shadcn/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/shared/components/shadcn/ui/form";
import { InputCpf } from "@/shared/components/ui/inputs/input-cpf";
import { InputPassword } from "@/shared/components/ui/inputs/input-password";
import { useLoginForm } from "@/modules/auth/hooks/use-login-form";

export function LoginForm() {
  const { form, onSubmit, loading } = useLoginForm();

  return (
    <Card className="h-115 w-full max-w-96 justify-center rounded-sm p-6 shadow-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="cpf"
            render={({ field, formState }) => (
              <FormItem>
                <FormControl>
                  <InputCpf
                    id="cpf"
                    name="cpf"
                    label="CPF"
                    placeholder="000.000.000-00"
                    value={field.value}
                    onChange={field.onChange}
                    hasError={!!formState.errors[field.name]}
                    helperText={{
                      text: formState.errors[field.name]?.message,
                      type: "error",
                      variant: "auxiliary",
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, formState }) => (
              <FormItem>
                <FormControl>
                  <InputPassword
                    id="password"
                    name="password"
                    label="Senha"
                    placeholder="Digite sua senha"
                    value={field.value}
                    onChange={field.onChange}
                    hasError={!!formState.errors[field.name]}
                    helperText={{
                      text: formState.errors[field.name]?.message,
                      type: "error",
                      variant: "auxiliary",
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
          >
            Entrar
          </Button>
        </form>
      </Form>
    </Card>
  );
}
