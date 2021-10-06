FROM node:latest 

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ../apps/gateway-server/package.json /usr/src/app 
RUN yarn install

COPY ../apps/gateway-server .

ENV NODE_ENV=production
ENV PORT=3700

ENV URL_USER=http://user-server:3701
ENV URL_MOVIE=http://movie-server:3702

EXPOSE 3700

CMD ["yarn", "start"]
