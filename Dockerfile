# Use an official Node.js runtime as a parent image
FROM node:20

# Create the app directory
WORKDIR /usr/src/app

# Install app
COPY package*.json ./
COPY . .

# Run
CMD [ "npm", "start" ]