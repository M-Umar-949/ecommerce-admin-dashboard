FROM node:23

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose Vue dev server port
EXPOSE 3000

# Run Vue development server
CMD ["npm", "run", "serve"]
