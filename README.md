# Cartório Workflow API

API REST para gestão de fluxos cartorários, protocolos, documentos e etapas operacionais.

Este projeto integra um portfólio em legal tech e demonstra a capacidade de modelar regras de negócio, estruturar autenticação, organizar módulos coesos e desenvolver uma base de código escalável para contextos com alta exigência documental.

## Sobre o problema

Em muitos fluxos cartorários, parte relevante da operação ainda depende de controles manuais, conferência fragmentada, baixa rastreabilidade e pouca visibilidade sobre o status dos protocolos, documentos pendentes e andamento das etapas.

A **Cartório Workflow API** centraliza essas informações e oferece uma base para:
- cadastro e acompanhamento de protocolos;
- vinculação e validação de documentos;
- controle de etapas do fluxo operacional;
- autenticação e gestão de usuários;
- rastreabilidade da operação.

## Stack

- **Node.js**
- **NestJS**
- **Prisma ORM**
- **PostgreSQL**
- **Autenticação JWT**
- **TypeScript**

## Arquitetura

A API foi estruturada em módulos para facilitar manutenção, evolução e clareza de responsabilidades:

- `auth`: autenticação via JWT
- `users`: gestão de usuários
- `protocols`: protocolos cartorários
- `documents`: documentos vinculados aos protocolos
- `workflows`: etapas operacionais do fluxo
- `health`: health check da aplicação
- `database`: acesso centralizado ao banco via Prisma

## Regras de negócio modeladas

### Usuários
- Usuários possuem nome, e-mail, senha criptografada e perfil de acesso.
- Perfis disponíveis: `ADMIN`, `ANALYST`, `ATTENDANT`.

### Protocolos
- Cada protocolo possui código único gerado automaticamente.
- Um protocolo contém requerente, CPF, tipo de serviço, descrição, status e usuário criador.
- Status disponíveis: `DRAFT`, `IN_REVIEW`, `PENDING_DOCUMENTS`, `APPROVED`, `REJECTED`, `COMPLETED`.

### Documentos
- Documentos são vinculados a um protocolo.
- Cada documento possui nome, tipo, URL opcional, observações e status.
- Status disponíveis: `PENDING`, `VALID`, `INVALID`.

### Workflow
- Um protocolo pode ter várias etapas operacionais.
- Cada etapa possui título, ordem, responsável opcional, prazo e status.
- Status disponíveis: `PENDING`, `IN_PROGRESS`, `DONE`, `BLOCKED`.

## Estrutura de pastas

```text
src/
  app.module.ts
  main.ts
  auth/
  common/
  database/
  documents/
  health/
  protocols/
  users/
  workflows/
prisma/
  schema.prisma
  seed.ts
