FROM node:15-alpine as builder

WORKDIR /app
RUN chown node:node /app
ENV NODE_ENV=production

COPY yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn fetch --immutable

# need expo-cli and typescript@~4.0.0 @types/react@~16.9.35
RUN yarn global add expo-cli
RUN yarn add --dev typescript@~4.0.0 @types/react@~16.9.35 @types/react-native@~0.63.2

COPY . .

RUN yarn expo build:web

FROM ghcr.io/socialgouv/docker/nginx4spa:6.58.3

COPY --from=builder /app/web-build /usr/share/nginx/html

