FROM node:21.6-alpine as build

WORKDIR "/app"

COPY ./package*.json ./

RUN npm install

COPY . .

FROM build as dev

CMD ["npm", "run", "dev"]

FROM build as prod

CMD ["npm", "run", "prod"]

