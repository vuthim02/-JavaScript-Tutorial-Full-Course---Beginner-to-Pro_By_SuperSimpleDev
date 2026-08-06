# WHAT — Reverse Proxy in Web Development

## What

A **reverse proxy** is a server that sits between client requests and backend servers, forwarding client requests to the appropriate backend and returning the response. Unlike a forward proxy (which sits in front of clients), a reverse proxy sits in front of servers.

```
Client → Reverse Proxy → Server A (port 3001)
                       → Server B (port 3002)
                       → Server C (port 3003)
```

---

## Why Use a Reverse Proxy?

| Reason | Explanation |
|--------|-------------|
| **Load balancing** | Distribute traffic across multiple server instances |
| **SSL termination** | Handle HTTPS in one place instead of on every server |
| **Caching** | Cache static responses to reduce backend load |
| **Security** | Hide backend server details, prevent direct access |
| **API gateway** | Route requests to different services based on path |
| **CORS handling** | Manage cross-origin headers centrally |
| **Rate limiting** | Throttle requests before they reach your servers |

---

## Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/myapp

server {
    listen 80;
    server_name example.com;

    # Proxy all requests to backend
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Node.js Reverse Proxy (Express)

```javascript
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Route /api/* to backend server
app.use('/api', createProxyMiddleware({
    target: 'http://127.0.0.1:3000',
    changeOrigin: true,
}));

// Route /admin/* to admin panel
app.use('/admin', createProxyMiddleware({
    target: 'http://127.0.0.1:4000',
    changeOrigin: true,
}));

app.listen(80);
```

---

## Load Balancing with Nginx

```nginx
upstream backend {
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
```

---

## Reverse Proxy vs Forward Proxy

| Feature | Forward Proxy | Reverse Proxy |
|---------|---------------|---------------|
| Sits in front of | Clients | Servers |
| Purpose | Hide client identity | Hide server identity |
| Used by | Users/browsers | Server administrators |
| Example | VPN, ad blocker | Nginx, HAProxy, Cloudflare |

---

## Quick Reference

| Tool | Description |
|------|-------------|
| **Nginx** | Most popular reverse proxy / web server |
| **HAProxy** | High-performance TCP/HTTP load balancer |
| **Traefik** | Cloud-native reverse proxy with auto-discovery |
| **Caddy** | Automatic HTTPS reverse proxy |
| **Cloudflare** | CDN + reverse proxy as a service |

---

## EADDRINUSE Fix

If your proxy port is already in use:

```bash
# Find what's using port 80
lsof -i :80

# Kill the process
kill -9 <PID>
```

---

*Last updated: July 2026*
