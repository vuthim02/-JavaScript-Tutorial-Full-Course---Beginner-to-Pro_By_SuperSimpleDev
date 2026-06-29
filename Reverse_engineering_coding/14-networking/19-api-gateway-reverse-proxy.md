# 19. API Gateway and Reverse Proxy

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## API Gateway — Single Entry Point for Microservices

### Architecture

```
Client
  │
  ▼
API Gateway (authentication, rate limiting, routing)
  │
  ├──► Users Service
  ├──► Orders Service
  ├──► Payments Service
  └──► Notifications Service
```

### Simple API Gateway

```javascript
const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();

const services = {
    '/users': 'http://localhost:3001',
    '/orders': 'http://localhost:3002',
    '/payments': 'http://localhost:3003'
};

const server = http.createServer((req, res) => {
    const prefix = Object.keys(services).find(p => req.url.startsWith(p));
    if (!prefix) return res.writeHead(404).end('Not found');

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.writeHead(401).end('Unauthorized');

    proxy.web(req, res, { target: services[prefix] });
});

server.listen(8080);
```

### Gateway Responsibilities

| Responsibility | Description |
|---------------|-------------|
| Authentication | Verify JWT/session before routing |
| Rate limiting | Per-client limits |
| Routing | Forward to correct microservice |
| Request/Response transformation | Modify headers, format |
| Aggregation | Combine responses from multiple services |
| Logging/Metrics | Centralized observability |
| Caching | Cache responses for frequent queries |

## Reverse Proxy — Nginx

### What a Reverse Proxy Does

```
Internet
  │
  ▼
Reverse Proxy (Nginx)
  │
  ├──► Node.js App (:3000)
  ├──► Static Files (/var/www)
  └──► Another Service (:4000)
```

### Nginx Configuration

```nginx
server {
    listen 443 ssl;
    server_name api.example.com;

    ssl_certificate /etc/ssl/certs/example.com.pem;
    ssl_certificate_key /etc/ssl/private/example.com.key;

    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /static/ {
        root /var/www;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /ws/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### Benefits of a Reverse Proxy

| Benefit | Explanation |
|---------|-------------|
| **SSL termination** | Nginx handles HTTPS, Node handles plain HTTP |
| **Compression** | Nginx compresses responses (gzip, brotli) |
| **Load balancing** | Distribute across multiple Node instances |
| **Static file serving** | Nginx is faster than Node for static files |
| **Security** | Hide internal server details, DDoS protection |
| **Caching** | Cache responses at the proxy level |
## Next Steps

[Back to Chapter 18](18-security.md): 18. Security — Common Attacks and Defenses
[Proceed to Chapter 20](20-load-balancing-webhooks.md): 20. Load Balancing and Webhooks to learn about 20. load balancing and webhooks.
