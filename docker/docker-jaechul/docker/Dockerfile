FROM node:16

WORKDIR /usr/src/app

RUN git clone https://github.com/jaechullee2/docker-chullee.git
WORKDIR docker-chullee
RUN npm install

EXPOSE 8000

CMD ["node", "app.js"]
