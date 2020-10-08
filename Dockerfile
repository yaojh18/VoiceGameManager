FROM node:12.18.4

RUN npm config set registry https://registry.npm.taobao.org

ENV FRONTEND=/opt/frontend

WORKDIR $FRONTEND

COPY frontend/package.json $FRONTEND
COPY frontend/package-lock.json $FRONTEND
RUN npm install 
RUN npm install axios --save

COPY frontend $FRONTEND
RUN npm build

ENV SERVER_PORT 80
EXPOSE 80
CMD ["sh","bin/www"]



