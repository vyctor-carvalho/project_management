# apps/backend/Dockerfile

# --- Estágio 1: Builder ---
# Este estágio foca em instalar todas as dependências
# e compilar o código TypeScript para JavaScript.
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Instala o pnpm
RUN npm install -g pnpm

# Copia os ficheiros de configuração do pnpm e o package.json da RAIZ do monorepo.
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./

# Copia os ficheiros específicos do backend e os pacotes partilhados
COPY apps/backend ./apps/backend
COPY packages ./packages

# Instala TODAS as dependências (incluindo devDependencies) para o build funcionar
RUN pnpm install --prod=false

# Executa o comando de build do backend
RUN pnpm --filter backend build


# --- Estágio 2: Runner ---
# Este é o estágio final, que resulta numa imagem leve, contendo apenas o
# necessário para rodar a aplicação em produção.
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV production

# Copia o package.json do backend para referência
COPY apps/backend/package.json ./apps/backend/

# --- CORREÇÃO PRINCIPAL ---
# Copia a pasta node_modules completa do estágio 'builder'.
# Isto é mais fiável do que reinstalar as dependências.
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copia o código compilado (a pasta 'dist') do estágio 'builder'
COPY --from=builder /usr/src/app/apps/backend/dist ./apps/backend/dist

# Expõe a porta que a aplicação escuta
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["node", "apps/backend/dist/main"]