FROM node:20

WORKDIR /usr/src

COPY . .

EXPOSE 5000

RUN npm i

CMD [ "npm", "start" ]