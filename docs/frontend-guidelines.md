# Frontend - Boas Praticas, Estrutura e Arquitetura

Este documento define os acordos para manter consistencia tecnica, previsibilidade e escalabilidade no frontend.

O objetivo nao e apenas manter o codigo organizado, mas garantir que qualquer pessoa ou IA que construa novas features siga a mesma arquitetura e preserve o crescimento sustentavel do projeto.

---

## Objetivos da Arquitetura

Toda feature nova deve ser pensada com estes principios:

- **organizacao por dominio/feature**, nao por tipo tecnico solto
- **baixo acoplamento** entre modulos
- **reutilizacao consciente**, sem transformar `shared` em deposito generico
- **separacao clara** entre UI, regra de negocio, acesso a dados e estado
- **facilidade de manutencao**, testes e evolucao

---

## Stack Utilizada

- **Next.js 15 (App Router)**
- **React 19 + TypeScript 5**
- **Tailwind CSS 4**
- **shadcn/ui + Radix UI**
- **Redux Toolkit**
- **React Hook Form + Zod**
- **Biome (lint + format)**
- **Vitest + Testing Library + Playwright**

---

## Principio Estrutural Principal

### Regra de ouro

**O projeto deve ser organizado por modulo/feature.**

A estrutura nao deve crescer centralizando tudo em `shared`.

`shared` existe apenas para itens realmente transversais e reutilizaveis entre varios modulos. Tudo que pertence ao contexto de uma feature deve ficar dentro do modulo da propria feature.

---

## Estrutura Base Recomendada

```txt
src/
  app/
    (auth)/
      login/
        page.tsx
    dashboard/
      page.tsx

  modules/
    auth/
      components/
      hooks/
      services/
      schemas/
      store/
      types/
      utils/
      tests/
      index.ts

    dashboard/
      components/
      hooks/
      services/
      schemas/
      types/
      utils/
      tests/
      index.ts

  shared/
    components/
      shadcn/
      layout/
      feedback/
    hooks/
    lib/
    styles/
    types/
    utils/
```

---

## Responsabilidade de Cada Camada

### `src/app`
Responsavel por **roteamento, layouts, paginas e composicao de entrada** do App Router.

Regras:
- `app` nao deve concentrar regra de negocio complexa
- `page.tsx` deve orquestrar a tela, consumindo componentes e recursos dos modulos
- layouts e providers globais podem ficar em `app` ou em `shared`, dependendo do escopo
- segmentos de rota voltados ao usuario devem ser nomeados em portugues por padrao
- excecoes sao permitidas para termos amplamente incorporados no produto, como `login` e `dashboard`

Exemplos:
- `/produtos` em vez de `/products`
- `/usuarios` em vez de `/users`
- `/clientes` em vez de `/customers`

### `src/modules`
Responsavel por **dominios/funcionalidades da aplicacao**.

Exemplos:
- `auth`
- `dashboard`
- `users`
- `companies`
- `financial`
- `plans`

Tudo que for especifico de uma feature deve nascer aqui.

### `src/shared`
Responsavel apenas por recursos **realmente compartilhados**.

Exemplos validos:
- componentes base e wrappers globais
- utilitarios genericos
- cliente HTTP base
- helpers de estilo
- tipos amplamente reutilizados

Exemplos que **nao devem** ir para `shared` cedo demais:
- regra de login
- store especifica de auth
- schema especifico de uma tela
- funcoes ligadas ao dominio financeiro

Se algo pertence claramente a um modulo, deixe no modulo.

---

## Estrutura Interna dos Modulos

Cada modulo deve crescer com responsabilidades explicitas.

```txt
modules/
  auth/
    components/
      login-form.tsx
      login-card.tsx
    hooks/
      use-login-form.ts
    services/
      auth.service.ts
    schemas/
      login.schema.ts
    store/
      auth.slice.ts
      auth.selectors.ts
    types/
      auth.types.ts
    utils/
      auth-mappers.ts
    tests/
      login-form.test.tsx
    index.ts
```

### Regras importantes

- `components/`: componentes visuais da feature
- `hooks/`: orquestracao, estado local, integracao com formularios, regras de interacao
- `services/`: comunicacao externa e regras de acesso a dados
- `schemas/`: validacoes com Zod
- `store/`: estado global da feature, quando realmente necessario
- `types/`: tipos especificos da feature
- `utils/`: helpers internos da feature
- `tests/`: testes da feature quando fizer sentido centralizar
- `index.ts`: exportacoes publicas do modulo

---

## Fronteira Entre Modulos e Shared

Antes de mover algo para `shared`, valide:

1. Isso e usado por mais de um modulo?
2. Isso e generico de verdade?
3. Isso nao carrega regra de negocio de uma feature?

Se qualquer resposta for negativa, o codigo deve permanecer no modulo.

### Exemplo correto
- `shared/lib/http-client.ts`
- `shared/components/layout/page-header.tsx`

### Exemplo incorreto
- `shared/contexts/auth/slice.ts`
- `shared/utils/financial-summary.ts`
- `shared/hooks/use-login-submit.ts`

Esses exemplos acima devem viver no modulo correspondente.

---

## Convencoes de Nomenclatura

| Tipo                   | Convencao        | Exemplo                    |
| ---------------------- | ---------------- | -------------------------- |
| Pastas                 | `kebab-case`     | `user-profile`             |
| Componentes            | `kebab-case.tsx` | `user-card.tsx`            |
| Componentes exportados | `PascalCase`     | `export const UserCard`    |
| Hooks                  | `kebab-case.ts` ou `camelCase` interno padronizado por equipe | `use-login-form.ts` |
| Schemas                | `kebab-case.ts`  | `login.schema.ts`          |
| Services               | `kebab-case.ts`  | `auth.service.ts`          |
| Store slices           | `kebab-case.ts`  | `auth.slice.ts`            |
| Selectors              | `kebab-case.ts`  | `auth.selectors.ts`        |
| Tipos                  | `kebab-case.ts`  | `auth.types.ts`            |
| Testes                 | `*.test.tsx`     | `login-form.test.tsx`      |

---

## Componentes

### Regras

- Componentes devem ser pequenos, previsiveis e focados em apresentacao
- Nao coloque regra de negocio complexa diretamente no JSX
- Componentes de feature ficam no modulo da feature
- Componentes genericos ficam em `shared/components`
- Priorize composicao sobre componentes gigantes e multifuncionais

### Separacao recomendada

- **Componentes de pagina**: composicao da tela
- **Componentes de feature**: pecas especificas da funcionalidade
- **Componentes compartilhados**: base reutilizavel entre dominios

---

## Hooks

Use hooks para:

- encapsular logica de interface
- integrar formulario, query, mutation e estado local
- organizar comportamento reutilizavel da feature

Evite hooks que:

- misturem responsabilidades demais
- viabilizem regra de negocio espalhada fora do modulo
- virem camada magica dificil de rastrear

`useMemo` e `useCallback` so devem ser usados quando houver ganho real de performance ou estabilidade referencial necessaria.

---

## Services e Acesso a Dados

Toda comunicacao externa deve ser encapsulada.

### Regras

- chamadas HTTP nao devem ficar soltas em componentes
- crie services por modulo
- `shared/lib` deve conter a infraestrutura base, nao as regras de negocio
- o modulo consome a infraestrutura base e implementa seu proprio service

### Exemplo

```txt
shared/lib/http-client.ts
modules/auth/services/auth.service.ts
modules/dashboard/services/dashboard.service.ts
```

Assim voce separa:
- **infraestrutura compartilhada**
- **uso especifico por dominio**

---

## Estado Global

Use Redux Toolkit apenas quando houver necessidade real de compartilhamento global ou persistencia de estado entre partes relevantes da aplicacao.

### Regras

- estado global deve ser excecao, nao resposta padrao
- estado de UI local deve permanecer local
- slices devem morar no modulo dono daquele estado
- selectors devem ser centralizados no proprio modulo

### Exemplos

**Pode ser global:**
- sessao autenticada
- permissao do usuario
- configuracoes amplas da aplicacao

**Nao deve ir para Redux cedo demais:**
- estado de modal local
- filtros de uma unica pagina
- loading interno de um formulario

---

## Formularios

Padrao oficial:

- **React Hook Form**
- **Zod**
- `zodResolver`

### Regras

- schemas devem ficar em `schemas/`
- tipos derivados do schema devem ser reaproveitados
- mensagens de erro devem ser claras e consistentes
- componentes de formulario devem ser reutilizaveis quando houver padrao real

---

## UI e Estilos

- Tailwind CSS e a camada principal de estilo
- shadcn/ui e Radix devem ser a base dos componentes acessiveis
- componentes existentes do projeto devem ser reutilizados antes de criar novos
- evite construir interface com elementos puros (`div`, `button`, `input`, etc.) quando ja existir componente especifico para o mesmo objetivo
- use `cn`/`clsx` para classes condicionais
- evite listas gigantes de classes sem extracao
- padroes de layout e espacamento devem ser consistentes

### Organizacao sugerida para componentes compartilhados

```txt
shared/components/
  shadcn/
    ui/
  layout/
  feedback/
  data-display/
  navigation/
```

Evite centralizar tudo em uma pasta `ui` generica sem criterio.

---

## Testes

A arquitetura deve favorecer testes simples e localizados.

### Regras

- teste componente junto da feature ou em `tests/` da feature
- teste comportamento, nao implementacao interna
- hooks e services criticos devem ter cobertura
- fluxos criticos devem ter complemento em E2E

### Prioridades

1. validacao de formularios
2. comportamento de componentes centrais
3. hooks com regra relevante
4. services e mapeamentos importantes
5. fluxos E2E criticos

---

## Imports e Dependencias

### Regras

- imports devem respeitar a fronteira de modulos
- um modulo nao deve acessar arquivos internos de outro modulo sem passar pela API publica dele quando isso comecar a crescer
- prefira exportar pontos de entrada via `index.ts`
- evite dependencia circular

### Diretriz

Quando um modulo precisar consumir algo de outro, prefira:

```txt
modules/auth/index.ts
modules/users/index.ts
```

Em vez de importar arquivos profundos e acoplar implementacoes internas.

---

## Qualidade e Git

- Husky + lint-staged executam validacoes antes do commit
- commits seguem padrao semantico (`feat:`, `fix:`, `refactor:`, `chore:`)
- nao usar `any` sem justificativa forte
- prefira tipos derivados de schema, contratos ou interfaces locais
- toda feature nova deve respeitar a arquitetura definida neste documento

---

## Acessibilidade e Seguranca

- preserve as garantias de acessibilidade de Radix e shadcn
- use `aria-*` quando necessario
- nao quebre interacao por teclado
- sempre use `rel="noopener noreferrer"` com `target="_blank"`
- sanitize conteudo externo antes de renderizar HTML dinamico
- trate estados de erro, permissao e ausencia de dados explicitamente

---

## Regras Objetivas para IAs e Pessoas Desenvolvedoras

Ao criar qualquer nova feature, siga obrigatoriamente:

1. **Nao criar regra de negocio nova dentro de `src/app`**
2. **Nao colocar em `shared` nada que seja especifico de um dominio**
3. **Criar ou reutilizar um modulo em `src/modules`**
4. **Separar componente, schema, service, hook e store por responsabilidade**
5. **Encapsular acesso a API em `services/`**
6. **Usar Zod + React Hook Form em formularios**
7. **Manter componentes pequenos e compostos**
8. **Criar nomes consistentes e previsiveis**
9. **Respeitar a fronteira entre infraestrutura compartilhada e regra de negocio**
10. **Nao transformar `shared` em deposito generico**
11. **Nomear rotas publicas em portugues, salvo excecoes consolidadas no produto como `login` e `dashboard`**
12. **Reutilizar componentes existentes do projeto antes de usar elementos puros de HTML**

---

## Checklist para Pull Requests

- [ ] A feature foi criada em `src/modules`?
- [ ] `src/app` ficou apenas com composicao de rota/pagina?
- [ ] Existe algo em `shared` que deveria estar no modulo?
- [ ] Componentes, hooks, schemas e services estao separados corretamente?
- [ ] Chamadas HTTP ficaram fora dos componentes?
- [ ] Estado global foi usado apenas se realmente necessario?
- [ ] Formularios usam React Hook Form + Zod?
- [ ] Testes foram criados ou atualizados?
- [ ] `pnpm lint` e `pnpm test` passaram?
- [ ] A feature respeita a arquitetura descrita neste documento?

---

## Resumo Executivo

Este frontend deve crescer com a seguinte mentalidade:

- **rotas em `app`**
- **dominio em `modules`**
- **infra compartilhada em `shared`**

Se surgir duvida sobre onde um arquivo deve ficar, use esta regra:

> Se pertence a uma feature, fica no modulo.
> Se pertence a varias features e nao carrega regra de negocio, pode ir para `shared`.

Essa regra deve orientar tanto pessoas desenvolvedoras quanto IAs que gerem codigo para o projeto.
