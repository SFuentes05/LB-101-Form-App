# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Build the TypeScript code
CMD ["npm", "run", "build"]

# Expose the port your app runs on
EXPOSE 5000

# Define the command to run your app
CMD ["npm", "start"]