import { Box } from "@/shared/components/ui/box";
import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";
import { DashboardSection } from "@/modules/dashboard/components/dashboard-section";
import type { DashboardChartPoint } from "@/modules/dashboard/types/dashboard.types";
import { formatCompactCurrency } from "@/modules/dashboard/utils/dashboard.utils";

type DashboardCashFlowChartProps = {
  points: DashboardChartPoint[];
  periodLabel: string;
  isLoading?: boolean;
};

function getBarHeight(value: number, maxValue: number) {
  if (value === 0) {
    return "0%";
  }

  return `${Math.max((value / maxValue) * 100, 10)}%`;
}

function DashboardCashFlowChartLegend() {
  return (
    <Stack
      direction="row"
      gap="4"
      className="flex-wrap"
      alignment="center"
    >
      <Typography
        variant="auxiliary"
        className="inline-flex items-center gap-2 font-medium text-gray-6"
      >
        <Box className="size-2.5 rounded-full bg-primary" />
        Entradas
      </Typography>
      <Typography
        variant="auxiliary"
        className="inline-flex items-center gap-2 font-medium text-gray-6"
      >
        <Box className="size-2.5 rounded-full bg-destructive" />
        Saídas
      </Typography>
    </Stack>
  );
}

function DashboardCashFlowChartSkeleton() {
  return (
    <Box className="overflow-hidden">
      <Stack
        direction="row"
        gap="4"
        className="overflow-hidden"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Stack
            key={`dashboard-chart-skeleton-${index + 1}`}
            gap="3"
            className="w-28 shrink-0"
          >
            <Skeleton className="h-52 w-full rounded-2xl" />
            <Skeleton className="h-4 w-14" />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export function DashboardCashFlowChart({ points, periodLabel, isLoading = false }: DashboardCashFlowChartProps) {
  if (isLoading) {
    return (
      <DashboardSection
        headingId="dashboard-cash-flow-chart-heading"
        title="Entradas vs saídas"
        description={<Skeleton className="h-4 w-72 max-w-full" />}
      >
        <DashboardCashFlowChartSkeleton />
      </DashboardSection>
    );
  }

  const maxValue = Math.max(1, ...points.flatMap(point => [point.entries, point.exits]));

  return (
    <DashboardSection
      headingId="dashboard-cash-flow-chart-heading"
      title="Entradas vs saídas"
      description={`Comparativo mensal das movimentações financeiras dentro de ${periodLabel.toLowerCase()}.`}
      aside={<DashboardCashFlowChartLegend />}
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
              key={point.label}
              className="w-28 shrink-0"
            >
              <Box className="flex h-56 items-end justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 light:border-black/10 light:bg-black/[0.03]">
                <Box className="flex h-full w-8 items-end rounded-full bg-primary/15">
                  <Box
                    className="w-full rounded-full bg-primary"
                    style={{ height: getBarHeight(point.entries, maxValue) }}
                  />
                </Box>

                <Box className="flex h-full w-8 items-end rounded-full bg-destructive/15">
                  <Box
                    className="w-full rounded-full bg-destructive"
                    style={{ height: getBarHeight(point.exits, maxValue) }}
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
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </DashboardSection>
  );
}
