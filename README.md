# Plataforma de Gestão de Projetos - ProjectHub

![Status: Em Desenvolvimento](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

Esta é uma plataforma full-stack para gestão de perfis de colaboradores, projetos e tarefas, desenvolvida numa arquitetura monorepo com `pnpm`. O backend é construído com NestJS e o frontend com Next.js.

## Tecnologias Utilizadas

- **Monorepo:** `pnpm` workspaces
- **Backend:**
  - [**NestJS**](https://nestjs.com/)
  - [**TypeORM**](https://typeorm.io/)
  - [**PostgreSQL**](https://www.postgresql.org/)
  - Autenticação com **JWT** (Access & Refresh Tokens)
- **Frontend:**
  - [**Next.js**](https://nextjs.org/)
  - [**React**](https://reactjs.org/)
  - **Tailwind CSS**
- **Linguagem:** [**TypeScript**](https://www.typescriptlang.org/) em todo o projeto.

---

## Estado Atual do Projeto

### Backend
O backend está **totalmente funcional**. Todas as rotas de CRUD, autenticação e regras de negócio estão implementadas. A base de dados é versionada através de migrations.

### Frontend
O frontend está em **desenvolvimento inicial**.
- A página de **Login** está funcional e comunica com o backend para autenticar o utilizador.
- Após o login, as páginas de **Dashboard, Projetos e Equipas** são renderizadas, mas estão a usar **dados mockados (estáticos)**. A integração destas páginas com a API do backend ainda não foi concluída.

---

## Como Rodar o Projeto Manualmente

Visto que a configuração do Docker está com problemas, a forma mais fiável de executar o projeto é manualmente. Siga estes passos:

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [pnpm](https://pnpm.io/installation)
- Uma instância do [PostgreSQL](https://www.postgresql.org/download/) a correr localmente.

### Passo 1: Clonar o Repositório
```bash
git clone https://github.com/vyctor-carvalho/project_management
cd project_management
```

### Passo 2: Instalar Dependências
Na raiz do projeto, instale todas as dependências do monorepo com um único comando:
```bash
pnpm install
```

### Passo 3: Configurar a Base de Dados
1. Crie uma base de dados no seu PostgreSQL (ex: `projecthub`).
2. Navegue até à pasta do backend: `cd apps/backend`.
3. Copie o ficheiro de exemplo `.env.example` para um novo ficheiro `.env`:
   ```bash
   cp .env.example .env
   ```
4. Edite o ficheiro `.env` e atualize a variável `DATABASE_URL` com os seus dados de acesso ao PostgreSQL.
   ```
   # API_PORT
    PORT=3001

    # Database 
    DATABASE_URL="postgresql://seu_user:sua_senha@localhost:5432/banco_de_dados"

    # JWT
    JWT_SECRET=SEU_TOKEN_SECRETO
    REFRESH_SECRET=SEU_REFRESH_TOKEN_SECRETO

    JWT_EXPIRES_IN=EM_HORAS_OU_MINITOS
    REFRESH_TOKEN_EXPIRES_IN=EM_DIAS

   ```

### Passo 4: Rodar as Migrations do Backend
As migrations irão criar todas as tabelas necessárias e popular a base de dados com dados iniciais (roles, áreas e um utilizador admin).

Ainda na pasta `apps/backend`, execute:
```bash
pnpm run migration:run
```
Isto irá executar todas as migrations pendentes.

### Passo 5: Iniciar o Backend
Na pasta `apps/backend`, inicie o servidor de desenvolvimento:
```bash
pnpm run start:dev
```
O backend estará a correr em `http://localhost:3001` (ou na porta definida no seu `.env`).

### Passo 6: Configurar e Iniciar o Frontend
1. Abra um novo terminal e navegue até à pasta do frontend: `cd apps/frontend`.
2. Copie o ficheiro de exemplo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```
3. O ficheiro `.env` já deve conter a variável `NEXT_PUBLIC_API_URL=http://localhost:3001`, que aponta para o seu backend local.
4. Inicie o servidor de desenvolvimento do frontend:
   ```bash
   pnpm run dev
   ```
A aplicação frontend estará acessível em `http://localhost:3000`.

### Credenciais de Acesso
Pode usar o utilizador administrador criado pela migration para fazer login:

- **Email:** `admin@example.com`
- **Senha:** `supersecretpassword`

---

## Documentação da API do Backend
Todas as rotas protegidas requerem um `Bearer Token` no cabeçalho `Authorization`.

### Autenticação (`/auth`)
- **`POST /auth/login`**: Autentica um utilizador e retorna `access_token` e `refresh_token`.
  - **Body**: `{ "email": "user@example.com", "password": "password123" }`
- **`POST /auth/refresh`**: Gera um novo par de tokens usando um `refresh_token` válido.
- **`POST /auth/logout`**: Invalida o `refresh_token` do utilizador.

### Utilizadores (`/users`)
- **`GET /users`**: Lista todos os utilizadores. (Apenas Admin, Manager)
- **`GET /users/:id`**: Obtém um utilizador específico. (Apenas Admin, Manager)
- **`POST /users`**: Cria um novo utilizador. (Apenas Admin)
  - **Body**:
    ```json
    {
      "name": "Nome do Utilizador",
      "authLogin": {
        "email": "novo@email.com",
        "password": "passwordsegura"
      },
      "employmentType": "CLT",
      "BrithDate": "1995-10-20T00:00:00.000Z",
      "roleId": "uuid-da-role"
    }
    ```
- **`PATCH /users/:id`**: Atualiza um utilizador. (Apenas Admin)
- **`DELETE /users/:id`**: Remove um utilizador. (Apenas Admin)

### Projetos (`/projects`)
- **`GET /projects`**: Lista todos os projetos. (Admin)
- **`GET /projects/:id`**: Obtém um projeto específico. (Admin, Manager, Collaborator)
- **`GET /projects/:id/teams`**: Lista as equipas de um projeto, agrupadas por área de expertise. (Admin, Manager)
- **`POST /projects`**: Cria um novo projeto. (Admin, Manager)
  - **Body**:
    ```json
    {
      "name": "Novo Projeto Web",
      "description": "Descrição detalhada do projeto.",
      "technologies": "React, Node.js, TypeScript",
      "deadline": "2025-12-31T23:59:59.000Z"
    }
    ```
- **`PATCH /projects/:id`**: Atualiza um projeto. (Admin, Manager)
- **`DELETE /projects/:id`**: Remove um projeto. (Admin, Manager)

### Tarefas (`/tasks`)
- **`GET /tasks`**: Lista todas as tarefas. (Admin, Manager, Collaborator)
- **`GET /tasks/:id`**: Obtém uma tarefa específica. (Admin, Manager, Collaborator)
- **`POST /tasks`**: Cria uma nova tarefa. (Admin, Manager)
  - **Body**:
    ```json
    {
      "title": "Desenvolver endpoint de login",
      "description": "Criar a rota e a lógica para autenticação de utilizadores.",
      "status": "Pendente",
      "priority": "Alta",
      "dueDate": "2025-09-30T23:59:59.000Z",
      "projectId": "uuid-do-projeto",
      "assigneeId": "uuid-do-utilizador-responsavel",
      "areaId": "uuid-da-area-de-expertise"
    }
    ```
- **`PATCH /tasks/:id`**: Atualiza uma tarefa. (Admin, Manager)
- **`DELETE /tasks/:id`**: Remove uma tarefa. (Admin, Manager)

### Funções (`/roles`)
- **`GET /roles`**: Lista todas as funções (roles). (Apenas Admin)
- **`POST /roles`**: Cria uma nova função. (Apenas Admin)
  - **Body**: `{ "name": "Nova Role" }`
- **`PATCH /roles/:id`**: Atualiza uma função. (Apenas Admin)
- **`DELETE /roles/:id`**: Remove uma função. (Apenas Admin)

### Áreas de Expertise (`/expertise-areas`)
- **`GET /expertise-areas`**: Lista todas as áreas. (Admin, Manager)
- **`GET /expertise-areas/:id/members`**: Lista os membros associados a uma área. (Admin, Manager, Collaborator)
- **`POST /expertise-areas`**: Cria uma nova área. (Admin, Manager)
  - **Body**: `{ "name": "DevOps" }`
- **`PATCH /expertise-areas/:id`**: Atualiza uma área. (Admin, Manager)
- **`DELETE /expertise-areas/:id`**: Remove uma área. (Admin, Manager)

### Membros de Projeto (`/project-members`)
- **`POST /project-members`**: Associa um utilizador a um projeto. (Admin, Manager)
  - **Body**:
    ```json
    {
      "role": "Desenvolvedor Backend",
      "projectId": "uuid-do-projeto",
      "memberId": "uuid-do-utilizador"
    }
    ```
- **`PATCH /project-members/:id`**: Atualiza a associação de um membro a um projeto. (Admin, Manager)

### Associações de Expertise (`/user-expertise-areas`)
- **`POST /user-expertise-areas`**: Associa um utilizador a uma área de expertise. (Admin, Manager)
  - **Body**:
    ```json
    {
      "userId": "uuid-do-utilizador",
      "expertiseAreaId": "uuid-da-area"
    }
    ```