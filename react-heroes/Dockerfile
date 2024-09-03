# Install deps stage
FROM node:20.17-alpine AS deps
WORKDIR /app
COPY ./package.json .
RUN yarn install --frozen-lockfile

# Builder stage
FROM node:20.17-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn test
RUN yarn build

FROM nginx:1.27 AS prod
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./assets /usr/share/nginx/html/assets
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d

CMD [ "nginx", "-g", "daemon off;" ]