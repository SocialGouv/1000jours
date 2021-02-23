FROM node:15-alpine

WORKDIR /app

RUN chown node:node /app

COPY package.json .
COPY yarn.lock .

ENV NODE_ENV=production

# need expo-cli and typescript@~4.0.0 @types/react@~16.9.35
RUN yarn install --frozen-lockfile
RUN yarn global add expo-cli
RUN yarn add --dev typescript@~4.0.0 @types/react@~16.9.35

COPY . .

USER node

ENTRYPOINT ["yarn", "start:web"]
