
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production


COPY . .

EXPOSE 3000


CMD ["node", "app.js"]  # Change 'app.js' to your actual entry point if different
