import { Box } from "@/shared/components/ui/box";
import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";
import { DashboardSection } from "@/modules/dashboard/components/dashboard-section";
import { cn } from "@/shared/lib/utils";
import type { DashboardCategorySummaryItem } from "@/modules/dashboard/types/dashboard.types";
import { formatCurrency } from "@/modules/dashboard/utils/dashboard.utils";

type DashboardCategorySummaryProps = {
  items: DashboardCategorySummaryItem[];
  isLoading?: boolean;
};

export function DashboardCategorySummary({ items, isLoading = false }: DashboardCategorySummaryProps) {
  return (
    <DashboardSection
      headingId="dashboard-category-summary-heading"
      title="Resumo por categoria"
      description="Distribuição das movimentações com base no volume financeiro consolidado do período."
    >
      {isLoading ? (
        <Stack gap="4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Stack
              key={`dashboard-category-skeleton-${index + 1}`}
              gap="3"
            >
              <Box className="flex items-center justify-between gap-4">
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-4 w-20" />
              </Box>
              <Skeleton className="h-2 w-full rounded-full" />
            </Stack>
          ))}
        </Stack>
      ) : (
        <Stack
          as="ul"
          gap="5"
        >
          {items.map(item => (
            <Stack
              as="li"
              key={item.id}
              gap="3"
            >
              <Stack
                gap="3"
                className="sm:flex-row sm:items-start sm:justify-between"
              >
                <Stack gap="2">
                  <Box className="flex flex-wrap items-center gap-2">
                    <Typography className="font-semibold text-gray-7">{item.category}</Typography>
                    <Box
                      as="span"
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
                        item.type === "entry" ? "bg-primary/15 text-primary" : "bg-destructive/12 text-destructive"
                      )}
                    >
                      {item.type === "entry" ? "Entrada" : "Saída"}
                    </Box>
                  </Box>

                  <Typography
                    variant="auxiliary"
                    className="font-normal leading-5 text-gray-5"
                  >
                    {item.transactionCount} {item.transactionCount === 1 ? "movimentação" : "movimentações"} no período
                  </Typography>
                </Stack>

                <Box className="text-left sm:text-right">
                  <Typography className="font-semibold text-gray-7">{formatCurrency(item.amount)}</Typography>
                  <Typography
                    variant="auxiliary"
                    className="font-normal text-gray-5"
                  >
                    {item.share.toFixed(0)}% do volume
                  </Typography>
                </Box>
              </Stack>

              <Box className="h-2 rounded-full bg-white/6 light:bg-black/8">
                <Box
                  className={cn("h-full rounded-full", item.type === "entry" ? "bg-primary" : "bg-destructive")}
                  style={{ width: `${Math.max(item.share, 6)}%` }}
                />
              </Box>
            </Stack>
          ))}
        </Stack>
      )}
    </DashboardSection>
  );
}
