import { ReceiptText, SearchX } from "lucide-react";
import type { TransactionsEmptyStateProps } from "@/modules/transactions/types/transactions.types";
import { getTransactionsEmptyStateCopy } from "@/modules/transactions/utils/transactions.utils";
import { Card } from "@/shared/components/shadcn/ui/card";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";

export function TransactionsEmptyState({ variant, periodLabel, query }: TransactionsEmptyStateProps) {
  const copy = getTransactionsEmptyStateCopy(variant, periodLabel, query);
  const Icon = variant === "empty" ? ReceiptText : SearchX;

  return (
    <Card className="border border-dashed border-white/10 bg-card/90 p-6 light:border-black/10">
      <Stack
        gap="4"
        className="sm:flex-row sm:items-start"
      >
        <Box className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <Icon
            className="size-6"
            aria-hidden="true"
          />
        </Box>

        <Stack gap="2">
          <Box
            as="h3"
            className="text-lg font-semibold text-gray-7"
          >
            {copy.title}
          </Box>
          <Typography className="max-w-2xl font-normal leading-6 text-gray-6">{copy.description}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
