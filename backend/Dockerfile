FROM node:18 AS backend
WORKDIR /backend
COPY . .
RUN yarn install
CMD ["yarn", "start:dev"]