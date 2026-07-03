# 17. Caching Strategies and API Versioning

## Why Cache

```
Without cache:  Request → Database → Response  (~100ms)
With cache:     Request → Cache hit → Response  (~1ms)
```

## Caching Layers

```
Browser Cache
    ↓
CDN Cache (Cloudflare, Akamai, Fastly)
    ↓
API Gateway Cache
    ↓
Application Cache (In-memory, Redis)
    ↓
Database Cache
    ↓
Database
```

## Cache Headers

```javascript
// Force caching for 1 hour
res.setHeader('Cache-Control', 'public, max-age=3600');

// No caching
res.setHeader('Cache-Control', 'no-store');

// Cache but revalidate
res.setHeader('Cache-Control', 'no-cache');
res.setHeader('ETag', '"abc123"');

// Conditional request with ETag
app.get('/api/data', (req, res) => {
    const data = getData();
    const etag = computeEtag(data);
    if (req.headers['if-none-match'] === etag) {
        return res.status(304).send();
    }
    res.setHeader('ETag', etag);
    res.json(data);
});
```

## Application Cache with Redis

```javascript
const redis = require('redis');
const client = redis.createClient();

const cacheMiddleware = (expireSeconds) => {
    return async (req, res, next) => {
        const key = `cache:${req.originalUrl}`;
        const cached = await client.get(key);
        if (cached) return res.json(JSON.parse(cached));

        const originalJson = res.json.bind(res);
        res.json = (body) => {
            client.setEx(key, expireSeconds, JSON.stringify(body));
            originalJson(body);
        };
        next();
    };
};

app.get('/api/expensive', cacheMiddleware(60), (req, res) => {
    const data = expensiveOperation();
    res.json(data);
});
```

### Cache Invalidation

```javascript
app.post('/api/users', async (req, res) => {
    const user = await db.createUser(req.body);
    await client.del('cache:/api/users');
    res.status(201).json(user);
});
```

## API Versioning

### URL Versioning

```
GET /v1/users  → Returns { id, name, email }
GET /v2/users  → Returns { id, name, email, role }
```

```javascript
const v1Router = express.Router();
const v2Router = express.Router();

v1Router.get('/users', (req, res) => {
    res.json(users.map(u => ({ id: u.id, name: u.name, email: u.email })));
});

v2Router.get('/users', (req, res) => {
    res.json(users);
});

app.use('/v1', v1Router);
app.use('/v2', v2Router);
```

### Header Versioning

```
GET /users
Accept: application/vnd.myapp.v1+json
```

```javascript
app.use((req, res, next) => {
    const accept = req.headers.accept || '';
    req.apiVersion = accept.includes('vnd.myapp.v2') ? 2 : 1;
    next();
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Cache hit or miss? | Check response headers, measure latency |
| Can this response be cached? | If data changes infrequently → yes |
| Where to cache? | Browser, CDN, Redis, or in-memory |
## Next Steps

[Back to Chapter 16](16-rate-limiting.md): 16. Rate Limiting — Protecting APIs from Abuse
[Proceed to Chapter 18](18-security.md): 18. Security — Common Attacks and Defenses to learn about 18. security — common attacks and defenses.
