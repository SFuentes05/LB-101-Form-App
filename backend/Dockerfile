# Use an official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the backend server will run on
EXPOSE {$PORT}

# Start the backend server
CMD ["npm", "start"]