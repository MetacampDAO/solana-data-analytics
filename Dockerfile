# Stage BUILD
FROM node:18

# Install dependencies
WORKDIR /app
COPY package.json ./
RUN npm install

# Copy all local files into the image
COPY . .

# STAGE RUN
FROM node:18-alpine3.14

WORKDIR /app
COPY --from=0 /app .
COPY . .

CMD ["npx", "ts-node", "./src/scrapLfnty.ts" ]
