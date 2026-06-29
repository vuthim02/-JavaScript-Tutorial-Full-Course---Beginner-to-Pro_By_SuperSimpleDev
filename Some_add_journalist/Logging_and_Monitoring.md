# Logging & Monitoring — Know What Your App Is Doing

---

## 1. Why Logging & Monitoring Matter

Without logs, a crash in production is a mystery:

```
User: "The app is broken"
You:  "What happened?"
User: "I don't know, it just doesn't work"
You:  [no logs] → guess and hope
```

With logging, you see exactly what went wrong:

```
2026-06-27 14:23:01 ERROR Database connection failed: connect ECONNREFUSED 127.0.0.1:5432
2026-06-27 14:23:01 ERROR Request failed: GET /api/items (user 42)
2026-06-27 14:23:02 WARN  Retrying database connection...
```

**Monitoring** watches your app's health over time: response times, error rates, memory usage.

---

## 2. Console.log Is Not Enough

```js
// ❌ Bad — no timestamp, no context, can't search
console.log('User logged in');
console.log('Error:', err);
```

Problems:
- No timestamp (when did it happen?)
- No request ID (which user caused this?)
- No log levels (can't filter errors vs debug)
- No structured data (can't search, can't parse)
- Can't turn off in production (too noisy)

---

## 3. Structured Logging with Winston

```bash
npm install winston
```

### Basic setup

```js
// logger.js
const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),           // ← structured JSON
  ),
  defaultMeta: { service: 'todo-api' },
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, 'logs/error.log'),
      level: 'error',
      maxsize: 5 * 1024 * 1024,      // 5MB per file
      maxFiles: 5,                    // keep 5 rotated files
    }),
    new winston.transports.File({
      filename: path.join(__dirname, 'logs/combined.log'),
      maxsize: 5 * 1024 * 1024,
      maxFiles: 10,
    }),
  ],
});

// In development, also log to console (colorful, readable)
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  }));
}

module.exports = logger;
```

### Usage

```js
const logger = require('./logger');

logger.info('Server started', { port: 3000, env: process.env.NODE_ENV });
logger.warn('Rate limit approaching', { ip: req.ip, route: req.url });
logger.error('Database query failed', { error: err.message, query: sql });
```

**Output (JSON):**
```json
{
  "level": "error",
  "message": "Database query failed",
  "timestamp": "2026-06-27T14:23:01.123Z",
  "service": "todo-api",
  "error": "connect ECONNREFUSED",
  "query": "SELECT * FROM items"
}
```

---

## 4. Log Levels

| Level | Priority | When to Use |
|---|---|---|
| `error` | 0 | App crashed, DB down, request failed |
| `warn` | 1 | Something unexpected but handled (rate limit, slow query) |
| `info` | 2 | Normal operations (server started, user registered) |
| `http` | 3 | HTTP request/response details |
| `debug` | 4 | Development-only details (query results, variable values) |
| `silly` | 5 | Everything (never use in production) |

```js
logger.log('info', 'User registered', { userId: user.id });
logger.log('error', 'Payment failed', { userId, error: err.message });

// Shorthand
logger.info('Server started');
logger.warn('Disk space low');
logger.error('Unhandled rejection');
```

Set log level via env:
```js
level: process.env.LOG_LEVEL || 'info',
// LOG_LEVEL=debug → shows debug + info + warn + error
// LOG_LEVEL=error → shows only errors
```

---

## 5. Express Request Logging (Morgan)

Morgan logs every HTTP request. Combine it with Winston.

```bash
npm install morgan
```

```js
// morgan.js
const morgan = require('morgan');
const logger = require('./logger');

const stream = {
  write: (message) => logger.http(message.trim()),
};

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream }
);

// server.js
app.use(morganMiddleware);
```

Output:
```
GET /api/items 200 156 - 12 ms
POST /api/items 201 45 - 8 ms
GET /api/items/abc 404 24 - 2 ms
```

---

## 6. Request ID Tracing

Add a unique ID to every request so you can correlate logs for a single request across your app.

```bash
npm install uuid
```

```js
// middleware/requestId.js
const { v4: uuidv4 } = require('uuid');

function requestId(req, res, next) {
  req.id = req.headers['x-request-id'] || uuidv4();
  res.setHeader('x-request-id', req.id);
  next();
}

// server.js
app.use(requestId);
```

**Attach to logger:**

```js
// middleware/requestLogger.js
const logger = require('../logger');

function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('Request completed', {
      requestId: req.id,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      userId: req.user?.id,
      ip: req.ip,
    });
  });

  next();
}

// Usage in routes
app.get('/api/items', async (req, res) => {
  logger.info('Fetching items', { requestId: req.id, userId: req.user.id });
  // ...
});
```

Now you can filter all logs for one request:
```
grep "requestId.*abc-123" logs/combined.log
```

---

## 7. Monitoring — What to Watch

### Health endpoint

```js
// server.js
app.get('/api/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  };

  try {
    await pool.query('SELECT 1');
    health.database = 'connected';
  } catch (err) {
    health.database = 'disconnected';
    health.status = 'degraded';
  }

  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
});
```

### Response time tracking

```js
// middleware/responseTime.js
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;

    // Log slow requests
    if (duration > 1000) {
      logger.warn('Slow request detected', {
        method: req.method,
        url: req.originalUrl,
        duration: `${duration}ms`,
      });
    }
  });
  next();
});
```

### Unhandled errors

```js
process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception', { error: err.message, stack: err.stack });
  // Crash — you can't recover from this
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection', { reason: reason?.message, stack: reason?.stack });
});
```

---

## 8. External Monitoring Services

Winston logs to files. For real monitoring, ship logs to a service.

### Log shipping setup

```bash
npm install @logtail/winston  # Better Stack (formerly Logtail)
# or
npm install winston-datadog-transport
```

```js
// logger.js — add transport for production
if (process.env.NODE_ENV === 'production') {
  const { Logtail } = require('@logtail/node');
  const { LogtailTransport } = require('@logtail/winston');

  const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN);
  logger.add(new LogtailTransport(logtail));
}
```

### What monitoring services give you

| Service | Free Tier | What It Does |
|---|---|---|
| Better Stack | 1GB/month | Log aggregation, alerts, dashboards |
| Datadog | Limited | APM, logs, metrics, traces |
| Sentry | 5000 events/month | Error tracking with stack traces + context |
| Grafana + Loki | Self-hosted | Log aggregation + dashboards |
| Axiom | 500MB/month | Log search, cheap |

### Sentry for error tracking

```bash
npm install @sentry/node
```

```js
// server.js
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
});

// Sentry middleware (must be before routes)
app.use(Sentry.Handlers.requestHandler());

// Routes...
// Sentry error handler (must be after routes)
app.use(Sentry.Handlers.errorHandler());
```

Now errors automatically include: stack trace, request URL, user ID, headers, and session data.

---

## 9. Alerting — Get Notified When Things Break

Don't read logs manually. Set up alerts.

### Based on log level

```
Better Stack / Datadog: create alert when:
  level = "error" AND count > 5 in 5 minutes
→ Send email, Slack, or SMS
```

### Based on health endpoint

```
Uptime monitoring (Pingdom, UptimeRobot):
  Check /api/health every 60 seconds
  Alert if status != 200
```

### Budget-friendly approach

```js
// Simple Slack alert for critical errors
const axios = require('axios');

async function alertSlack(message) {
  if (process.env.NODE_ENV !== 'production') return;

  await axios.post(process.env.SLACK_WEBHOOK_URL, {
    text: `🚨 *${message}*`,
    channel: '#alerts',
  });
}

// Usage
logger.error('Payment service down');
await alertSlack('Payment service down — investigate immediately');
```

---

## 10. Logging Checklist for Production

```
☐ Structured JSON logs (not console.log)
☐ Log levels (error, warn, info, debug)
☐ Request ID on every log entry
☐ Morgan for HTTP request logging
☐ Error logs to separate file
☐ Log rotation (maxsize + maxFiles)
☐ Health endpoint (/api/health)
☐ Uncaught exception handler
☐ Log shipping (Better Stack, Sentry, etc.)
☐ Alerts for critical errors
☐ No secrets in logs (passwords, tokens)
```

---

## 11. Complete Logger Setup (Copy-Paste Ready)

```js
// logger.js
const winston = require('winston');
const path = require('path');
const fs = require('fs');

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: { service: 'todo-api' },
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      maxsize: 5 * 1024 * 1024,
      maxFiles: 10,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
        return `${timestamp} ${level}: ${message} ${metaStr}`;
      }),
    ),
  }));
}

module.exports = logger;
```

```js
// server.js
const logger = require('./logger');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

// Request ID
app.use((req, res, next) => {
  req.id = req.headers['x-request-id'] || uuidv4();
  res.setHeader('x-request-id', req.id);
  next();
});

// Morgan to Winston
app.use(morgan(':method :url :status :response-time ms', {
  stream: { write: (msg) => logger.http(msg.trim()) },
}));

// Response logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    logger.info('request', {
      requestId: req.id,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${Date.now() - start}ms`,
      userId: req.user?.id,
    });
  });
  next();
});

// Routes...

// 404 handler
app.use((req, res) => {
  logger.warn('route not found', { method: req.method, url: req.originalUrl });
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error('unhandled error', {
    requestId: req.id,
    error: err.message,
    stack: err.stack,
  });
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  });
});

// Process handlers
process.on('uncaughtException', (err) => {
  logger.error('uncaught exception', { error: err.message, stack: err.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('unhandled rejection', { reason: reason?.message, stack: reason?.stack });
});

module.exports = app;
```

---

## 12. Quick Reference

| Concept | Key Point |
|---|---|
| Winston | Structured JSON logger with levels + transports |
| Log levels | error, warn, info, http, debug |
| Morgan | HTTP request logger, pipe to Winston |
| Request ID | UUID per request to correlate logs |
| Log rotation | Max file size, keep N files |
| Health endpoint | `GET /api/health` — DB status, uptime, memory |
| Sentry | Error tracking with context |
| Alerting | Slack/email when errors spike |
| Never log | Passwords, tokens, API keys, credit cards |

---

*Last updated: June 2026*
