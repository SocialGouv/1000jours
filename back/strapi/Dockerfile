FROM strapi/base:14

WORKDIR /app

COPY . .

RUN yarn --production --frozen-lockfile --prefer-offline && yarn cache clean

ENV NODE_ENV=production

RUN yarn build

CMD ["yarn", "start"]
