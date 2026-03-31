import type * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium outline-none transition ease-out duration-300 cursor-pointer disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
        outline: "border border-gray-4 text-gray-6 hover:border-gray-5 hover:text-gray-7",
        ghost: "bg-transparent",
      },
      size: {
        default: "h-10 w-full",
        fit: "w-fit h-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Componente `Button`
 *
 * Um botão estilizado reutilizável com variantes de estilo e tamanho.
 * Baseado no sistema de utilitários do ShadCN, `class-variance-authority` (CVA) e `Slot` da Radix UI.
 *
 * @param className - Classes CSS adicionais para estilização personalizada.
 * @param variant - Variante visual do botão. Valores disponíveis:
 *   - `"default"`: Botão com fundo primário e texto claro (padrão).
 *   - `"secondary"`: Fundo cinza com texto claro.
 *   - `"outline"`: Contorno cinza com texto escuro.
 *   - `"ghost"`: Transparente, sem fundo nem borda.
 * @param size - Tamanho do botão. Valores disponíveis:
 *   - `"default"`: Altura `h-10` e largura total `w-full` (padrão).
 *   - `"fit"`: Altura e largura ajustadas ao conteúdo.
 * @param asChild - Se verdadeiro, renderiza como componente filho via `Slot` (Radix), permitindo substituir a tag `button` por outra como `a`, `Link`, etc.
 * @param props - Outras propriedades herdadas de `React.ComponentProps<"button">`.
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
