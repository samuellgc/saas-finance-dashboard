import { ArrowRightLeft, LayoutDashboard, Tags, UsersRound, WalletCards, WalletMinimal } from "lucide-react";
import type {
  AppShellBrand,
  AppShellNavigationItem,
  AppShellRouteMetadata,
  AppShellSidebarNote,
} from "@/shared/components/layout/app-shell.types";
import { isRouteActive } from "@/shared/lib/route-matching";

export const authenticatedAreaBrand: AppShellBrand = {
  title: "SaaS Finance",
  subtitle: "Controle financeiro",
  icon: WalletMinimal,
};

export const authenticatedAreaSidebarNote: AppShellSidebarNote = {
  title: "Estrutura base",
  description: "Layout autenticado preparado para cards, tabelas, filtros e formulários.",
};

export const authenticatedAreaNavigation: AppShellNavigationItem[] = [
  {
    href: "/painel",
    label: "Painel",
    description: "Visão geral do desempenho financeiro.",
    icon: LayoutDashboard,
  },
  {
    href: "/fluxo-de-caixa",
    label: "Fluxo de Caixa",
    description: "Entradas, saídas e saldo consolidado.",
    icon: WalletCards,
  },
  {
    href: "/lancamentos",
    label: "Lançamentos",
    description: "Movimentações financeiras do dia a dia.",
    icon: ArrowRightLeft,
  },
  {
    href: "/categorias",
    label: "Categorias",
    description: "Classificações para análise e organização.",
    icon: Tags,
  },
  {
    href: "/contatos",
    label: "Contatos",
    description: "Pessoas e empresas relacionadas ao financeiro.",
    icon: UsersRound,
  },
];

const authenticatedAreaFallbackRoute: AppShellRouteMetadata = {
  label: "Aplicação",
  description: "Área principal autenticada do sistema financeiro.",
};

export function getAuthenticatedRouteMetadata(pathname: string) {
  const currentItem = authenticatedAreaNavigation.find(item => isRouteActive(pathname, item.href));

  if (currentItem) {
    return {
      label: currentItem.label,
      description: currentItem.description,
    } satisfies AppShellRouteMetadata;
  }

  return authenticatedAreaFallbackRoute;
}
