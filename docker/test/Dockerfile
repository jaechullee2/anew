FROM node:16

WORKDIR /usr/src/app

ADD git https://github.com/jaechullee2/anew/tree/main/docker/test
RUN npm install

EXPOSE 8000

CMD ["node", "app.js"]
