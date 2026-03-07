# ---- Builder ----
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm
RUN npm i -g typescript

COPY ../ .

RUN pnpm install
RUN pnpm --filter @taxidi/database db:generate
RUN pnpm -r build

# ---- Runner ----
FROM node:22-alpine AS runner
WORKDIR /taxidi

RUN npm install -g pnpm

COPY --from=builder /app /taxidi

WORKDIR /taxidi/apps/api

EXPOSE 8080

CMD ["pnpm", "run", "start"]