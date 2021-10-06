
FROM node:latest AS development

WORKDIR /usr/src/app

COPY ../package.json .


RUN yarn install

COPY .. .

RUN yarn build movie-server

FROM node:latest as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ../package*.json ./

RUN yarn install

COPY .. .

COPY --from=development /usr/src/app/dist/apps/movie-server ./dist

ENV AWS_ACCESS_KEY_ID=AKIA2VTG723IQ45MPRQV
ENV AWS_SECRET_ACCESS_KEY=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
ENV AWS_REGION=ap-northeast-2

ENV PORT_MOVIE=3702
ENV PORT_CONTRACT=3702
ENV TABLE_MOVIE=movie
ENV TABLE_CONTRACT=movie

ENV BASE_URL=http://gateway-server

ENV URL_USER=http://user-server:3701
ENV URL_MOVIE=http://movie-server:3702

CMD ["yarn", "start:prod", "movie-server"]