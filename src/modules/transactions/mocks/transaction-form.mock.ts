import type { TransactionType, TransactionsSelectOption } from "@/modules/transactions/types/transactions.types";

export const transactionFormCategoriesByTypeMock: Record<TransactionType, TransactionsSelectOption[]> = {
  entry: [
    { value: "Receita recorrente", label: "Receita recorrente" },
    { value: "Projetos", label: "Projetos" },
    { value: "Serviços", label: "Serviços" },
    { value: "Eventos", label: "Eventos" },
    { value: "Reembolsos", label: "Reembolsos" },
  ],
  exit: [
    { value: "Marketing", label: "Marketing" },
    { value: "Software", label: "Software" },
    { value: "Pessoal", label: "Pessoal" },
    { value: "Operação", label: "Operação" },
    { value: "Impostos", label: "Impostos" },
  ],
};

export const transactionFormContactOptionsMock: TransactionsSelectOption[] = [
  { value: "Acme Corp", label: "Acme Corp" },
  { value: "Atlas Group", label: "Atlas Group" },
  { value: "Aurora SA", label: "Aurora SA" },
  { value: "Comunidade CFO", label: "Comunidade CFO" },
  { value: "Contfy", label: "Contfy" },
  { value: "Equipe Comercial", label: "Equipe Comercial" },
  { value: "Hub Central", label: "Hub Central" },
  { value: "Media Labs", label: "Media Labs" },
  { value: "Orion Ltda", label: "Orion Ltda" },
];
