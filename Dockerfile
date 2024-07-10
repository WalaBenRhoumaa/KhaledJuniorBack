FROM node:20.5.0  

WORKDIR /usr/src/app 

COPY package*.json ./

RUN npm install -f

COPY . .

EXPOSE 6668

CMD ["node","server.js"]
