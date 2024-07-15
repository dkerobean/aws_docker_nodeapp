FROM node:lts-slim

WORKDIR /usr/src/app

COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Run the application
CMD ["node", "app.js"]