# SaaS Finance Dashboard

Frontend em **Next.js 15** com **React 19**, organizado por modulo e preparado para evoluir features com baixo acoplamento, componentes reutilizaveis e validacoes de qualidade no fluxo de desenvolvimento.

## Stack

- Next.js 15 com App Router
- React 19 + TypeScript 5
- Tailwind CSS 4
- shadcn/ui + Radix UI
- Redux Toolkit
- React Hook Form + Zod
- Biome
- Vitest + Testing Library + Playwright
- Husky + lint-staged

## Estrutura

O projeto segue a regra:

- `src/app`: rotas, layouts e composicao de entrada
- `src/modules`: regra de negocio por dominio
- `src/shared`: infraestrutura e recursos reutilizaveis

Estrutura atual:

```txt
src/
  app/
    (auth)/
      login/
        page.tsx
    dashboard/
      page.tsx
    layout.tsx
    page.tsx

  modules/
    auth/
      components/
      hooks/
      schemas/
      services/
      store/
      tests/
      types/
      index.ts
    dashboard/
      components/
      index.ts

  shared/
    components/
      shadcn/
      ui/
    hooks/
    lib/
    providers/
    store/
    styles/
    types/
    utils/
```

As diretrizes completas de arquitetura estao em `docs/frontend-guidelines.md`.

## Tema e Design Tokens

As cores do sistema ficam centralizadas em:

- `src/shared/styles/globals.css`

Esse arquivo concentra os tokens principais de tema, incluindo `primary`, `primary-hover`, `secondary`, `success`, `warning` e `error`.

## Variaveis de Ambiente

Copie `.env.example` para `.env.local` e ajuste conforme seu backend:

```bash
cp .env.example .env.local
```

Variavel atual:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm format
pnpm check-format
pnpm test
pnpm test:watch
```

Observacoes:

- `pnpm test` usa `scripts/run-vitest.mjs` para normalizar diretorio temporario em ambientes Linux/WSL.
- `prepare` instala os hooks do Husky.

## Como Rodar

### Localmente

1. Instale as dependencias:

```bash
pnpm install
```

2. Suba o ambiente de desenvolvimento:

```bash
pnpm dev
```

3. Acesse:

- `http://localhost:3000/login`
- `http://localhost:3000/dashboard`

### Com Docker

1. Suba o container:

```bash
docker-compose up --build
```

2. Acesse:

- `http://localhost:3005`

3. Comandos uteis no container:

```bash
docker-compose exec boilerplate-frontend pnpm lint
docker-compose exec boilerplate-frontend pnpm test
docker-compose exec boilerplate-frontend pnpm build
```

## Fluxo de Qualidade

Hooks configurados:

- `.husky/pre-commit`: executa `pnpm lint-staged`
- `.husky/pre-push`: executa `pnpm test` e `pnpm build`

`lint-staged` roda:

- `biome format --write`
- `biome lint`

## Documentacao Util

- `docs/frontend-guidelines.md`: padroes de arquitetura e checklist de PR
- `biome.json`: configuracao de lint e formatacao
- `vitest.config.mts`: configuracao de testes
- `components.json`: configuracao do shadcn/ui

## Estado Atual do Projeto

Hoje o projeto ja inclui:

- fluxo de login modularizado em `src/modules/auth`
- store global desacoplada em `src/shared/store`
- provider Redux em `src/shared/providers`
- pagina inicial de dashboard em `src/modules/dashboard`
- tema centralizado por tokens em `src/shared/styles/globals.css`
