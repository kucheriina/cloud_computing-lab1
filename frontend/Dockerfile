FROM node:18 AS frontend
WORKDIR /frontend
COPY . .
RUN yarn install
CMD ["yarn", "start"]