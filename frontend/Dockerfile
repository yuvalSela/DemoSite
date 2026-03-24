FROM node:20-alpine AS build

WORKDIR /app

COPY frontend/package*.json ./frontend/

WORKDIR /app/frontend

RUN npm ci

COPY frontend/ ./

RUN npm run build

FROM nginx:1.29-alpine

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/frontend/dist /usr/share/nginx/html

EXPOSE 80
