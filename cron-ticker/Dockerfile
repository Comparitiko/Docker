# /app
# FROM node:20.17-alpine

# Crear imgs para diferentes arquitecturas
# docker buildx build \
# --platform linux/amd64,linux/amd64/v2,linux/amd64/v3,linux/386 \
# -t comparitiko/cront-ticker:latest  --push .
FROM --platform=$BUILDPLATFORM node:20.17-alpine

# cd app
WORKDIR /app

# package.json
COPY package.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia en la imagen el archivo app.js en /app
COPY . .

# Realizar testing
RUN npm run test

# Eliminar dev dependencies y archivos no necesarios en prod
RUN rm -rf tests && rm -rf node_modules

# Solo se instalan las deps de produccion
RUN npm install --prod

# Inicia la aplicacion
CMD ["npm", "start"]