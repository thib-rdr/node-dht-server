FROM node:carbon-alpine

RUN mkdir /src
WORKDIR /src

COPY package.json /src/package.json  
COPY yarn.lock /src/yarn.lock

RUN yarn install

COPY . /src

EXPOSE 8000

CMD ["node" ,"dht-server"]