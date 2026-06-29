# Chapter 23 — Observability: Logs, Metrics, Traces

<img src="https://media.giphy.com/media/MdA16VIoXKKxNE8Stk/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Health Check Endpoint

```javascript
app.get('/health', async (req, res) => {
    const health = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    };

    try {
        await prisma.$queryRaw`SELECT 1`;
        health.database = 'connected';
    } catch (err) {
        health.database = 'disconnected';
        health.status = 'degraded';
    }

    try {
        await redisClient.ping();
        health.redis = 'connected';
    } catch (err) {
        health.redis = 'disconnected';
        health.status = 'degraded';
    }

    const statusCode = health.status === 'ok' ? 200 : 503;
    res.status(statusCode).json(health);
});
```

## Prometheus Metrics

```javascript
const prometheus = require('prom-client');

const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({ register: prometheus.register });

const httpRequestDuration = new prometheus.Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5]
});

const httpRequestTotal = new prometheus.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status']
});

app.use((req, res, next) => {
    const end = httpRequestDuration.startTimer();

    res.on('finish', () => {
        const route = req.route?.path || req.originalUrl;
        const labels = { method: req.method, route, status: res.statusCode };
        httpRequestTotal.inc(labels);
        end(labels);
    });

    next();
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', prometheus.register.contentType);
    res.send(await prometheus.register.metrics());
});
```

# Chapter 24 — Dependency Injection

## Without DI (Tight Coupling)

```javascript
class UserController {
    constructor() {
        this.userService = new UserService(); // Direct instantiation
    }
}

class UserService {
    constructor() {
        this.repository = new UserRepository(); // Direct instantiation
    }
}

class UserRepository {
    constructor() {
        this.db = new PrismaClient(); // Direct instantiation
    }
}
```

## With DI (Loose Coupling)

```javascript
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
}

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
}

class UserRepository {
    constructor(db) {
        this.db = db;
    }
}

// Composition root — wire it together
const db = new PrismaClient();
const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const userController = new UserController(userService);
```

## Testing with DI

```javascript
const mockRepo = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Test' }])
};

const service = new UserService(mockRepo);
const controller = new UserController(service);

const req = {};
const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
const next = jest.fn();

await controller.list(req, res, next);

expect(res.json).toHaveBeenCalledWith({ data: [{ id: 1, name: 'Test' }] });
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is there a health check? | Check for `/health` endpoint |
| Are metrics exported? | Check for `/metrics` and Prometheus |
| Are dependencies injected? | Check constructors for DI pattern |
| Is there loose coupling? | Classes accept dependencies vs instantiating internally |
## Next Steps

[Back to Chapter 15](15-testing-documentation.md): Chapter 21 — Testing Express Applications
[Proceed to Chapter 17](17-reverse-engineering-tactics.md): Chapter 25 — Reverse Engineering Coding Tactics to learn about chapter 25 — reverse engineering coding tactics.
