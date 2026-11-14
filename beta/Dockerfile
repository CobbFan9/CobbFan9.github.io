FROM node:26-alpine AS builder

WORKDIR /app

ARG WORKER_URL
ENV WORKER_URL=$VITE_WORKER_URL
ARG AUTH_SERVER
ENV AUTH_SERVER=$AUTH_SERVER

COPY package*.json ./
RUN npm ci

COPY ./.. .
RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache gettext

RUN rm -f /etc/nginx/conf.d/default.conf

COPY ./beta/nginx.conf.template /etc/nginx/templates/nginx.conf.template

EXPOSE 8080

ENV WORKER_URL=""
ENV NGINX_SECRET=""
ENV AUTH_SERVER=""

COPY --from=builder /app/dist/ /var/www/dist/

CMD ["/bin/sh", "-c", "envsubst '${WORKER_URL} ${NGINX_SECRET}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
