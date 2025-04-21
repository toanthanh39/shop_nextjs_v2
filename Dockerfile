# Use an official Node.js runtime as a parent image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the entire application source code
COPY . .

# Set environment to development
ENV NODE_ENV=development
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Run the application in development mode
CMD ["npm", "run", "dev"]