FROM node:8.10.0
COPY . /app
WORKDIR /app
RUN npm install
CMD npm start
