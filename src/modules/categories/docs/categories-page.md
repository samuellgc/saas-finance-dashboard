# Categorias

## Objetivo

O módulo `categories` gerencia o catálogo de categorias financeiras da rota `/categorias`.

O foco desta etapa é:

- listar categorias com filtros simples por tipo e busca
- criar e editar categorias em modal
- manter regras de unicidade por tipo e status ativo/inativo
- preparar a base para consumo futuro por outros módulos

## Estrutura

```txt
src/modules/categories/
  components/
    categories-filters.tsx
    categories-page.tsx
    categories-table.tsx
    categories-toolbar.tsx
    category-form.tsx
    category-icon.tsx
    category-select-field.tsx
  constants/
    categories.constants.ts
  docs/
    categories-page.md
  hooks/
    use-categories-manager.ts
  mocks/
    categories.mock.ts
  schemas/
    category.schema.ts
  services/
    categories.service.ts
  tests/
    categories-page.test.tsx
    category.schema.test.ts
  types/
    categories.types.ts
  utils/
    categories.utils.ts
  index.ts
```

## Como a página funciona

- `src/app/(app)/categorias/page.tsx` continua apenas compondo `CategoriesPage`.
- `CategoriesPage` organiza header, toolbar, filtros, tabela e modal de formulário.
- `useCategoriesManager` concentra carregamento, filtros, abertura do modal, criação, edição e validação de nome único por tipo.
- `categories.service.ts` mantém os mocks do módulo, faz leitura inicial e simula criação/edição.
- `category.schema.ts` valida obrigatoriedade, tipo, cor hexadecimal, ícone e status.

## Como os dados são derivados

Fluxo:

1. o hook carrega as categorias mockadas do módulo
2. `applyCategoryFilters` filtra por tipo e busca textual no nome
3. o formulário reutiliza o mesmo schema para criação e edição
4. antes de salvar, o hook valida unicidade de nome dentro do mesmo tipo
5. categorias inativas permanecem visíveis para gestão, mas marcadas como indisponíveis para uso

## Regras aplicadas

- toda categoria pertence a um tipo: `entry` ou `exit`
- o nome precisa ser único dentro do mesmo tipo
- categorias inativas não podem ser usadas em fluxos futuros de seleção
- cor deve ser salva em formato hexadecimal
- o modal reaproveita o mesmo formulário para criação e edição

## Estados de tela

- `loading`: toolbar e tabela usam placeholders enquanto os mocks são carregados
- `empty`: quando o catálogo de categorias está vazio
- `no-results`: quando os filtros não retornam registros

## Motivação da implementação

- os mocks permanecem dentro de `src/modules/categories/mocks`
- o formulário fica isolado em modal para manter a página simples
- a regra de unicidade não fica no componente visual
- a tabela e o toolbar foram separados para evitar um componente gigante
