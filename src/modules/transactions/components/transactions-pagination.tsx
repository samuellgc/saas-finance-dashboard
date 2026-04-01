import type { TransactionsPaginationProps } from "@/modules/transactions/types/transactions.types";
import { getTransactionsPaginationPages } from "@/modules/transactions/utils/transactions.utils";
import { Button } from "@/shared/components/shadcn/ui/button";
import { Card } from "@/shared/components/shadcn/ui/card";
import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";

export function TransactionsPagination({ pagination, isLoading = false, onPageChange }: TransactionsPaginationProps) {
  if (isLoading) {
    return (
      <Card className="border border-white/10 bg-card/90 p-4 light:border-black/10">
        <Stack
          gap="4"
          className="sm:flex-row sm:items-center sm:justify-between"
        >
          <Skeleton className="h-4 w-44" />
          <Stack
            direction="row"
            gap="2"
          >
            <Skeleton className="h-10 w-24 rounded-xl" />
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-10 w-24 rounded-xl" />
          </Stack>
        </Stack>
      </Card>
    );
  }

  const pageNumbers = getTransactionsPaginationPages(pagination.totalPages);

  return (
    <Card className="border border-white/10 bg-card/90 p-4 light:border-black/10">
      <Box
        as="nav"
        aria-label="Paginação de lançamentos"
      >
        <Stack
          gap="4"
          className="sm:flex-row sm:items-center sm:justify-between"
        >
          <Box className="text-sm text-gray-6">
            Mostrando {pagination.startItem} a {pagination.endItem} de {pagination.totalItems} lançamentos
          </Box>

          <Stack
            direction="row"
            gap="2"
            className="flex-wrap"
          >
            <Button
              type="button"
              size="fit"
              variant="outline"
              disabled={!pagination.hasPreviousPage}
              onClick={() => onPageChange(pagination.currentPage - 1)}
              className="min-h-10 rounded-xl px-4 py-2"
            >
              Anterior
            </Button>

            {pageNumbers.map(pageNumber => (
              <Button
                key={pageNumber}
                type="button"
                size="fit"
                variant={pageNumber === pagination.currentPage ? "default" : "outline"}
                aria-current={pageNumber === pagination.currentPage ? "page" : undefined}
                onClick={() => onPageChange(pageNumber)}
                className="min-h-10 min-w-10 rounded-xl px-3 py-2"
              >
                {pageNumber}
              </Button>
            ))}

            <Button
              type="button"
              size="fit"
              variant="outline"
              disabled={!pagination.hasNextPage}
              onClick={() => onPageChange(pagination.currentPage + 1)}
              className="min-h-10 rounded-xl px-4 py-2"
            >
              Próxima
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
