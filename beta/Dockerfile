FROM node:26-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache gettext
RUN rm -f /etc/nginx/conf.d/default.conf

COPY ./beta/nginx.conf /etc/nginx/templates/nginx.conf

COPY --from=builder /app/dist/ /var/www/dist/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]