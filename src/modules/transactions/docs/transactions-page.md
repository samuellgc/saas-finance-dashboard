# Lançamentos

## Objetivo

A página `/lancamentos` entrega a listagem operacional dos lançamentos financeiros dentro do módulo `transactions`.

O foco desta etapa é:

- listar lançamentos com paginação
- combinar filtros por período, tipo, categoria, contato e descrição
- tratar estados de loading, vazio e sem resultados
- manter a criação e a edição fora do escopo atual

## Estrutura

O módulo foi organizado assim:

```txt
src/modules/transactions/
  components/
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
    use-transactions-listing.ts
  mocks/
    transactions.mock.ts
  services/
    transactions.service.ts
  tests/
    transactions-page.test.tsx
    transactions.utils.test.ts
  types/
    transactions.types.ts
  utils/
    transactions.utils.ts
  index.ts
```

## Como a página funciona

- `src/app/(app)/lancamentos/page.tsx` continua apenas orquestrando a rota com `TransactionsPage`.
- `TransactionsPage` compõe header, toolbar, filtros, tabela, paginação e estados.
- `useTransactionsListing` controla filtros, paginação, carregamento e derivados de tela.
- `transactions.service.ts` expõe o catálogo de filtros e a listagem mockada do módulo.
- `transactions.utils.ts` concentra filtragem, busca textual, paginação, ordenação e formatação.

## Como os dados são derivados

Todos os registros usam uma única data: `occurredAt`.

Fluxo:

1. o hook mantém filtros e página atual
2. o service recebe filtros + página e delega para `buildTransactionsListing`
3. o módulo filtra as transações por período, tipo, categoria, contato e descrição
4. depois do filtro, o módulo ordena por data decrescente e pagina o resultado
5. a tabela renderiza somente os itens da página ativa

## Regras aplicadas

- os tipos disponíveis são `entry` e `exit`
- o valor do lançamento é tratado como positivo e o tipo define o contexto visual
- os filtros são combináveis
- a busca textual atua somente na descrição
- a tabela sempre reflete o recorte atual dos filtros

## Estados de tela

- `loading`: toolbar, tabela e paginação exibem skeletons e os filtros ficam desabilitados
- `empty`: quando o módulo não possui nenhum lançamento cadastrado
- `no-results`: quando existem lançamentos no módulo, mas o filtro atual não retorna itens

## Motivação da implementação

- os mocks permanecem dentro de `src/modules/transactions/mocks`
- a lógica de listagem e paginação não fica no componente de página
- filtros, tabela e toolbar foram separados para evitar um componente gigante
- a página segue a mesma estratégia modular já usada em `dashboard` e `cash-flow`
