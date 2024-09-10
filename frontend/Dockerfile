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

# Build the Vite app
CMD ["npm", "run", "build"]

# Install serve to run the production build
RUN npm install -g serve

# Expose the port the frontend server will run on
EXPOSE 80

# Start the frontend server using serve
CMD ["serve", "-s", "dist", "-l", "80"]