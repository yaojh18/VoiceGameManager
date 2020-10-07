FROM node:12.18.4

RUN npm config set registry https://registry.npm.taobao.org

ENV FRONTEND=/opt/frontend

WORKDIR $FRONTEND

COPY frontend/package.json $FRONTEND
RUN npm install 

COPY frontend $FRONTEND
RUN npm start

EXPOSE 80


