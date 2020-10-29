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
