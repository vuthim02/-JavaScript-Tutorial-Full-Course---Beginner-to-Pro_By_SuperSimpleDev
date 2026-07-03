# Production Observability: Logging, Tracing & Metrics

## The Three Pillars

| Pillar | What | Tooling |
|--------|------|---------|
| **Logs** | Structured events with context | Pino, Winston |
| **Traces** | Request lifecycle across services | OpenTelemetry |
| **Metrics** | Aggregated counters and histograms | Prometheus |

## Structured Logging with Pino

`console.log` produces unstructured text. In production every log line should be JSON with consistent fields:

```javascript
import pino from 'pino';

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    formatters: {
        bindings: () => ({ pid: process.pid, host: os.hostname() }),
    },
    redact: ['password', 'secret', 'token'],
});

logger.info({ user: 'alice', action: 'login' }, 'User logged in');
// {"level":30,"time":1719000000000,"pid":1234,"host":"api-1","user":"alice","action":"login","msg":"User logged in"}
```

### Pino vs Winston

| | Pino | Winston |
|---|---|---|
| Speed | ~50,000 msg/s | ~5,000 msg/s |
| Transport | Worker thread (non-blocking) | Main thread |
| Opinionated | Yes — JSON to stdout | Flexible — many formats |
| Best for | High-throughput APIs | Legacy codebases, rich transports |

### Child Loggers for Request Context

```javascript
app.use((req, res, next) => {
    req.log = logger.child({ requestId: crypto.randomUUID(), method: req.method, url: req.url });
    next();
});
```

Each request gets its own logger with `requestId` pre-attached to every log line.

## Distributed Tracing with OpenTelemetry

Tracing follows a single request across service boundaries:

```javascript
import { trace, context } from '@opentelemetry/api';

async function handleRequest(req, res) {
    const tracer = trace.getTracer('my-service');
    const span = tracer.startSpan('process-payment');
    // Automatically sets span as active in context
    await context.with(trace.setSpan(context.active(), span), async () => {
        // Every log line here includes traceId/spanId
        logger.info({ amount: 100 }, 'Processing payment');
        const result = await downstreamApi.call();
        span.setAttribute('payment.status', result.status);
    });
    span.end();
}
```

### Auto-Instrumentation

OpenTelemetry provides packages that instrument common libraries automatically:

```bash
npm install @opentelemetry/sdk-node @opentelemetry/instrumentation-http @opentelemetry/instrumentation-express
```

```javascript
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

const sdk = new NodeSDK({
    instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();
```

Now HTTP calls, Express routes, database queries, and outbound requests automatically create spans with timing and error information.

### Correlation IDs with AsyncLocalStorage

Without OpenTelemetry, use Node.js built-in `AsyncLocalStorage` to propagate a request ID across async boundaries:

```javascript
import { AsyncLocalStorage } from 'async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

function middleware(req, res, next) {
    const store = { requestId: req.headers['x-request-id'] || crypto.randomUUID() };
    asyncLocalStorage.run(store, () => next());
}

function log(level, message, meta = {}) {
    const store = asyncLocalStorage.getStore();
    const requestId = store?.requestId;
    console.log(JSON.stringify({ level, message, requestId, ...meta, timestamp: new Date().toISOString() }));
}
```

`AsyncLocalStorage` propagates automatically across `await`, `setTimeout`, and `EventEmitter` — no manual passing needed.

## Metrics with Prometheus

Aggregate counters and histograms for monitoring:

```javascript
import prometheus from 'prom-client';

const httpRequestDuration = new prometheus.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.01, 0.05, 0.1, 0.5, 1, 5],
});

// Record duration
app.use((req, res, next) => {
    const end = httpRequestDuration.startTimer();
    res.on('finish', () => {
        end({ method: req.method, route: req.route?.path || 'unknown', status: res.statusCode });
    });
    next();
});
```

### The Three Essential Alerts

| Alert | Threshold | Why |
|-------|-----------|-----|
| Error rate > 1% | Over 5 minutes | Something is breaking |
| p99 latency > 1s | Over 5 minutes | Performance regression |
| Service down | No successful probes | Application is unreachable |

## Putting It Together: A Production Logger

```javascript
import pino from 'pino';
import { trace } from '@opentelemetry/api';

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: {
        targets: [
            { target: 'pino/file', options: { destination: 1 }, level: 'info' },
            ...(process.env.OTEL_ENABLED
                ? [{ target: 'pino-opentelemetry-transport', options: {} }]
                : []),
        ],
    },
    redact: ['password', 'token', 'authorization'],
});

// Automatically adds traceId/spanId to every log line
export function getLogger() {
    const span = trace.getActiveSpan();
    if (span) {
        const { traceId, spanId } = span.spanContext();
        return logger.child({ traceId, spanId });
    }
    return logger;
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Should I use `console.log` in production? | No — use structured JSON logging (Pino/Winston) |
| Why is structured JSON logging important? | Machine-parseable, queryable in Loki/Elasticsearch |
| What is the difference between Pino and Winston? | Pino is 10x faster, worker-thread transport; Winston has richer ecosystem |
| Why add `traceId` to every log line? | Enables one-click pivot from log → distributed trace |
| What does OpenTelemetry auto-instrument? | HTTP, Express, DB queries, gRPC, and more automatically |
| How does `AsyncLocalStorage` work? | Propagates context across `await` without manual parameter passing |
| What are the three essential metrics? | Request rate, error rate, p99 latency |
| When should I redact log fields? | Always — secrets, tokens, passwords before they reach the log transport |
## Next Steps

[Back to Chapter 16](16-reverse-engineering-tactics.md): Reverse Engineering Tactics
[Proceed to Chapter 18](18-docker-containers.md): 18 — Docker & Containerization for Node.js to learn about Docker and containerization.
