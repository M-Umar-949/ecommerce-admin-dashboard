# Frontend Dockerfile (current - works fine)
FROM node:23
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0"]