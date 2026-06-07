FROM node:18-alpine

WORKDIR /app

# Instala dependencias primero para aprovechar la caché de capas de Docker
COPY package*.json ./
RUN npm install --omit=dev

# Copia el código fuente
COPY src/ ./src/

EXPOSE 3000

CMD ["node", "src/server.js"]
