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
ENV SERVER_PORT 80
EXPOSE 80

# CMD ["sh","run.sh"]
