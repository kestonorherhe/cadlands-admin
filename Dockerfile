# Use the official Node.js 16 image as a base
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy the app's source code to the working directory
COPY . .

# Build the application using the locally installed ng executable
RUN npx ng build

# Use the official Nginx image as a base for the runtime container
FROM nginx:1.21

# Copy the build artifacts from the build stage to the Nginx html folder
COPY --from=0 /app/dist/skote /usr/share/nginx/html

# Copy the nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
