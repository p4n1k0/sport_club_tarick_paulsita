FROM node:16.14-alpine
WORKDIR /app-frontend
COPY package* ./
EXPOSE 3000
COPY . .
RUN npm install
CMD ["npm", "start"]
