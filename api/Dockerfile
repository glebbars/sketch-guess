# Use a base image with Node.js
FROM node:18

# Set the working directory
WORKDIR /usr/code

# Copy package.json and package-lock.json to the working directory
COPY . .

# Install dependencies
RUN npm install

# Expose the port defined in the environment variable
# EXPOSE ${PORT}

# Set the command to start the backend server
CMD ["npm", "run", "dev"]






