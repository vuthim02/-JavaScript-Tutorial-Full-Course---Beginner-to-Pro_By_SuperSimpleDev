# Chapter 12 — Response Caching

## In-Memory Cache Middleware

```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 });

function cacheMiddleware(duration) {
    return (req, res, next) => {
        if (req.method !== 'GET') {
            return next();
        }

        const key = req.originalUrl;
        const cached = cache.get(key);

        if (cached) {
            logger.debug({ key }, 'Cache hit');
            return res.json(cached);
        }

        const originalJson = res.json.bind(res);
        res.json = (body) => {
            cache.set(key, body, duration);
            originalJson(body);
        };

        next();
    };
}

app.get('/api/users',
    cacheMiddleware(300), // Cache for 5 minutes
    userController.list
);
```

## Redis Cache Middleware

```javascript
const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });

async function redisCache(duration) {
    return async (req, res, next) => {
        if (req.method !== 'GET') {
            return next();
        }

        const key = `cache:${req.originalUrl}`;

        try {
            const cached = await client.get(key);
            if (cached) {
                logger.debug({ key }, 'Redis cache hit');
                return res.json(JSON.parse(cached));
            }
        } catch (err) {
            logger.error({ err }, 'Redis cache error — falling through');
        }

        const originalJson = res.json.bind(res);
        res.json = (body) => {
            client.setEx(key, duration, JSON.stringify(body)).catch(() => {});
            originalJson(body);
        };

        next();
    };
}
```

## Cache Invalidation

```javascript
async function invalidateCache(pattern) {
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
        await client.del(keys);
    }
}

app.post('/users', async (req, res, next) => {
    try {
        const user = await userService.create(req.body);
        await invalidateCache('cache:/api/users*');
        res.status(201).json({ data: user });
    } catch (err) {
        next(err);
    }
});
```

# Chapter 14 — Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

// Global limiter
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests, please try again later'
        }
    }
});

app.use(globalLimiter);

// Strict limiter for auth endpoints
const authLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: {
        error: {
            code: 'AUTH_RATE_LIMIT',
            message: 'Too many login attempts. Try again in 1 minute.'
        }
    }
});

app.use('/auth/login', authLimiter);

// Per-route custom limiter
const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    keyGenerator: (req) => {
        return req.user?.id || req.ip;
    }
});

app.use('/api', apiLimiter);
```

## Rate Limit Headers

```text
RateLimit-Limit: 100
RateLimit-Remaining: 87
RateLimit-Reset: 1682345678
Retry-After: 360
```

# Chapter 15 — Response Compression

```javascript
const compression = require('compression');

app.use(compression());

app.use(compression({
    level: 6,
    threshold: 1024,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
}));
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is response cached? | Check for cache middleware or Redis |
| Is rate limiting active? | Check for `express-rate-limit` |
| What rate limits apply? | Check `windowMs` and `max` values |
| Is compression enabled? | Check for `compression()` middleware |
## Next Steps

[Back to Chapter 11](11-logging.md): Chapter 11 — Structured Logging
[Proceed to Chapter 13](13-security-configuration.md): Chapter 13 — Security Headers (Helmet) to learn about chapter 13 — security headers (helmet).
