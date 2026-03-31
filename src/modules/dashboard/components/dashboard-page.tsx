import { Card } from "@/shared/components/shadcn/ui/card";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";

export function DashboardPage() {
  return (
    <Stack
      as="section"
      justify="center"
      alignment="center"
      className="min-h-screen bg-background p-4"
    >
      <Card className="w-full max-w-2xl gap-3">
        <Typography variant="title">Dashboard</Typography>
        <Typography className="text-gray-6">
          Estrutura inicial pronta para receber os próximos módulos da aplicação.
        </Typography>
      </Card>
    </Stack>
  );
}
