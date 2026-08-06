FROM node:18-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY server/package*.json ./server/
COPY proxy/package*.json ./proxy/

RUN cd server && npm ci --only=production && cd ../proxy && npm ci --only=production

COPY . .

RUN mkdir -p server/data

EXPOSE 3000

CMD ["sh", "-c", "cd /app/server && node src/index.js & cd /app/server && PORT=3002 node src/index.js & cd /app/server && PORT=3003 node src/index.js & sleep 2 && cd /app/proxy && node proxy.js"]