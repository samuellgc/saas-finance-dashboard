import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

type PageContainerProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function PageContainer<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: PageContainerProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className={cn("mx-auto w-full max-w-384 px-4 py-6 sm:px-6 sm:py-8 lg:px-8", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
