# Fluxo de Caixa

## Objetivo

A página `/fluxo-de-caixa` entrega uma visão temporal do desempenho financeiro dentro do módulo `cash-flow`.

O foco desta etapa é:

- consolidar entradas, saídas e saldo acumulado
- aplicar filtros por período, tipo, categoria e contato
- mostrar evolução cronológica do caixa
- resumir os dados por período
- preservar a fronteira `app = composição` e `modules = domínio`

## Estrutura

O módulo foi organizado assim:

```txt
src/modules/cash-flow/
  components/
    cash-flow-page.tsx
    cash-flow-chart-legend.tsx
    cash-flow-chart-skeleton.tsx
    cash-flow-section.tsx
    cash-flow-empty-state.tsx
    cash-flow-filters.tsx
    cash-flow-select-field.tsx
    cash-flow-summary-cards.tsx
    cash-flow-chart.tsx
    cash-flow-summary-table.tsx
  constants/
    cash-flow.constants.ts
  docs/
    cash-flow-page.md
  hooks/
    use-cash-flow-overview.ts
  mocks/
    cash-flow.mock.ts
  services/
    cash-flow.service.ts
  tests/
    cash-flow-page.test.tsx
    cash-flow.utils.test.ts
  types/
    cash-flow.types.ts
  utils/
    cash-flow.utils.ts
  index.ts
```

## Como a página funciona

- `src/app/(app)/fluxo-de-caixa/page.tsx` continua apenas importando `CashFlowPage`.
- `CashFlowPage` compõe header, filtros, cards, gráfico, tabela e empty state.
- `useCashFlowOverview` concentra o estado, os derivados de tela e o carregamento do overview.
- `cash-flow.service.ts` atua como ponto de acesso aos dados mockados do módulo.
- `cash-flow.constants.ts` concentra defaults, catálogos e configurações estáveis do módulo.
- `cash-flow.utils.ts` concentra filtros, cálculos, guards, formatação e agregações.
- `cash-flow-chart-legend.tsx`, `cash-flow-chart-skeleton.tsx` e `cash-flow-select-field.tsx` foram extraídos para evitar múltiplos componentes relevantes no mesmo arquivo.

## Como os dados são derivados

Todos os registros usam apenas uma data: `occurredAt`.

Fluxo:

1. o hook mantém os filtros ativos
2. o serviço recebe os filtros e chama `buildCashFlowOverview`
3. o módulo filtra as transações pela data única e pelos demais filtros
4. a partir desse recorte, o módulo deriva:
   - `summary`
   - `chartPoints`
   - `summaryRows`

## Regras aplicadas

- entradas somam no resultado
- saídas subtraem no resultado
- saldo acumulado é progressivo e respeita ordem cronológica
- a agregação visual e tabular é mensal
- filtros de tipo, categoria e contato sempre são aplicados sobre o mesmo conjunto temporal

## Estados de tela

- `loading`: cards, gráfico e tabela exibem skeletons
- `empty`: a página mostra `CashFlowEmptyState` quando o recorte filtrado não possui movimentações

## Motivação da implementação

- mocks permanecem dentro de `src/modules/cash-flow/mocks`
- nenhuma regra de negócio foi colocada em `page.tsx` nem em `shared`
- tipos, constantes e helpers do módulo foram concentrados em `cash-flow.types.ts`, `cash-flow.constants.ts` e `cash-flow.utils.ts`
- a seção visual repetida foi encapsulada localmente em `CashFlowSection`
- o módulo segue o mesmo padrão estrutural do `dashboard` para manter consistência entre áreas analíticas
