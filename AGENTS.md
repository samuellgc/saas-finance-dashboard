# AGENTS.md

Operational guidance for agents working in this repository.

For architectural rationale and the full checklist, read [docs/frontend-guidelines.md](docs/frontend-guidelines.md).

## Start Here

Before changing code:

1. Read [README.md](README.md) for project setup and scripts.
2. Read [docs/frontend-guidelines.md](docs/frontend-guidelines.md) for architecture rules.
3. Inspect the target module and follow the existing local pattern before creating new abstractions.

## Project Shape

The codebase is organized around this boundary:

- `src/app`: routes, layouts, page composition, App Router entrypoints
- `src/modules`: feature/domain code
- `src/shared`: cross-cutting infrastructure and reusable building blocks

Current stack:

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui + Radix UI
- Redux Toolkit
- React Hook Form + Zod
- Biome
- Vitest + Testing Library + Playwright

## Non-Negotiable Rules

- Do not add new business logic directly inside `src/app`.
- User-facing route segments in `src/app` should be written in Portuguese by default. Prefer `/produtos` over `/products` and `/usuarios` over `/users`. Widely adopted product terms such as `/login` and `/dashboard` are acceptable exceptions when they match the language of the product.
- Do not move feature-specific code into `src/shared`.
- Prefer extending an existing module in `src/modules` before creating a new shared abstraction.
- Keep responsibilities split by concern: component, hook, service, schema, store, types, utils.
- Encapsulate API and external access inside `services/`.
- Use React Hook Form + Zod for forms.
- Keep components small and presentation-focused.
- Use Redux Toolkit only when state is truly global, shared across distant areas, or persisted in a way that local state or module-scoped solutions cannot handle cleanly. Do not introduce Redux by default.
- Respect module boundaries; avoid reaching into another module's deep internal files when a public entrypoint is more appropriate.
- Avoid `any` unless there is a strong justification.

## Placement Rules

When adding code, use this decision rule:

- If it belongs to a feature, place it in that feature under `src/modules/<feature>`.
- If it is reused across multiple features and carries no domain rule, it can live in `src/shared`.
- If it is route composition, layout, or page entry logic, keep it in `src/app`.
- If it creates a public URL, choose a Portuguese segment unless the project already treats that term as a natural exception, such as `login` or `dashboard`.

Typical module structure:

```txt
src/modules/<feature>/
  components/
  hooks/
  services/
  schemas/
  store/
  types/
  utils/
  tests/
  index.ts
```

## Naming

- Directories: `kebab-case`
- Components: file in `kebab-case.tsx`, exported symbol in `PascalCase`
- Hooks: `use-*.ts` or team-consistent hook naming
- Schemas: `*.schema.ts`
- Services: `*.service.ts`
- Store slices: `*.slice.ts`
- Selectors: `*.selectors.ts`
- Types: `*.types.ts`
- Tests: `*.test.ts` or `*.test.tsx`

## Current Product Modules

This project currently centers on these modules:

- `dashboard`
- `cash-flow`
- `transactions`
- `categories`
- `contacts`

Do not create new business modules unless the task explicitly requires it.

## UI, Styling, and Accessibility

- Use Tailwind CSS as the main styling layer.
- Prefer shadcn/ui and Radix primitives for accessible UI.
- Use conditional class helpers already adopted by the project, such as `clsx` or `cn`.
- Keep spacing and layout patterns consistent with nearby code.
- Preserve keyboard interaction and accessibility guarantees.
- Treat empty, loading, error, and permission states explicitly when relevant.

## Testing and Validation

Use `pnpm` for commands.

Core commands:

- `pnpm lint`
- `pnpm test`
- `pnpm build`

Validation expectations:

- Run `pnpm lint` after code changes.
- Run `pnpm test` when behavior, hooks, services, or components are affected.
- Run `pnpm build` for broader integration-sensitive changes when feasible.
- Prefer adding or updating tests for feature logic, forms, critical hooks, and reusable components.

## Working Style

- Prefer small, reviewable patches that match the existing code style.
- Reuse existing module patterns before introducing new architecture.
- Do not rewrite unrelated files.
- If a rule here conflicts with a more specific `AGENTS.md` deeper in the tree, the deeper file wins for that scope.

## Source of Truth

This file is intentionally short. The canonical architecture guidance lives in:

- [docs/frontend-guidelines.md](docs/frontend-guidelines.md)
- [README.md](README.md)
