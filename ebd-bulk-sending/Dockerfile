# Etapa base
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta
EXPOSE 3000

# Comando padrão (modo dev)
CMD ["yarn", "dev"]