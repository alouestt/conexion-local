# ── Etapa 1: construcción ────────────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
# El resultado del build queda en /app/dist

# ── Etapa 2: servidor de producción ──────────────────────────────────────────
FROM nginx:alpine

# Copia los archivos estáticos generados
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuración de nginx: sirve el SPA y hace proxy de /api al backend
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
