FROM node:12.2.0-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY src ./

EXPOSE 3000

CMD npm start