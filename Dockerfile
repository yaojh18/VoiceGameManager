FROM node:12.18.3

RUN npm config set registry https://registry.npm.taobao.org

ENV HOME=/opt/app

WORKDIR $HOME

COPY package.json $HOME
COPY package-lock.json $HOME
RUN npm install

COPY . $HOME
RUN npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

ENV SERVER_PORT 80
EXPOSE 80

CMD ["sh","run.sh"]
