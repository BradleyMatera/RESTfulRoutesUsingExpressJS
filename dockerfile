# Use an official Node.js image
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port
EXPOSE 8080

# Start the app
CMD ["npm", "start"]