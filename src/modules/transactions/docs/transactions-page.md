# Lançamentos

## Objetivo

O módulo `transactions` concentra a leitura e a criação de lançamentos financeiros nas rotas `/lancamentos` e `/lancamentos/novo`.

O foco desta etapa é:

- listar lançamentos com paginação
- combinar filtros por período, tipo, categoria, contato e descrição
- tratar estados de loading, vazio e sem resultados
- criar novos lançamentos com formulário validado
- preparar a estrutura para futura edição sem duplicar regras de formulário

## Estrutura

O módulo foi organizado assim:

```txt
src/modules/transactions/
  components/
    new-transaction-page.tsx
    transaction-form-select-field.tsx
    transaction-form.tsx
    transaction-type-badge.tsx
    transactions-empty-state.tsx
    transactions-filters.tsx
    transactions-page.tsx
    transactions-pagination.tsx
    transactions-section.tsx
    transactions-select-field.tsx
    transactions-table.tsx
    transactions-toolbar.tsx
  constants/
    transactions.constants.ts
  docs/
    transactions-page.md
  hooks/
    use-transaction-form.ts
    use-transactions-listing.ts
  mocks/
    transaction-form.mock.ts
    transactions.mock.ts
  schemas/
    transaction.schema.ts
  services/
    transaction-form.service.ts
    transactions.service.ts
  tests/
    new-transaction-page.test.tsx
    transaction.schema.test.ts
    transactions-page.test.tsx
    transactions.utils.test.ts
  types/
    transactions.types.ts
  utils/
    transaction-form.utils.ts
    transactions.utils.ts
  index.ts
```

## Como a listagem funciona

- `src/app/(app)/lancamentos/page.tsx` continua apenas orquestrando a rota com `TransactionsPage`.
- `TransactionsPage` compõe header, toolbar, filtros, tabela, paginação e estados.
- `useTransactionsListing` controla filtros, paginação, carregamento e derivados de tela.
- `transactions.service.ts` expõe o catálogo de filtros e a listagem mockada do módulo.
- `transactions.utils.ts` concentra filtragem, busca textual, paginação, ordenação e formatação.

## Como a criação funciona

- `src/app/(app)/lancamentos/novo/page.tsx` apenas compõe `NewTransactionPage`.
- `NewTransactionPage` monta o header da página e delega o formulário para `TransactionForm`.
- `useTransactionForm` concentra o estado do React Hook Form, o carregamento das opções, a submissão e os feedbacks de sucesso/erro.
- `transaction.schema.ts` valida obrigatoriedade, valor positivo e compatibilidade entre tipo e categoria.
- `transaction-form.service.ts` encapsula o acesso externo da criação, ainda mockado no módulo.
- `transaction-form.utils.ts` deriva defaults, opções, compatibilidade de categoria e o payload final da submissão.

## Como os dados são derivados na listagem

Todos os registros usam uma única data: `occurredAt`.

Fluxo:

1. o hook mantém filtros e página atual
2. o service recebe filtros + página e delega para `buildTransactionsListing`
3. o módulo filtra as transações por período, tipo, categoria, contato e descrição
4. depois do filtro, o módulo ordena por data decrescente e pagina o resultado
5. a tabela renderiza somente os itens da página ativa

## Como os dados são derivados na criação

Fluxo:

1. o hook carrega `typeOptions`, `categoriesByType` e `contactOptions` a partir do service do módulo
2. o schema valida os campos obrigatórios com Zod
3. ao trocar o tipo, o hook recalcula as categorias compatíveis e limpa uma categoria inválida já selecionada
4. na submissão, `mapTransactionFormValuesToPayload` converte `Date` para `occurredAt` em string ISO e normaliza campos opcionais
5. o resultado da criação volta para a página apenas como feedback de sucesso ou erro, sem persistência real nesta etapa

## Regras aplicadas

- os tipos disponíveis são `entry` e `exit`
- o valor do lançamento é tratado como positivo e o tipo define o contexto visual
- os filtros são combináveis
- a busca textual atua somente na descrição
- a tabela sempre reflete o recorte atual dos filtros
- a criação exige `tipo`, `descrição`, `valor`, `data` e `categoria`
- `valor` precisa ser maior que zero
- a categoria deve ser compatível com o tipo selecionado
- `contato` e `observação` permanecem opcionais

## Estados de tela

- `loading`: toolbar, tabela e paginação exibem skeletons e os filtros ficam desabilitados
- `empty`: quando o módulo não possui nenhum lançamento cadastrado
- `no-results`: quando existem lançamentos no módulo, mas o filtro atual não retorna itens
- `submit-error`: quando o service da criação falha
- `submit-success`: quando a submissão mockada retorna confirmação

## Motivação da implementação

- os mocks permanecem dentro de `src/modules/transactions/mocks`
- a lógica de listagem e paginação não fica no componente de página
- a lógica de formulário, schema, service e transformações não fica nos componentes
- filtros, tabela, toolbar e formulário foram separados para evitar componentes gigantes
- a página segue a mesma estratégia modular já usada em `dashboard` e `cash-flow`
