FROM node:12.18.3

RUN npm config set registry https://registry.npm.taobao.org

ENV HOME=/app

WORKDIR $HOME

COPY ./ $HOME
RUN npm install && npm run build

CMD npm run serve