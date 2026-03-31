import { cashFlowChartSkeletonColumnCount } from "@/modules/cash-flow/constants/cash-flow.constants";
import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";

export function CashFlowChartSkeleton() {
  return (
    <Box className="overflow-hidden">
      <Stack
        direction="row"
        gap="4"
        className="overflow-hidden"
      >
        {Array.from({ length: cashFlowChartSkeletonColumnCount }).map((_, index) => (
          <Stack
            key={`cash-flow-chart-skeleton-${index + 1}`}
            gap="3"
            className="w-32 shrink-0"
          >
            <Skeleton className="h-56 w-full rounded-2xl" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-full rounded-xl" />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
