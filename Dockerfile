FROM node:lts-alpine as build-stage
WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build

FROM node:lts-alpine
WORKDIR /usr/src/app
COPY --from=build-stage /usr/src/app/dist ./dist
COPY ormconfig.js package.json package-lock.json tsconfig-paths-bootstrap.js tsconfig.json ./
RUN npm install --production

CMD ["npm", "run", "start:prod"]
EXPOSE 3000 3443