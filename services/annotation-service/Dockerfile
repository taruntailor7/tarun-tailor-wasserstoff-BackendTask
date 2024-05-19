FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Environment variables
ENV PORT=3002

EXPOSE 3002

CMD ["npm", "start"]
