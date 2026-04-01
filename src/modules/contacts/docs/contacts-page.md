# Contatos

## Objetivo

A página `/contatos` centraliza o cadastro de contatos financeiros usados em lançamentos de entrada e saída.

Ela existe para:

- manter um único cadastro para pessoas e empresas
- evitar segmentação artificial entre cliente e fornecedor
- permitir manutenção simples de status e dados de contato

## Estrutura

O módulo foi organizado assim:

- `components/contacts-page.tsx`: composição da tela
- `components/contacts-toolbar.tsx`: resumo da listagem, botão de criação e busca
- `components/contacts-table.tsx`: tabela, loading, empty state e sem resultados
- `components/contact-form.tsx`: modal de criação e edição
- `hooks/use-contacts-manager.ts`: carregamento, estado da tela e submissão
- `services/contacts.service.ts`: acesso aos mocks e mutações locais
- `schemas/contact.schema.ts`: validação com React Hook Form + Zod
- `utils/contacts.utils.ts`: filtros, mapeamentos e mensagens derivadas
- `mocks/contacts.mock.ts`: base inicial de contatos

## Como os dados são derivados

O fluxo da tela fica concentrado em `useContactsManager`.

Etapas principais:

1. carregar os contatos pelo service do módulo
2. aplicar busca textual com `applyContactsFilters`
3. abrir o formulário em modo criação ou edição
4. validar os dados com `contactSchema`
5. transformar os valores do formulário em payload via `mapContactFormValuesToPayload`
6. persistir no service mockado e atualizar a lista local

## Regras consideradas

- `nome` é obrigatório
- o mesmo contato pode ser usado em entradas e saídas
- não existe separação entre cliente e fornecedor
- o status serve para manutenção do cadastro sem remover histórico

## Estados cobertos

- loading da listagem
- lista vazia
- sem resultados para a busca
- erro de submissão
- feedback de sucesso após criar ou editar
