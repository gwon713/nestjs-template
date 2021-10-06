FROM node:latest AS development

WORKDIR /usr/src/app

COPY ../package.json .


RUN yarn install

COPY .. .

RUN yarn build user-server

FROM node:latest as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ../package*.json ./

RUN yarn install

COPY .. .

COPY --from=development /usr/src/app/dist/apps/user-server ./dist

ENV AWS_ACCESS_KEY_ID=AKIA2VTG723IQ45MPRQV
ENV AWS_SECRET_ACCESS_KEY=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
ENV AWS_REGION=ap-northeast-2
ENV PORT_USER=3701
ENV TABLE_USER=user

ENV BASE_URL=http://gateway-server

ENV URL_USER=http://user-server:3701

CMD ["yarn", "start:prod", "user-server"]