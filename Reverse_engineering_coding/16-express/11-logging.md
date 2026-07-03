# Chapter 11 — Structured Logging

## Winston Logger

```javascript
const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'my-api' },
    transports: [
        new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
            maxsize: 10 * 1024 * 1024,
            maxFiles: 5
        }),
        new winston.transports.File({
            filename: path.join('logs', 'combined.log'),
            maxsize: 10 * 1024 * 1024,
            maxFiles: 5
        })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

module.exports = logger;
```

## Pino (Faster Logger)

```javascript
const pino = require('pino');

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: process.env.NODE_ENV !== 'production'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined
});

logger.info({ userId: 123, action: 'login' }, 'User logged in');
logger.error({ err, userId: 123 }, 'Failed to process payment');
```

## Request Logging Middleware (Morgan)

```javascript
const morgan = require('morgan');

// Standard Apache combined format
app.use(morgan('combined'));

// Custom format with timing
app.use(morgan(':method :url :status :response-time ms'));

// Write to log file
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'logs', 'access.log'),
    { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

// Skip logging for health checks
app.use(morgan('combined', {
    skip: (req) => req.url === '/health'
}));
```

## Custom Request Logging Middleware

```javascript
function requestLogger(req, res, next) {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const logData = {
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            userId: req.user?.id
        };

        if (res.statusCode >= 500) {
            logger.error(logData, 'Request failed');
        } else if (res.statusCode >= 400) {
            logger.warn(logData, 'Client error');
        } else {
            logger.info(logData, 'Request completed');
        }
    });

    next();
}

app.use(requestLogger);
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Where are failures recorded? | Check logging middleware and error logger |
| Structured or plain? | Structured (JSON) is better for log aggregation |
| Is request ID tracked? | Look for `req.id` or correlation ID |
| Are errors logged with stack traces? | Check `winston.format.errors({ stack: true })` |
## Next Steps

[Back to Chapter 10](10-cors-file-uploads.md): Chapter 10 — CORS
[Proceed to Chapter 12](12-caching-rate-limiting-compression.md): Chapter 12 — Response Caching to learn about chapter 12 — response caching.
