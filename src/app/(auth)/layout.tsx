import type { Metadata } from "next";
import { Stack } from "@/shared/components/ui/stack";

export const metadata: Metadata = {
  title: "Login | SaaS Finance Dashboard",
  description: "Acesso ao SaaS Finance Dashboard.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack
      as="section"
      justify="center"
      alignment="center"
      className="min-h-screen bg-background-secondary p-4"
    >
      {children}
    </Stack>
  );
}
