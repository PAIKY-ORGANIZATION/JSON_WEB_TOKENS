FROM node:20-bullseye
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3002

#* DEFINED IN docker-compose.yml
# CMD ["npm", "run", "dev_docker"]