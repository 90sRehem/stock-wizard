FROM node:20-slim AS base

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY package.json ./


RUN pnpm install

# RUN pnpm prisma generate
COPY prisma ./prisma/

COPY . .

EXPOSE 3333

CMD [ "pnpm", "start:dev" ]
