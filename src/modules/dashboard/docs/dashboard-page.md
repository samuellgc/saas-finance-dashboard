# Painel Financeiro

## Objetivo

A página `/painel` entrega uma visão resumida do desempenho financeiro do sistema dentro do módulo `dashboard`.

O foco desta etapa é:

- consolidar indicadores principais por período
- comparar entradas e saídas
- destacar categorias relevantes
- listar movimentações recentes
- preservar a fronteira `app = composição` e `modules = domínio`

## Estrutura

O módulo foi organizado assim:

```txt
src/modules/dashboard/
  components/
    dashboard-page.tsx
    dashboard-period-filter.tsx
    dashboard-summary-cards.tsx
    dashboard-cash-flow-chart.tsx
    dashboard-category-summary.tsx
    dashboard-recent-transactions.tsx
    dashboard-empty-state.tsx
  docs/
    dashboard-page.md
  hooks/
    use-dashboard-overview.ts
  mocks/
    dashboard.mock.ts
  services/
    dashboard.service.ts
  tests/
    dashboard-page.test.tsx
  types/
    dashboard.types.ts
  utils/
    dashboard.utils.ts
  index.ts
```

## Como a página funciona

- `src/app/(app)/painel/page.tsx` continua apenas importando `DashboardPage`.
- `DashboardPage` faz a composição visual da tela e delega estado e carregamento ao hook `use-dashboard-overview`.
- `dashboard.service.ts` atua como ponto de acesso aos dados do painel.
- `dashboard.utils.ts` concentra as derivações de negócio e os cálculos do módulo.

## Como os dados são derivados

Os dados exibidos sempre respeitam o período selecionado.

Fluxo:

1. `use-dashboard-overview` controla o período ativo e solicita os dados ao serviço.
2. `dashboard.service.ts` usa os mocks do módulo e chama `buildDashboardOverview`.
3. `buildDashboardOverview` filtra as transações pelo período.
4. A partir desse recorte, o módulo deriva:
   - `summary`
   - `cashFlowChart`
   - `categorySummary`
   - `recentTransactions`

### Regras aplicadas

- `saldo = totalEntries - totalExits`
- o gráfico agrupa o volume financeiro por mês dentro da janela filtrada
- o resumo por categoria consolida `categoria + tipo`
- a lista recente é ordenada da data mais nova para a mais antiga e limitada aos 5 itens mais recentes

## Estados de tela

- `loading`: a página renderiza skeletons nos cards e nas seções principais
- `empty`: a página mostra `DashboardEmptyState` quando o período não possui movimentações

## Motivação da implementação

- os mocks permanecem dentro de `src/modules/dashboard/mocks`, porque pertencem ao domínio do painel
- a lógica de derivação não foi colocada em `page.tsx` nem em `shared`
- os componentes visuais permanecem pequenos e orientados à apresentação
- o hook encapsula apenas estado de interface e ciclo de carregamento
