import { cashFlowSummaryCardsConfig } from "@/modules/cash-flow/constants/cash-flow.constants";
import type { CashFlowSummaryCardsProps } from "@/modules/cash-flow/types/cash-flow.types";
import { formatCurrency } from "@/modules/cash-flow/utils/cash-flow.utils";
import { Card } from "@/shared/components/shadcn/ui/card";
import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import { Box } from "@/shared/components/ui/box";
import { Grid } from "@/shared/components/ui/grid";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";
import { cn } from "@/shared/lib/utils";

export function CashFlowSummaryCards({ summary, isLoading = false }: CashFlowSummaryCardsProps) {
  return (
    <Grid
      as="section"
      cols="1"
      gap="4"
      aria-label="Indicadores do fluxo de caixa"
      className="lg:grid-cols-3"
    >
      {cashFlowSummaryCardsConfig.map(card => {
        const Icon = card.icon;
        const isNegativeBalance = card.key === "accumulatedBalance" && summary.accumulatedBalance < 0;

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
                <Skeleton className="h-4 w-44" />
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
                      card.key === "accumulatedBalance" && isNegativeBalance ? "text-destructive" : card.toneClassName
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
                  className={cn(
                    "text-2xl font-bold tracking-tight sm:text-[2rem]",
                    card.key === "accumulatedBalance" && isNegativeBalance ? "text-destructive" : "text-gray-7"
                  )}
                >
                  {formatCurrency(summary[card.key])}
                </Box>
              </Stack>
            )}
          </Card>
        );
      })}
    </Grid>
  );
}
