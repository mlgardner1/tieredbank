FROM node:slim

WORKDIR /app

# copy code, install npm dependencies
COPY . /app/
COPY package.json /app/package.json
COPY firebase.js /app/firebase.js
RUN npm install

WORKDIR /app
EXPOSE 27017
COPY --from=0 /app ./
