# Convenção de Colaboração Entre IAs

Este projeto usa duas pastas locais para troca de contexto entre execuções de IA.

## Fluxo esperado

O fluxo padrão entre IAs e validação humana é:

1. uma IA implementa a feature
2. essa IA registra um handoff
3. outra IA faz a review e registra findings ou aprovação
4. se houver ajustes, uma IA faz a correção e gera um novo handoff
5. a IA de review valida novamente e marca como aprovado
6. a validação final é sua
7. depois do seu OK, a mudança pode seguir para produção

Em outras palavras:

- `handoffs/` representa execução e correção
- `reviews/` representa análise e aprovação

Não é necessário criar uma pasta separada para produção. Produção é etapa do fluxo, não artefato de comunicação entre IAs.

## Pastas

### `handoffs/`

Use para:

- resumo do que foi implementado
- contexto para a próxima IA
- decisões tomadas
- pendências
- riscos ou pontos de atenção
- correções feitas após uma review

Esse nome é melhor que `changes/` porque o objetivo não é apenas listar mudanças, e sim fazer a passagem de contexto entre execuções.

### `reviews/`

Use para:

- revisão de código
- findings
- pedidos de ajuste
- validações finais
- pareceres de aprovação ou bloqueio
- confirmação de que os ajustes pedidos foram atendidos

## Padrão de nome

Todos os arquivos devem seguir:

```txt
YYYYMMDD-HHMMSS-slug.md
```

Exemplos:

```txt
handoffs/20260331-130305-layout-autenticado-global.md
reviews/20260331-131500-layout-autenticado-global.md
reviews/20260331-132000-auth-shell-ajustes.md
handoffs/20260331-133000-layout-autenticado-global-ajustes-review.md
reviews/20260331-134500-layout-autenticado-global-aprovado.md
```

## Regras

- usar `kebab-case` no slug
- usar horário de 24h
- um arquivo por execução ou revisão
- manter o timestamp no começo do nome, como migration
- se a revisão responder a um handoff, usar slug compatível para facilitar rastreio
- se houver correção após review, gerar um novo handoff em vez de sobrescrever o anterior
- o review final deve deixar claro se o status é `changes-requested` ou `approved`

## Estrutura sugerida para `handoffs/`

```md
# Título curto

- data: 2026-03-31 13:03:05
- autor: codex
- escopo: layout-autenticado-global

## O que foi feito

## Arquivos principais

## Decisões

## Pendências

## Próximo passo
```

## Estrutura sugerida para `reviews/`

```md
# Review

- data: 2026-03-31 13:15:00
- escopo: layout-autenticado-global
- referência: handoffs/20260331-130305-layout-autenticado-global.md

## Findings

## Riscos residuais

## Status
```

## Convenção de status

Para manter o fluxo claro, use estes status:

### Em `reviews/`

- `changes-requested`: há ajustes antes do OK
- `approved`: a IA de review considera a entrega pronta para validação humana

### Em `handoffs/`

- `implemented`: primeira implementação
- `corrected`: correção após review
- `finalized`: opcional, quando a execução só consolida o estado final para validação humana

## Encadeamento recomendado

Exemplo de sequência real:

1. `handoffs/20260331-130305-layout-autenticado-global.md`
   status: `implemented`
2. `reviews/20260331-131500-layout-autenticado-global.md`
   status: `changes-requested`
3. `handoffs/20260331-133000-layout-autenticado-global-ajustes-review.md`
   status: `corrected`
   referência: review anterior
4. `reviews/20260331-134500-layout-autenticado-global-aprovado.md`
   status: `approved`
5. validação humana
6. deploy

## Recomendação prática

Se quiser máxima clareza, mantenha estes campos no topo de cada arquivo:

- `data`
- `autor`
- `escopo`
- `status`
- `referência`, quando houver
- `próximo-passo`

## Templates disponíveis

Arquivos prontos para copiar:

- `handoffs/_template.md`
- `reviews/_template.md`

## Observação importante

Essas pastas são locais e descartáveis para colaboração operacional.

Documentação de longo prazo deve continuar em `docs/`.
