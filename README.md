<h1 align="center">Rinha de Backend - Nodejs- 2024/Q1</h1>

A imagem utilizada para o projeto é a nodejs:21-bullseye-slim. As dependências foram escolhidas com base no menor número possível de dependências (small footprint).

- [**Fastify**](https://fastify.dev/): Framework web para aplicações javascript com foco em performance;
- [**Drizzle**](https://orm.drizzle.team): ORM para TypeScript;
- [**Zod**](https://zod.dev): Validação de dados com TypeScript;
- [**PostgreSQL**](https://orm.drizzle.team/docs/get-started-postgresql): Banco de dados relacional;
- [**Vitest**](https://vitest.dev/): Framework de testes, utilizado para realizar testes unitários;

## Instruções para execução do projeto local

```bash

# Instalar as dependências
npm i

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
$ cp .env.example .env

# Iniciar o projeto
docker compose up -d

# Executar as migrations
npm run db:migrate

# Executar o seed
npm run db:seed

# Executar o projeto em modo de desenvolvimento
npm run start:dev
```
