# apps/frontend/Dockerfile

# --- Estágio 1: Builder ---
# Este estágio instala todas as dependências (incluindo as de desenvolvimento)
# e constrói a aplicação Next.js para produção.
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Instala o pnpm globalmente
RUN npm install -g pnpm

# Copia os ficheiros de configuração do monorepo
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./

# Copia os ficheiros do frontend e dos pacotes partilhados
COPY apps/frontend ./apps/frontend
COPY packages ./packages

# Instala todas as dependências (incluindo as de desenvolvimento para o build)
RUN pnpm install --prod=false

# Constrói a aplicação frontend para produção
RUN pnpm --filter frontend build

# --- Estágio 2: Runner ---
# Este estágio cria a imagem final, leve e otimizada para produção.
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV production

# Instala o pnpm globalmente
RUN npm install -g pnpm

# Copia os ficheiros de configuração para instalar apenas as dependências de produção
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages ./packages

# Instala apenas as dependências de produção
RUN pnpm install --prod

# Copia os ficheiros construídos do estágio anterior
COPY --from=builder /usr/src/app/apps/frontend/.next ./apps/frontend/.next

# CORREÇÃO: Altera para copiar o ficheiro .mjs que existe no seu projeto
COPY --from=builder /usr/src/app/apps/frontend/next.config.mjs ./apps/frontend/

EXPOSE 3000

# Comando para iniciar a aplicação Next.js em modo de produção
CMD ["pnpm", "--filter", "frontend", "start"]
