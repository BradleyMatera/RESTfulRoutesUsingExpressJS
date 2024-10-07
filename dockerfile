# Use the node:18-alpine image as base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . .

# Install Python, make, g++, and curl development headers
RUN apk add --no-cache python3 make g++ curl curl-dev

# Install the package globally
RUN npm install -g @jworkman-fs/wdv-cli

# Default command to run in the container
CMD ["sh"]