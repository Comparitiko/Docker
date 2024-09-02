# Install deps stage
FROM --platform=$BUILDPLATFORM node:20.17-alpine AS dependencies

WORKDIR /app

COPY ./package.json .

RUN npm install

# Test stage
FROM --platform=$BUILDPLATFORM node:20.17-alpine AS tester

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

RUN npm run test

# Install prod deps
# Runner stage
FROM --platform=$BUILDPLATFORM node:20.17-alpine AS prod-dependencies

WORKDIR /app

COPY ./package.json .

RUN npm install --omit=dev

# Runner stage
FROM --platform=$BUILDPLATFORM node:20.17-alpine AS runner

WORKDIR /app

COPY ./src ./src

COPY ./package.json .

COPY --from=prod-dependencies /app/node_modules ./node_modules

CMD [ "npm", "start" ]