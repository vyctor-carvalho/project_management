# ProjectHub - Frontend

Uma plataforma moderna de gestão de projetos e colaboradores desenvolvida com Next.js 14, TypeScript e Tailwind CSS.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones modernos
- **Axios** - Cliente HTTP para requisições à API
- **Docker** - Containerização da aplicação

## 📋 Funcionalidades

### Autenticação
- Login com email e senha
- Refresh automático de tokens
- Proteção de rotas com middleware
- Contexto de autenticação global

### Gestão de Projetos
- Listagem de projetos com filtros
- Visualização de status e prazos
- Interface inspirada no Jira/Atlassian
- Cards informativos com tecnologias e equipe

### Gestão de Equipes
- Listagem de colaboradores
- Informações de cargo e tipo de contratação
- Interface inspirada no Atlassian Teams
- Busca e filtros avançados

### Dashboard
- Visão geral de estatísticas
- Projetos recentes
- Métricas de produtividade
- Interface responsiva

## 🏗️ Arquitetura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── dashboard/         # Página do dashboard
│   ├── login/            # Página de login
│   ├── projects/         # Página de projetos
│   ├── teams/            # Página de equipes
│   ├── layout.tsx        # Layout raiz
│   └── page.tsx          # Página inicial
├── components/            # Componentes React
│   ├── layout/           # Componentes de layout
│   │   ├── Header.tsx    # Cabeçalho da aplicação
│   │   ├── Layout.tsx    # Layout principal
│   │   └── Sidebar.tsx   # Barra lateral de navegação
│   └── ui/               # Componentes UI reutilizáveis
│       ├── Avatar.tsx    # Componente de avatar
│       ├── Badge.tsx     # Componente de badge
│       ├── Button.tsx    # Componente de botão
│       ├── Card.tsx      # Componente de card
│       └── Input.tsx     # Componente de input
├── contexts/             # Contextos React
│   └── AuthContext.tsx   # Contexto de autenticação
├── services/             # Serviços de API
│   ├── authService.ts    # Serviço de autenticação
│   ├── expertiseAreaService.ts # Serviço de áreas de expertise
│   ├── projectService.ts # Serviço de projetos
│   ├── roleService.ts    # Serviço de cargos
│   ├── taskService.ts    # Serviço de tarefas
│   └── userService.ts    # Serviço de usuários
├── types/                # Definições TypeScript
│   └── index.ts          # Tipos da aplicação
└── utils/                # Utilitários
    ├── api.ts            # Cliente HTTP configurado
    └── cn.ts             # Utilitário para classes CSS
```

## 🔧 Configuração e Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Docker (opcional)

### Instalação Local

1. **Clone o repositório**
```bash
git clone <repository-url>
cd project-management-frontend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

4. **Execute em modo de desenvolvimento**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### Execução com Docker

1. **Build e execução com docker-compose**
```bash
docker-compose up --build
```

2. **Apenas o frontend**
```bash
docker build -t projecthub-frontend .
docker run -p 3000:3000 projecthub-frontend
```

## 🔐 Autenticação

### Credenciais de Teste
- **Email:** vyctor.carvalho@gmail.com
- **Senha:** umaSenhaBemForte123!

### Fluxo de Autenticação
1. Login com email/senha
2. Recebimento de token JWT e refresh token
3. Armazenamento seguro no localStorage
4. Refresh automático de tokens expirados
5. Redirecionamento automático para login em caso de erro

## 📡 Integração com API

### Configuração Base
- URL base configurável via variável de ambiente
- Interceptors para adição automática de tokens
- Tratamento automático de refresh de tokens
- Tratamento de erros centralizado

### Endpoints Suportados
- `POST /auth/login` - Autenticação
- `GET /users` - Listagem de usuários
- `GET /projects` - Listagem de projetos
- `GET /tasks` - Listagem de tarefas
- `GET /roles` - Listagem de cargos
- `GET /expertise-areas` - Listagem de áreas de expertise

## 🎨 Design System

### Componentes UI
- **Button** - Botões com variantes (primary, secondary, outline, ghost, danger)
- **Input** - Campos de entrada com labels e validação
- **Card** - Containers para conteúdo
- **Avatar** - Avatares com fallback para iniciais
- **Badge** - Indicadores de status

### Cores e Temas
- Paleta baseada em Tailwind CSS
- Cores semânticas para status (success, warning, danger)
- Design responsivo mobile-first

## 📱 Responsividade

- Design mobile-first
- Breakpoints do Tailwind CSS
- Sidebar colapsível em dispositivos móveis
- Grid responsivo para cards e listas

## 🔒 Segurança

- Proteção de rotas com middleware
- Tokens JWT com refresh automático
- Sanitização de inputs
- Headers de segurança configurados

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Docker Production
```bash
docker build -t projecthub-frontend .
docker run -p 3000:3000 -e NODE_ENV=production projecthub-frontend
```

## 📝 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Execução de produção
npm run lint         # Linting com ESLint
npm run type-check   # Verificação de tipos TypeScript
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe

- **Desenvolvedor Frontend** - Implementação da interface e integração com API
- **Designer UX/UI** - Design da interface e experiência do usuário
- **Desenvolvedor Backend** - API e integração com banco de dados

## 📞 Suporte

Para dúvidas ou suporte, entre em contato:
- Email: suporte@projecthub.com
- Documentação: [docs.projecthub.com](https://docs.projecthub.com)

---

Desenvolvido com ❤️ usando Next.js e TypeScript

