# 11. CORS and HTTPS/TLS

## Cross-Origin Resource Sharing (CORS)

### The Same-Origin Policy

Browser blocks JavaScript from making requests to a different origin.

```
Origin = scheme + host + port

https://myapp.com
https://api.myapp.com  ← Different (different host)
http://myapp.com       ← Different (different scheme)
https://myapp.com:3000 ← Different (different port)
```

### CORS Flow

```
Browser at https://myapp.com
         │
         │── GET https://api.example.com/users
         │   Origin: https://myapp.com
         ▼
Server response:
    Access-Control-Allow-Origin: https://myapp.com
    Access-Control-Allow-Methods: GET, POST, PUT, DELETE
    Access-Control-Allow-Credentials: true
```

### Preflight Requests

For "non-simple" requests (custom headers, non-standard content types, etc.), browsers send an `OPTIONS` preflight request first.

```javascript
// "Simple" (no preflight): GET, HEAD, POST with standard content types
// "Non-simple" (preflight required): PUT, PATCH, DELETE, JSON body, Authorization header
```

### Handling CORS in Express

```javascript
// Manual middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://myapp.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') return res.status(204).send();
    next();
});

// Or use cors package:
const cors = require('cors');
app.use(cors({
    origin: 'https://myapp.com',
    credentials: true,
    maxAge: 86400
}));

// Dynamic origin
app.use(cors({
    origin: (origin, callback) => {
        const allowed = ['https://app1.com', 'https://app2.com'];
        if (!origin || allowed.includes(origin)) callback(null, true);
        else callback(new Error('Not allowed by CORS'));
    }
}));
```

## HTTPS / TLS

### What TLS Provides

| Property | Explanation |
|----------|-------------|
| **Encryption** | Data is unreadable to intermediaries |
| **Integrity** | Data cannot be modified in transit |
| **Authentication** | You are talking to the real server |

### TLS Handshake

```
Client                          Server
  │────── ClientHello ──────────►│
  │◄───── ServerHello ──────────│
  │◄───── Certificate ──────────│
  │◄───── ServerHelloDone ──────│
  │────── ClientKeyExchange ────►│
  │────── ChangeCipherSpec ─────►│
  │────── Finished ─────────────►│
  │◄───── ChangeCipherSpec ──────│
  │◄───── Finished ─────────────│
  │══════ Encrypted Traffic ════►│
```

### Self-Signed Certificate (Dev)

```javascript
const https = require('https');
const fs = require('fs');
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
https.createServer(options, (req, res) => {
    res.end('Secure connection!\n');
}).listen(443);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Browser issue or server issue? | CORS is a browser restriction — fix server headers |
| Which origin is allowed? | Check `Access-Control-Allow-Origin` header |
| Is HTTPS used? | If not → man-in-the-middle risk |
## Next Steps

[Back to Chapter 10](10-oauth.md): 10. OAuth 2.0 — Delegated Authorization
[Proceed to Chapter 12](12-websockets.md): 12. WebSockets — Full-Duplex Real-Time Communication to learn about 12. websockets — full-duplex real-time communication.
