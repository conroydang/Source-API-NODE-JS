# ENVIRONMENT PREPARESTATION STAGE
FROM node:alpine AS ENVIRONMENT

ENV PYTHONUNBUFFERED=1

RUN apk add --update --no-cache build-base python3 && \
  ln -sf python3 /usr/bin/python && \
  python3 -m ensurepip && \
  pip3 install --no-cache --upgrade pip setuptools

# BUILD STAGE
FROM node:latest AS BUILDER

WORKDIR /src/app
COPY package.json package-lock.json ./
RUN npm cache clean --force && npm install

COPY . .

RUN npm run build

# RUN npm run build; \
#   mkdir ./lib/configs

# COPY ./src/configs/config.js ./lib/configs/config.js
# COPY ./src/configs/config.prod.js ./lib/configs/config.prod.js

FROM ENVIRONMENT

WORKDIR /opt/app

RUN npm init --yes; \
  npm install --save \
    bcrypt \
    body-parser \
    cors \
    express \
    jsonwebtoken \
    mongodb

COPY --from=BUILDER /src/app/lib .

EXPOSE 3000

CMD [ "node", "./index.js" ]
