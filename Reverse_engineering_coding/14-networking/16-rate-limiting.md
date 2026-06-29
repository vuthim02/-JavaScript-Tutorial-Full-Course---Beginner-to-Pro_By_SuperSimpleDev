# 16. Rate Limiting — Protecting APIs from Abuse

<img src="https://media.giphy.com/media/3oEjI9xj49ehuAGLQY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Why Rate Limit

- Prevent brute-force attacks.
- Prevent DDoS.
- Prevent accidental runaway scripts.
- Ensure fair resource usage.

## Rate Limiting Algorithms

| Algorithm | How it works |
|-----------|-------------|
| **Fixed Window** | Reset counter every N seconds. Simple but burst at boundary. |
| **Sliding Window** | Rolling time window. More accurate. |
| **Token Bucket** | Tokens refill at fixed rate. Allows bursts. |
| **Leaky Bucket** | Requests processed at fixed rate. Smooths bursts. |

## Fixed Window Implementation

```javascript
const rateLimit = new Map();

function rateLimiter(maxRequests, windowMs) {
    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        const windowStart = Math.floor(now / windowMs);
        const key = `${ip}:${windowStart}`;

        if (!rateLimit.has(key)) {
            rateLimit.set(key, { count: 1, start: now });
            if (rateLimit.size > 10000) {
                const oldest = now - windowMs * 2;
                for (const [k, v] of rateLimit) {
                    if (v.start < oldest) rateLimit.delete(k);
                }
            }
        } else {
            const entry = rateLimit.get(key);
            entry.count++;
            if (entry.count > maxRequests) {
                return res.status(429).json({
                    error: 'Too many requests',
                    retryAfter: Math.ceil((windowMs - (now - entry.start)) / 1000)
                });
            }
        }
        next();
    };
}

app.use('/api/auth', rateLimiter(5, 60000));   // 5 requests per minute
app.use('/api', rateLimiter(100, 60000));       // 100 requests per minute
```

## express-rate-limit

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: 'Too many requests',
        retryAfter: '15 minutes'
    }
});

app.use('/api', limiter);
```

## Brute Force Protection

```javascript
const loginAttempts = new Map();

app.post('/login', async (req, res) => {
    const ip = req.ip;
    const attempts = loginAttempts.get(ip) || 0;

    if (attempts >= 5) {
        const delay = Math.min(1000 * Math.pow(2, attempts - 5), 60000);
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    const valid = await verifyPassword(req.body);
    if (!valid) {
        loginAttempts.set(ip, (loginAttempts.get(ip) || 0) + 1);
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    loginAttempts.delete(ip);
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Abuse prevention required? | Yes for auth endpoints, API endpoints |
| What limit is appropriate? | Depends on expected traffic and server capacity |
| Which algorithm? | Fixed Window for simple cases, Sliding Window for accuracy |
## Next Steps

[Back to Chapter 15](15-file-uploads-pagination.md): 15. File Uploads and Pagination
[Proceed to Chapter 17](17-caching-api-versioning.md): 17. Caching Strategies and API Versioning to learn about 17. caching strategies and api versioning.
