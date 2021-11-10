FROM node:latest
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install
CMD [ "node", "server.js" ]