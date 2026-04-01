import { TransactionsSection } from "@/modules/transactions/components/transactions-section";
import { TransactionTypeBadge } from "@/modules/transactions/components/transaction-type-badge";
import type { TransactionsTableProps } from "@/modules/transactions/types/transactions.types";
import { formatTransactionsCurrency, formatTransactionsDate } from "@/modules/transactions/utils/transactions.utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/shadcn/ui/table";
import { TableSkeleton } from "@/shared/components/ui/table-skeleton";
import { cn } from "@/shared/lib/utils";

export function TransactionsTable({ items, isLoading = false }: TransactionsTableProps) {
  return (
    <TransactionsSection
      headingId="transactions-table-heading"
      title="Tabela"
      description="Lista consolidada dos lançamentos após a aplicação dos filtros ativos."
    >
      {isLoading ? (
        <TableSkeleton
          rows={5}
          cols={6}
        />
      ) : (
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Data</TableHead>
              <TableHead className="text-left">Descrição</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-left">Categoria</TableHead>
              <TableHead className="text-left">Contato</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                <TableCell className="text-left text-gray-6">{formatTransactionsDate(item.occurredAt)}</TableCell>
                <TableCell className="text-left font-semibold">{item.description}</TableCell>
                <TableCell>
                  <TransactionTypeBadge type={item.type} />
                </TableCell>
                <TableCell className="text-left text-gray-6">{item.category}</TableCell>
                <TableCell className="text-left text-gray-6">{item.contact}</TableCell>
                <TableCell
                  className={cn(
                    "text-right font-semibold",
                    item.type === "entry" ? "text-primary" : "text-destructive"
                  )}
                >
                  {formatTransactionsCurrency(item.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TransactionsSection>
  );
}
