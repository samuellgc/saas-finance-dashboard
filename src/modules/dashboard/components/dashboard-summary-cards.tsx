import { Box } from "@/shared/components/ui/box";
import { ArrowDownRight, ArrowUpRight, Landmark, ReceiptText } from "lucide-react";
import { Card } from "@/shared/components/shadcn/ui/card";
import { Grid } from "@/shared/components/ui/grid";
import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";
import { cn } from "@/shared/lib/utils";
import type { DashboardSummary } from "@/modules/dashboard/types/dashboard.types";
import { formatCurrency } from "@/modules/dashboard/utils/dashboard.utils";

type DashboardSummaryCardsProps = {
  summary: DashboardSummary;
  isLoading?: boolean;
};

const summaryCardConfig = [
  {
    key: "totalEntries",
    label: "Total de entradas",
    toneClassName: "text-primary",
    icon: ArrowUpRight,
    helper: "Receitas confirmadas no período.",
  },
  {
    key: "totalExits",
    label: "Total de saídas",
    toneClassName: "text-destructive",
    icon: ArrowDownRight,
    helper: "Despesas e pagamentos processados.",
  },
  {
    key: "balance",
    label: "Saldo",
    toneClassName: "text-gray-7",
    icon: Landmark,
    helper: "Resultado líquido entre entradas e saídas.",
  },
  {
    key: "transactionCount",
    label: "Quantidade de lançamentos",
    toneClassName: "text-gray-7",
    icon: ReceiptText,
    helper: "Movimentações financeiras contabilizadas.",
  },
] as const;

export function DashboardSummaryCards({ summary, isLoading = false }: DashboardSummaryCardsProps) {
  return (
    <Grid
      as="section"
      cols="1"
      gap="4"
      aria-label="Indicadores do painel"
      className="md:grid-cols-2 xl:grid-cols-4"
    >
      {summaryCardConfig.map(card => {
        const Icon = card.icon;

        return (
          <Card
            key={card.key}
            className="border border-white/10 bg-card/90 p-5 light:border-black/10"
          >
            {isLoading ? (
              <Stack gap="4">
                <Box className="flex items-center justify-between gap-3">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="size-10 rounded-full" />
                </Box>
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-40" />
              </Stack>
            ) : (
              <Stack gap="4">
                <Box className="flex items-start justify-between gap-3">
                  <Stack gap="1">
                    <Typography className="font-medium text-gray-6">{card.label}</Typography>
                    <Typography
                      variant="auxiliary"
                      className="font-normal leading-5 text-gray-5"
                    >
                      {card.helper}
                    </Typography>
                  </Stack>

                  <Box
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 light:border-black/10 light:bg-black/5",
                      card.toneClassName
                    )}
                  >
                    <Icon
                      className="size-5"
                      aria-hidden="true"
                    />
                  </Box>
                </Box>

                <Box
                  as="p"
                  className="text-2xl font-bold tracking-tight text-gray-7 sm:text-[2rem]"
                >
                  {card.key === "transactionCount"
                    ? summary.transactionCount.toString()
                    : formatCurrency(summary[card.key])}
                </Box>
              </Stack>
            )}
          </Card>
        );
      })}
    </Grid>
  );
}
