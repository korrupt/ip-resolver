FROM node:18-alpine AS base

RUN corepack enable

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install --frozen-lockfile

FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=base ./app/node_modules ./node_modules
COPY . ./

RUN node node_modules/.bin/nx run api:webpack:production

FROM node:18-alpine AS app

WORKDIR /app

COPY --from=builder ./app/dist/apps/api .

RUN yarn install --frozen-lockfile

CMD ["node", "main.js"]

