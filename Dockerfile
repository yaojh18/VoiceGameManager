FROM node:12.18.3

RUN npm config set registry https://registry.npm.taobao.org

ENV HOME=/opt/app

WORKDIR $HOME

COPY package.json $HOME
COPY package-lock.json $HOME

COPY . $HOME
RUN npm install && npm run build

FROM nginx
RUN mkdir /opt/app
COPY --from=0 /opt/app/dist /opt/app
COPY nginx.conf /etc/nginx/nginx.conf

ENV SERVER_PORT 80
EXPOSE 80

CMD ["sh","run.sh"]
