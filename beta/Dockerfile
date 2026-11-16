
FROM node:26-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache gettext

RUN rm -f /etc/nginx/conf.d/default.conf

COPY ./beta/nginx.conf /etc/nginx/templates/default.conf.template

COPY --from=builder /app/dist/ /var/www/dist/

CMD ["nginx", "-g", "daemon off;"]
