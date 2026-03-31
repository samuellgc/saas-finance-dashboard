import { SearchSlash } from "lucide-react";
import type { CashFlowEmptyStateProps } from "@/modules/cash-flow/types/cash-flow.types";
import { Card } from "@/shared/components/shadcn/ui/card";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";

export function CashFlowEmptyState({ periodLabel }: CashFlowEmptyStateProps) {
  return (
    <Card className="border border-dashed border-white/10 bg-card/90 p-6 light:border-black/10">
      <Stack
        gap="4"
        className="sm:flex-row sm:items-start"
      >
        <Box className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <SearchSlash
            className="size-6"
            aria-hidden="true"
          />
        </Box>

        <Stack gap="2">
          <Box
            as="h3"
            className="text-lg font-semibold text-gray-7"
          >
            Nenhum dado encontrado para o fluxo selecionado
          </Box>
          <Typography className="max-w-2xl font-normal leading-6 text-gray-6">
            Não há movimentações para {periodLabel.toLowerCase()} com os filtros atuais. Ajuste período, tipo, categoria
            ou contato para reconstruir a linha do tempo do caixa.
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
