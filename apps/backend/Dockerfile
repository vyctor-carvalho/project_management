# apps/backend/Dockerfile

# --- Estágio 1: Builder ---
# Este estágio foca em instalar todas as dependências
# e compilar o código TypeScript para JavaScript
FROM node:20-alpine AS builder

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Instala o pnpm
RUN npm install -g pnpm

# Copia os arquivos de configuração do pnpm e o package.json da RAIZ do monorepo.
# O Docker Compose vai executar a partir da raiz, então esses caminhos funcionam.
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./

# Copia os arquivos específicos do backend e os pacotes compartilhados
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

# Instala o pnpm
RUN npm install -g pnpm

# Copia novamente os arquivos de configuração para que possamos instalar
# apenas as dependências de produção.
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/backend/package.json ./apps/backend/
COPY packages ./packages

# Instala APENAS as dependências de produção, resultando em uma pasta node_modules menor
RUN pnpm install --prod

# Copia o código compilado (a pasta 'dist') do estágio 'builder'
COPY --from=builder /usr/src/app/apps/backend/dist ./apps/backend/dist

# Expõe a porta que a aplicação escuta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "apps/backend/dist/main"]