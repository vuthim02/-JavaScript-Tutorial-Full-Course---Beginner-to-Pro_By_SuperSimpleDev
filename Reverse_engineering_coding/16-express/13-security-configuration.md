# Chapter 16 — Security Headers (Helmet)

<img src="https://media.giphy.com/media/NSzHiAwAcazs7dcDr9/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


```javascript
const helmet = require('helmet');

// All default security headers
app.use(helmet());

// Specific configuration
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https://trusted-cdn.com"],
            connectSrc: ["'self'", "https://api.example.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"]
        }
    },
    referrerPolicy: { policy: 'same-origin' },
    crossOriginEmbedderPolicy: false
}));
```

## Headers Set by Helmet

```text
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=15552000; includeSubDomains
Referrer-Policy: no-referrer
Permissions-Policy: geolocation=(), microphone=()
```

# Chapter 17 — Configuration Management

```javascript
// config/index.js
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

const config = {
    env: process.env.NODE_ENV || 'development',
    server: {
        port: parseInt(process.env.PORT, 10) || 3000,
        host: process.env.HOST || '0.0.0.0'
    },
    database: {
        url: process.env.DATABASE_URL,
        pool: {
            min: parseInt(process.env.DB_POOL_MIN, 10) || 2,
            max: parseInt(process.env.DB_POOL_MAX, 10) || 10
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    },
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    },
    cors: {
        origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000']
    },
    log: {
        level: process.env.LOG_LEVEL || 'info'
    }
};

function validateConfig() {
    const required = ['DATABASE_URL', 'JWT_SECRET'];
    const missing = required.filter(key => !process.env[key]);
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}

validateConfig();
module.exports = config;
```

## .env.example

```env
# Server
PORT=3000
NODE_ENV=development
HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
DB_POOL_MIN=2
DB_POOL_MAX=10

# JWT
JWT_SECRET=your-256-bit-secret-here
JWT_EXPIRES_IN=1h

# Redis
REDIS_URL=redis://localhost:6379

# CORS
CORS_ORIGIN=http://localhost:3000,https://myapp.com

# Logging
LOG_LEVEL=debug
```

## Never Hardcode Secrets

```javascript
// BAD
const secret = 'my-super-secret-key-12345';

// GOOD
const secret = process.env.JWT_SECRET;

// EVEN BETTER
const secret = require('./config').jwt.secret;
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Are security headers set? | Check for `helmet()` middleware |
| Is CSP configured? | Check `contentSecurityPolicy` directives |
| Are secrets hardcoded? | Check for `process.env` usage vs hardcoded strings |
| Is config validated? | Check for required env vars at startup |
## Next Steps

[Back to Chapter 12](12-caching-rate-limiting-compression.md): Chapter 13 — Response Caching
[Proceed to Chapter 14](14-api-design-pagination-versioning.md): Chapter 18 — Consistent API Responses to learn about chapter 18 — consistent api responses.
