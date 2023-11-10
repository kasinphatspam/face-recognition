FROM node:lts-alpine AS prepare

WORKDIR /build
COPY /apps/frontend/package.json yarn.lock ./

RUN yarn install


FROM node:lts-alpine AS builder

WORKDIR /build
COPY --from=prepare /build/node_modules ./node_modules
COPY /apps/frontend/. .

RUN yarn build

EXPOSE 3003

CMD ["yarn", "preview"]