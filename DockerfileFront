# Use the Node.js base image
FROM node:20 AS build

# Set the working directory for the Node.js app
WORKDIR /app

# Copy application files and install dependencies
COPY ./front-end-next/package*.json ./
RUN npm install

# Copy the rest of the application files
COPY ./front-end-next ./

# Build the Next.js application
RUN npm run build

# Production image
FROM node:20 AS production

# Set the working directory for the production image
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app ./

# Expose the port your Next.js app runs on
EXPOSE 3000

# Command to start your Node.js app
CMD ["npm", "start"]
