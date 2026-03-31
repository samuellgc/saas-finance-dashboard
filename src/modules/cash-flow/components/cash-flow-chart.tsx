import { CashFlowSection } from "@/modules/cash-flow/components/cash-flow-section";
import { CashFlowChartLegend } from "@/modules/cash-flow/components/cash-flow-chart-legend";
import { CashFlowChartSkeleton } from "@/modules/cash-flow/components/cash-flow-chart-skeleton";
import type { CashFlowChartProps } from "@/modules/cash-flow/types/cash-flow.types";
import { formatCompactCurrency, formatCurrency, getCashFlowBarHeight } from "@/modules/cash-flow/utils/cash-flow.utils";
import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";
import { cn } from "@/shared/lib/utils";

export function CashFlowChart({ points, periodLabel, isLoading = false }: CashFlowChartProps) {
  if (isLoading) {
    return (
      <CashFlowSection
        headingId="cash-flow-chart-heading"
        title="Gráfico principal"
        description={<Skeleton className="h-4 w-80 max-w-full" />}
      >
        <CashFlowChartSkeleton />
      </CashFlowSection>
    );
  }

  const maxValue = Math.max(
    1,
    ...points.flatMap(point => [point.entries, point.exits, Math.abs(point.accumulatedBalance), Math.abs(point.net)])
  );

  return (
    <CashFlowSection
      headingId="cash-flow-chart-heading"
      title="Gráfico principal"
      description={`Comparativo cronológico de entradas, saídas e saldo acumulado dentro de ${periodLabel.toLowerCase()}.`}
      aside={<CashFlowChartLegend />}
    >
      <Box className="overflow-x-auto">
        <Stack
          direction="row"
          gap="4"
          className="min-w-max pb-2"
        >
          {points.map(point => (
            <Box
              as="article"
              key={point.id}
              className="w-32 shrink-0"
            >
              <Box className="flex h-56 items-end justify-center gap-2 rounded-2xl border border-white/10 bg-white/3 p-4 light:border-black/10 light:bg-black/3">
                <Box className="flex h-full w-8 items-end rounded-full bg-primary/15">
                  <Box
                    className="w-full rounded-full bg-primary"
                    style={{ height: getCashFlowBarHeight(point.entries, maxValue) }}
                  />
                </Box>

                <Box className="flex h-full w-8 items-end rounded-full bg-destructive/15">
                  <Box
                    className="w-full rounded-full bg-destructive"
                    style={{ height: getCashFlowBarHeight(point.exits, maxValue) }}
                  />
                </Box>
              </Box>

              <Stack
                gap="2"
                className="mt-3"
              >
                <Typography className="text-center font-semibold text-gray-7">{point.label}</Typography>

                <Box
                  as="dl"
                  className="space-y-1 text-xs text-gray-6"
                >
                  <Box className="flex items-center justify-between gap-3">
                    <Box as="dt">Entradas</Box>
                    <Box as="dd">{formatCompactCurrency(point.entries)}</Box>
                  </Box>
                  <Box className="flex items-center justify-between gap-3">
                    <Box as="dt">Saídas</Box>
                    <Box as="dd">{formatCompactCurrency(point.exits)}</Box>
                  </Box>
                </Box>

                <Box
                  className={cn(
                    "rounded-xl px-3 py-2 text-center",
                    point.accumulatedBalance < 0 ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                  )}
                >
                  <Typography
                    variant="auxiliary"
                    className="font-semibold uppercase tracking-[0.16em]"
                  >
                    Saldo acumulado
                  </Typography>
                  <Typography className="mt-1 font-semibold">{formatCurrency(point.accumulatedBalance)}</Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </CashFlowSection>
  );
}
