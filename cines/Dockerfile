# Etapa de construcción
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./  
RUN npm ci --silent                    
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:1.25-alpine
COPY --from=builder /app/dist /usr/share/nginx/html  
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]