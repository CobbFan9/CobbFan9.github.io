FROM node:26-alpine AS builder

WORKDIR /app

ARG WORKER_URL
ENV WORKER_URL=$WORKER_URL
ARG AUTH_SERVER
ENV AUTH_SERVER=$AUTH_SERVER

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache gettext
RUN rm -f /etc/nginx/conf.d/default.conf

COPY ./beta/nginx.conf.template /etc/nginx/templates/nginx.conf.template

COPY --from=builder /app/dist/ /var/www/dist/

EXPOSE 8080

ENV WORKER_URL=""
ENV NGINX_SECRET=""

CMD ["/bin/sh", "-c", "echo 'Generating Nginx config...' && envsubst '${WORKER_URL} ${NGINX_SECRET}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf && cat /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]