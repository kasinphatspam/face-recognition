FROM node:lts-alpine AS prepare

WORKDIR /build
COPY /apps/backend/package.json yarn.lock ./

RUN yarn install


FROM node:lts-alpine AS builder

WORKDIR /build
COPY --from=prepare /build/node_modules ./node_modules
COPY /apps/backend/. .

RUN yarn build

EXPOSE 3001

CMD ["yarn", "start:prod"]