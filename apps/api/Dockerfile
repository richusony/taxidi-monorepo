# ---- Builder ----
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN pnpm install
RUN pnpm --filter @taxidi/database db:generate
RUN pnpm --filter @taxidi/api build

# ---- Runner ----
FROM node:22-alpine
WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app /app

WORKDIR /app/apps/api

EXPOSE 8080

CMD ["pnpm", "run", "start"]