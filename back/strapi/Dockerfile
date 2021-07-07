FROM strapi/base:14

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --production

COPY . .

ENV NODE_ENV production

RUN yarn build

CMD ["yarn", "start"]
