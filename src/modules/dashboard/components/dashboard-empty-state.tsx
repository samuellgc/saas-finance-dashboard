import { Box } from "@/shared/components/ui/box";
import { FolderSearch } from "lucide-react";
import { Card } from "@/shared/components/shadcn/ui/card";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";

type DashboardEmptyStateProps = {
  periodLabel: string;
};

export function DashboardEmptyState({ periodLabel }: DashboardEmptyStateProps) {
  return (
    <Card className="border border-dashed border-white/10 bg-card/90 p-6 light:border-black/10">
      <Stack
        gap="4"
        className="sm:flex-row sm:items-start"
      >
        <Box className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <FolderSearch
            className="size-6"
            aria-hidden="true"
          />
        </Box>

        <Stack gap="2">
          <Box
            as="h3"
            className="text-lg font-semibold text-gray-7"
          >
            Nenhuma movimentação encontrada
          </Box>
          <Typography className="max-w-2xl font-normal leading-6 text-gray-6">
            Não há dados financeiros para {periodLabel.toLowerCase()}. Ajuste o período ou aguarde novos lançamentos
            para visualizar indicadores, categorias e movimentações recentes.
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
