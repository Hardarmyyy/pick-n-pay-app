# Use an official Node.js runtime as a parent image
FROM node:slim AS builder

# Set the working directory in the container
WORKDIR /CLIENT

# Copy only the package files to Docker
COPY package*.json ./

# Install app dependencies with the exact versions
RUN npm ci

# Copy the current directory contents into the container at /CLIENT
COPY . /CLIENT

# Define environment variable
ENV NODE_ENV=production

ENV VITE_API_URI=http://localhost:4080/api/v1

RUN npm run build

# Make port 5173 available to the world outside this container
EXPOSE 5173

# Run the command
ENTRYPOINT [ "npm", "start" ]