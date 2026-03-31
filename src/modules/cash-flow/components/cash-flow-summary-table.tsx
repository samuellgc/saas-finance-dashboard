import type { CashFlowSummaryTableProps } from "@/modules/cash-flow/types/cash-flow.types";
import { formatCurrency } from "@/modules/cash-flow/utils/cash-flow.utils";
import { CashFlowSection } from "@/modules/cash-flow/components/cash-flow-section";
import { TableSkeleton } from "@/shared/components/ui/table-skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/shadcn/ui/table";
import { cn } from "@/shared/lib/utils";

export function CashFlowSummaryTable({ rows, isLoading = false }: CashFlowSummaryTableProps) {
  return (
    <CashFlowSection
      headingId="cash-flow-summary-table-heading"
      title="Resumo por período"
      description="Consolidação mensal do fluxo em ordem cronológica, incluindo resultado e saldo acumulado."
    >
      {isLoading ? (
        <TableSkeleton
          rows={6}
          cols={5}
        />
      ) : (
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Período</TableHead>
              <TableHead>Entradas</TableHead>
              <TableHead>Saídas</TableHead>
              <TableHead>Resultado</TableHead>
              <TableHead>Saldo acumulado</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell className="text-left font-semibold">{row.label}</TableCell>
                <TableCell className="text-primary">{formatCurrency(row.entries)}</TableCell>
                <TableCell className="text-destructive">{formatCurrency(row.exits)}</TableCell>
                <TableCell className={cn(row.net < 0 ? "text-destructive" : "text-primary")}>
                  {formatCurrency(row.net)}
                </TableCell>
                <TableCell className={cn(row.accumulatedBalance < 0 ? "text-destructive" : "text-gray-7")}>
                  {formatCurrency(row.accumulatedBalance)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </CashFlowSection>
  );
}
