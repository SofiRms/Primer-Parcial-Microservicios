FROM node:18-alpine

WORKDIR /servidor

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3007

CMD ["npm", "run", "dev"]