
#
# Build static site
#
FROM node:26-alpine AS builder

RUN npm install -g pnpm@12.21.0

WORKDIR /app

ENV APP_ENV="beta"

COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY vendor/html-to-image ./vendor/html-to-image

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

#
# Runtime
#
FROM nginx:alpine

RUN apk add --no-cache gettext

RUN rm -f /etc/nginx/conf.d/default.conf

COPY ./beta/nginx.conf /etc/nginx/templates/default.conf.template

COPY --from=builder /app/dist/ /var/www/dist/

CMD ["nginx", "-g", "daemon off;"]
