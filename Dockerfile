FROM node:12.18.3

RUN npm config set registry https://registry.npm.taobao.org

<<<<<<< HEAD
ENV HOME=/app

WORKDIR $HOME

COPY ./ $HOME
RUN npm install && npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
=======
ENV HOME=/opt/app

WORKDIR $HOME

COPY package.json $HOME
COPY package-lock.json $HOME
RUN npm install

COPY . $HOME
RUN npm run build
>>>>>>> 0b9e2c374cf3a2f095f99321e87fc551f7772e7e

ENV SERVER_PORT 80
EXPOSE 80

<<<<<<< HEAD
# CMD ["sh","run.sh"]
=======
CMD ["node", "index.js"]
>>>>>>> 0b9e2c374cf3a2f095f99321e87fc551f7772e7e
