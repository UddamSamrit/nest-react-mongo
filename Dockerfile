# Use the MongoDB base image
FROM mongo:6.0

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Install MongoDB client tools
RUN apt-get update && \
    apt-get install -y gnupg wget && \
    wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add - && \
    echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/debian bullseye/mongodb-org/6.0 main" > /etc/apt/sources.list.d/mongodb-org-6.0.list && \
    apt-get update && \
    apt-get install -y mongodb-org-tools mongodb-org-shell && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory for Node.js app (if you have one)
WORKDIR /app

# Copy application files and install dependencies if applicable
COPY ./back-end-nest /app
RUN npm install

# Command to start your Node.js app (uncomment if needed)
CMD ["npm", "start"]
