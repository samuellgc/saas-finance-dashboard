import type { ReactNode } from "react";
import { AuthenticatedAreaShell } from "@/app/(app)/components/authenticated-area-shell";

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return <AuthenticatedAreaShell>{children}</AuthenticatedAreaShell>;
}
