FROM node:12.18.4

RUN npm config set registry https://registry.npm.taobao.org

ENV FRONTEND=/front/

WORKDIR $FRONTEND

COPY package.json $FRONTEND
RUN npm install 

COPY . $FRONTEND
RUN node serve


