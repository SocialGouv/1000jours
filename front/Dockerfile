FROM node:15-alpine as builder

WORKDIR /app

RUN chown node:node /app

COPY package.json .
COPY yarn.lock .

ENV NODE_ENV=production

# need expo-cli and typescript@~4.0.0 @types/react@~16.9.35
RUN yarn install --frozen-lockfile
RUN yarn global add expo-cli
RUN yarn add --dev typescript@~4.0.0 @types/react@~16.9.35 @types/react-native@~0.63.2

COPY . .

ENV EXPO_MANIFEST_PROXY_URL="https://risseraka-chore-d-u8fps8-1000jours.dev2.fabrique.social.gouv.fr"
ENV EXPO_PACKAGER_PROXY_URL="https://expo-metro-risseraka-chore-d-u8fps8-1000jours.dev2.fabrique.social.gouv.fr"
ENV RCT_METRO_PORT=443
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME="expo-metro-risseraka-chore-d-u8fps8-1000jours.dev2.fabrique.social.gouv.fr"


ENTRYPOINT ["yarn", "expo", "start", "--offline", "--non-interactive", "--lan"]


