FROM node:16.13.0-alpine

WORKDIR /usr/app

COPY . .

RUN npm i
RUN npm run build

CMD ["npm", "run", "test"]