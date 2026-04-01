import { Plus } from "lucide-react";
import type { TransactionsToolbarProps } from "@/modules/transactions/types/transactions.types";
import { getTransactionsCountLabel } from "@/modules/transactions/utils/transactions.utils";
import { Button } from "@/shared/components/shadcn/ui/button";
import { Card } from "@/shared/components/shadcn/ui/card";
import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";

export function TransactionsToolbar({
  totalItems,
  filteredItems,
  periodLabel,
  isLoading = false,
}: TransactionsToolbarProps) {
  return (
    <Card className="border border-white/10 bg-card/90 p-4 light:border-black/10">
      {isLoading ? (
        <Stack
          gap="4"
          className="lg:flex-row lg:items-center lg:justify-between"
        >
          <Stack gap="2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-56" />
          </Stack>

          <Stack
            direction="row"
            gap="3"
            className="flex-wrap"
          >
            <Skeleton className="h-10 w-36 rounded-xl" />
            <Skeleton className="h-10 w-40 rounded-xl" />
          </Stack>
        </Stack>
      ) : (
        <Stack
          gap="4"
          className="lg:flex-row lg:items-center lg:justify-between"
        >
          <Stack gap="1">
            <Typography className="font-semibold text-gray-7">
              {getTransactionsCountLabel(totalItems, filteredItems)}
            </Typography>
            <Typography
              variant="auxiliary"
              className="font-normal tracking-normal text-gray-5"
            >
              Período ativo: {periodLabel}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            gap="3"
            className="flex-wrap items-center"
          >
            <Box className="inline-flex min-h-10 items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-6 light:border-black/10 light:bg-black/5">
              Janela ativa: {periodLabel}
            </Box>

            <Button
              type="button"
              size="fit"
              disabled
              className="min-h-10 rounded-xl px-4 py-2"
            >
              <Plus
                className="size-4"
                aria-hidden="true"
              />
              Novo lançamento
            </Button>
          </Stack>
        </Stack>
      )}
    </Card>
  );
}
