# Use an official Node.js runtime as a parent image
FROM node:14-slim AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Build the app
RUN npm run build

# Use a lighter image for the final stage
FROM node:14-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the previous stage
COPY --from=build /usr/src/app/dist ./dist

# Install only production dependencies
RUN npm install --production

# Make port 5173 available to the world outside this container
EXPOSE 5173

# Run the command
CMD ["npm", "start"]
