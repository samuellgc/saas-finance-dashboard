import { EditTransactionPage } from "@/modules/transactions";

type LancamentoDetalhePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LancamentoDetalhePage({ params }: LancamentoDetalhePageProps) {
  const { id } = await params;

  return <EditTransactionPage transactionId={id} />;
}
