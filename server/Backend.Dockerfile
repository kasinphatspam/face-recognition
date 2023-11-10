FROM node:lts-alpine AS prepare

WORKDIR /build
COPY /apps/backend/package.json yarn.lock ./

RUN yarn install
RUN yarn remove bcrypt
RUN yarn add bcrypt

COPY /apps/backend/. .

RUN yarn build

EXPOSE 3001

CMD ["yarn", "start:prod"]