FROM node:latest
MAINTAINER Olivier Cartier <colivier.dev@gmail.com>

WORKDIR /app
COPY package.json /app
RUN npm install

COPY server.js /app
COPY res /app/res
COPY README.md /app

EXPOSE 80
CMD [ "npm", "start" ]