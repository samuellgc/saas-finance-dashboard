import { Box } from "@/shared/components/ui/box";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";
import { DashboardSection } from "@/modules/dashboard/components/dashboard-section";
import { cn } from "@/shared/lib/utils";
import type { DashboardTransaction } from "@/modules/dashboard/types/dashboard.types";
import { formatSignedCurrency, formatTransactionDate } from "@/modules/dashboard/utils/dashboard.utils";

type DashboardRecentTransactionsProps = {
  transactions: DashboardTransaction[];
  isLoading?: boolean;
};

export function DashboardRecentTransactions({ transactions, isLoading = false }: DashboardRecentTransactionsProps) {
  return (
    <DashboardSection
      headingId="dashboard-recent-transactions-heading"
      title="Últimas movimentações"
      description="Registros mais recentes para acompanhamento rápido do fluxo financeiro."
      aside={
        !isLoading ? (
          <Typography className="font-medium text-gray-5">{transactions.length} itens exibidos</Typography>
        ) : null
      }
    >
      {isLoading ? (
        <Stack gap="4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Box
              key={`dashboard-transaction-skeleton-${index + 1}`}
              className="rounded-2xl border border-white/10 p-4 light:border-black/10"
            >
              <Stack
                gap="3"
                className="md:flex-row md:items-center md:justify-between"
              >
                <Stack gap="2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-72 max-w-full" />
                </Stack>
                <Stack gap="2">
                  <Skeleton className="ml-auto h-5 w-24" />
                  <Skeleton className="ml-auto h-4 w-18" />
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      ) : (
        <Stack
          as="ul"
          gap="4"
        >
          {transactions.map(transaction => {
            const isEntry = transaction.type === "entry";
            const TransactionIcon = isEntry ? ArrowUpRight : ArrowDownRight;

            return (
              <Box
                as="li"
                key={transaction.id}
                className="rounded-2xl border border-white/10 bg-white/2 p-4 light:border-black/10 light:bg-black/2"
              >
                <Stack
                  gap="4"
                  className="md:flex-row md:items-center md:justify-between"
                >
                  <Stack gap="2">
                    <Box className="flex items-start gap-3">
                      <Box
                        className={cn(
                          "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full",
                          isEntry ? "bg-primary/15 text-primary" : "bg-destructive/12 text-destructive"
                        )}
                      >
                        <TransactionIcon
                          className="size-5"
                          aria-hidden="true"
                        />
                      </Box>

                      <Stack gap="1">
                        <Typography className="font-semibold text-gray-7">{transaction.description}</Typography>
                        <Typography className="font-normal text-gray-6">
                          {transaction.category} • {transaction.contact} •{" "}
                          {formatTransactionDate(transaction.occurredAt)}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>

                  <Box className="text-left md:text-right">
                    <Typography
                      className={cn("text-base font-semibold", isEntry ? "text-primary" : "text-destructive")}
                    >
                      {formatSignedCurrency(transaction.amount, transaction.type)}
                    </Typography>
                    <Typography
                      variant="auxiliary"
                      className="font-normal uppercase tracking-[0.16em] text-gray-5"
                    >
                      {isEntry ? "Entrada" : "Saída"}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      )}
    </DashboardSection>
  );
}
