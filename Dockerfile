# Use Node.js base image
FROM node:18.18.0

# Set working directory
WORKDIR /src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

ENV PORT 9000
ENV HOST 0.0.0.0
# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 9000

# Run the app
CMD ["node", "app.js"]
