FROM --platform=$BUILDPLATFORM node:19-alpine3.15 AS dev
WORKDIR /app
COPY package.json .
RUN yarn install --frozen-lockfile
CMD [ "yarn", "start:dev" ]

FROM --platform=$BUILDPLATFORM node:19-alpine3.15 AS dev-deps
WORKDIR /app
COPY package.json package.json
RUN yarn install --frozen-lockfile


FROM --platform=$BUILDPLATFORM node:19-alpine3.15 AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
# RUN yarn test
RUN yarn build

FROM --platform=$BUILDPLATFORM node:19-alpine3.15 AS prod-deps
WORKDIR /app
COPY package.json package.json
RUN yarn install --prod --frozen-lockfile


FROM --platform=$BUILDPLATFORM node:19-alpine3.15 AS prod
EXPOSE ${PORT}
WORKDIR /app
ENV APP_VERSION=${APP_VERSION}
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD [ "node","dist/main.js"]









