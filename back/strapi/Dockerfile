FROM strapi/base:14

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    libnss3 ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 \
    libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 \
    libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 \
    libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 \
    libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN yarn --production --frozen-lockfile --prefer-offline && \
    yarn cache clean --ignore-scripts

ENV NODE_ENV=production \
    TZ=Europe/Paris

RUN yarn build

RUN adduser --uid 1001 strapi && \
    chown -R strapi:strapi /app
USER 1001

CMD ["yarn", "start"]
