FROM node:lts-alpine as build-stage
WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run tsc

CMD ["npm", "run", "start:prod"]
EXPOSE 3000 3443