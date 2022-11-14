FROM node:16.13.1

ARG WORKDIR
ARG API_URL

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0 \
    API_URL=${API_URL}

WORKDIR ${HOME}

COPY package*.json ./
RUN yarn install
RUN yarn run build

RUN apt-get update -qq
RUN apt-get install -y iputils-ping net-tools

COPY . ./