# Cartório Workflow API

API REST para gestão de fluxos cartorários, protocolos, documentos e etapas operacionais.

Este projeto foi pensado como portfólio técnico para demonstrar capacidade de modelar regras de negócio, estruturar autenticação, criar módulos coesos e organizar uma base de código escalável para contextos com alta exigência documental.

## Problema que o projeto resolve

Em muitos fluxos cartorários, parte relevante da operação ainda depende de controles manuais, conferência fragmentada, baixa rastreabilidade e pouca visibilidade sobre status de protocolos, documentos pendentes e andamento das etapas.

A Cartório Workflow API centraliza essas informações e oferece uma base para:
- cadastro e acompanhamento de protocolos;
- vinculação e validação de documentos;
- controle de etapas do fluxo operacional;
- autenticação e controle de usuários;
- rastreabilidade da operação.

## Stack

- **Node.js**
- **NestJS**
- **Prisma ORM**
- **PostgreSQL**
- **JWT Authentication**
- **TypeScript**

## Arquitetura

A API foi estruturada em módulos para facilitar manutenção, evolução e clareza de responsabilidades:

- `auth`: autenticação via JWT
- `users`: gestão de usuários
- `protocols`: protocolos cartorários
- `documents`: documentos vinculados aos protocolos
- `workflows`: etapas operacionais do fluxo
- `health`: healthcheck da aplicação
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

```bash
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
```

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO/cartorio-workflow-api.git
cd cartorio-workflow-api
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` com base no `.env.example`.

```env
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cartorio_workflow?schema=public"
JWT_SECRET="troque-esta-chave"
JWT_EXPIRES_IN="1d"
```

### 4. Gerar client do Prisma

```bash
npx prisma generate
```

### 5. Rodar migration

```bash
npx prisma migrate dev --name init
```

### 6. Popular banco com seed

```bash
npm run seed
```

### 7. Subir aplicação

```bash
npm run start:dev
```

A API ficará disponível em:

```bash
http://localhost:3000/api
```

## Usuário inicial para testes

Após rodar o seed:

- **E-mail:** `admin@cartorio.local`
- **Senha:** `Admin@123`

## Rotas principais

### Health
- `GET /api/health`

### Auth
- `POST /api/auth/login`

### Users
- `POST /api/users`
- `GET /api/users`
- `GET /api/users/:id`

### Protocols
- `POST /api/protocols`
- `GET /api/protocols`
- `GET /api/protocols/:id`
- `PATCH /api/protocols/:id/status`

### Documents
- `POST /api/documents`
- `GET /api/documents/protocol/:protocolId`
- `PATCH /api/documents/:id/status`

### Workflows
- `POST /api/workflows`
- `GET /api/workflows/protocol/:protocolId`
- `PATCH /api/workflows/:id/status`

## Exemplos de uso

### Login

```bash
curl --request POST \
  --url http://localhost:3000/api/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
    "email": "admin@cartorio.local",
    "password": "Admin@123"
  }'
```

### Criar protocolo

```bash
curl --request POST \
  --url http://localhost:3000/api/protocols \
  --header 'Authorization: Bearer SEU_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "applicantName": "João Ribeiro",
    "applicantCpf": "987.654.321-00",
    "serviceType": "Escritura Pública",
    "description": "Solicitação para abertura de protocolo de escritura."
  }'
```

### Adicionar documento

```bash
curl --request POST \
  --url http://localhost:3000/api/documents \
  --header 'Authorization: Bearer SEU_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "protocolId": "ID_DO_PROTOCOLO",
    "name": "Documento de Identidade",
    "type": "IDENTIFICATION",
    "notes": "Documento legível e válido"
  }'
```

### Criar etapa de workflow

```bash
curl --request POST \
  --url http://localhost:3000/api/workflows \
  --header 'Authorization: Bearer SEU_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "protocolId": "ID_DO_PROTOCOLO",
    "title": "Conferência documental",
    "description": "Analisar documentos obrigatórios do protocolo",
    "order": 1
  }'
```

## Melhorias futuras

- refresh token
- controle de permissões por perfil
- paginação e filtros
- upload real de arquivos
- logs e auditoria
- Docker Compose
- testes unitários e e2e
- Swagger/OpenAPI
- filas para processamento assíncrono

## Valor de portfólio

Este projeto demonstra:
- modelagem de domínio orientada a regras reais de negócio;
- organização de backend modular;
- autenticação segura com JWT;
- uso de ORM e relacionamento entre entidades;
- visão de produto aplicada a um nicho com problema claro;
- capacidade de traduzir processos operacionais em software.

## Licença

MIT
