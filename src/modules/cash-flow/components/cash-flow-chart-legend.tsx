import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";

export function CashFlowChartLegend() {
  return (
    <Stack
      direction="row"
      gap="4"
      className="flex-wrap"
      alignment="center"
    >
      <Typography
        variant="auxiliary"
        className="inline-flex items-center gap-2 font-medium text-gray-6"
      >
        <Box className="size-2.5 rounded-full bg-primary" />
        Entradas
      </Typography>
      <Typography
        variant="auxiliary"
        className="inline-flex items-center gap-2 font-medium text-gray-6"
      >
        <Box className="size-2.5 rounded-full bg-destructive" />
        Saídas
      </Typography>
      <Typography
        variant="auxiliary"
        className="inline-flex items-center gap-2 font-medium text-gray-6"
      >
        <Box className="size-2.5 rounded-full bg-gray-5" />
        Saldo acumulado
      </Typography>
    </Stack>
  );
}
