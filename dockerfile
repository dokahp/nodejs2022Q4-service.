# Installing dependencies:

FROM node:18-alpine AS install-dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev
RUN npm install @nestjs/cli
COPY . .
COPY prisma ./prisma/



# Creating a build:

FROM node:18-alpine AS create-build

WORKDIR /app

COPY --from=install-dependencies /app ./

RUN npm run build
RUN npx prisma migrate deploy

USER node


# Running the application:

FROM node:18-alpine AS run

WORKDIR /app

COPY --from=install-dependencies /app/node_modules ./node_modules
COPY --from=create-build /app/dist ./dist
COPY package.json ./
COPY --from=install-dependencies /app/package*.json ./
COPY --from=install-dependencies /app/prisma ./prisma


CMD ["npm", "run", "start:dev"]