# Plataforma de Gestão de Colaboradores

![Status: Em Desenvolvimento](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

Este projeto é uma plataforma full-stack para gerenciamento de perfis de colaboradores, projetos e tarefas, desenvolvida como parte de um desafio técnico para uma vaga de Desenvolvedor Fullstack Jr.

## Principais Funcionalidades

- **Gerenciamento de Colaboradores:** Cadastro, edição e visualização de perfis.
- **Controle de Acesso Baseado em Papéis:** Níveis de permissão distintos para Colaboradores (Normal), Gestores e Administradores.
- **Gerenciamento de Projetos:** Criação de projetos e alocação de colaboradores em equipes.
- **Gerenciamento de Tarefas:** Atribuição de tarefas específicas a colaboradores dentro de um projeto.
- **Arquitetura Monorepo:** Código do frontend e backend centralizado em um único repositório para melhor organização e compartilhamento de código.

## Tecnologias Utilizadas

Este projeto foi construído com uma stack moderna de JavaScript/TypeScript.

- **Backend:**
  - [**NestJS**](https://nestjs.com/) - Um framework Node.js progressivo para construir aplicações eficientes e escaláveis.
  - [**TypeScript**](https://www.typescriptlang.org/) - Para um código mais seguro e robusto.

- **Frontend:**
  - [**Next.js**](https://nextjs.org/) - O framework React para produção.
  - [**React**](https://reactjs.org/) - Para a construção da interface de usuário.
  - [**TypeScript**](https://www.typescriptlang.org/)

- **Banco de Dados:**
  - **PostgreSQL / MySQL** - Banco de dados relacional para persistência dos dados.

- **Ferramentas e Estrutura:**
  - [**pnpm Workspaces**](https://pnpm.io/workspaces) - Para gerenciamento do monorepo.
  - [**ESLint**](https://eslint.org/) - Para linting e manutenção da qualidade do código.

## Estrutura do Projeto

O projeto utiliza uma estrutura de monorepo, organizada da seguinte forma:

```
/
├── apps/
│   ├── backend/      # Aplicação Nest.js
│   └── frontend/     # Aplicação Next.js
├── packages/
│   └── types/        # Tipos e interfaces TypeScript compartilhados
└── package.json      # Dependências e scripts do projeto raiz
```
