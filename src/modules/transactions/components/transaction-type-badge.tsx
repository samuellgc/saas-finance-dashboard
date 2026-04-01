import { transactionTypeBadgeCopy } from "@/modules/transactions/constants/transactions.constants";
import type { TransactionTypeBadgeProps } from "@/modules/transactions/types/transactions.types";
import { Box } from "@/shared/components/ui/box";
import { cn } from "@/shared/lib/utils";

export function TransactionTypeBadge({ type }: TransactionTypeBadgeProps) {
  const badge = transactionTypeBadgeCopy[type];

  return (
    <Box
      as="span"
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
        badge.className
      )}
    >
      {badge.label}
    </Box>
  );
}
