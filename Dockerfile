<<<<<<< HEAD
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
CMD ["sh","run.sh"]



=======
FROM node:12.18.3

RUN npm config set registry https://registry.npm.taobao.org

ENV HOME=/opt/app

WORKDIR $HOME

COPY package.json $HOME
COPY package-lock.json $HOME
RUN npm install

COPY . $HOME
RUN npm run build

ENV SERVER_PORT 80
EXPOSE 80

CMD ["node", "index.js"]
>>>>>>> 217b562... modification after changing the frame:
