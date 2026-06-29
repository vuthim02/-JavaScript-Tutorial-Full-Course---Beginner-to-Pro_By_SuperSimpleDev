# Background Jobs with Bull — Async Task Processing with Redis

---

## 1. Why Background Jobs?

Some work should **not** happen during an HTTP request:

```
❌ Synchronous (blocks the response):
POST /api/signup → hash password + send welcome email + generate report
                   ← response after 3 seconds (user waits)

✅ Background job:
POST /api/signup → hash password → enqueue job → respond instantly (200ms)
                   ← "Welcome!" email sent by worker a few seconds later
```

**What belongs in background jobs:**
- Sending emails (welcome, reset password, receipts)
- Push notifications
- Image/video processing (resize, compress)
- Report generation (PDFs, CSVs)
- Webhook delivery
- Data imports/exports
- Scheduled tasks (daily digest, cleanup old data)

---

## 2. Bull — Queue System for Node.js

Bull uses **Redis** as the backing store. Jobs persist in Redis, survive server restarts, and can be retried on failure.

```bash
npm install bull ioredis
```

### Basic setup

```js
// queues/emailQueue.js
const Queue = require('bull');

const emailQueue = new Queue('email', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
  },
  defaultJobOptions: {
    attempts: 3,              // retry up to 3 times
    backoff: {
      type: 'exponential',    // wait longer between retries
      delay: 2000,            // start at 2s
    },
    removeOnComplete: 100,    // keep last 100 completed jobs
    removeOnFail: 50,         // keep last 50 failed jobs
  },
});

module.exports = emailQueue;
```

### Adding jobs (producer)

```js
// routes/auth.js
const emailQueue = require('../queues/emailQueue');

router.post('/api/signup', async (req, res) => {
  const user = await prisma.user.create({
    data: { email: req.body.email, password: hashedPassword },
  });

  // Add job to queue — respond immediately
  await emailQueue.add('welcome-email', {
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  // Add with delay (e.g., send reminder in 24 hours)
  await emailQueue.add('followup-email', {
    userId: user.id,
    email: user.email,
  }, { delay: 24 * 60 * 60 * 1000 });

  res.status(201).json({ message: 'User created' });
});
```

### Processing jobs (worker)

```js
// workers/emailWorker.js
const emailQueue = require('../queues/emailQueue');
const sendMail = require('../services/mailer');

emailQueue.process('welcome-email', async (job) => {
  const { email, name } = job.data;

  // This runs in the background — user already got their response
  await sendMail({
    to: email,
    subject: 'Welcome!',
    html: `<h1>Hi ${name}</h1><p>Thanks for signing up!</p>`,
  });

  // Return value is stored as job result
  return { sent: true, to: email };
});

emailQueue.process('followup-email', async (job) => {
  const { email } = job.data;
  await sendMail({
    to: email,
    subject: 'We miss you!',
    html: '<p>Come back and finish your todos...</p>',
  });
});

// Event listeners
emailQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed:`, result);
});

emailQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});

console.log('Email worker started');
```

### Start the worker separately

```bash
# Terminal 1: Express server
node src/server.js

# Terminal 2: Worker process
node src/workers/emailWorker.js
```

Bull processes jobs in the **same process** by default. For production, run workers as separate processes (or even separate servers).

---

## 3. Job Lifecycle

```
added → waiting → active → completed
                 → failed → waiting (retry)
                          → failed → failed (no more retries)
```

```
Job states in Redis:
┌──────────┐   ┌──────────┐   ┌──────────┐
│  waiting  │──→│  active   │──→│ completed│
│ (queue)   │   │ (being   │   │          │
│           │   │  processed│   │          │
└──────────┘   └──────────┘   └──────────┘
     │               │              │
     │               ↓              │
     │          ┌──────────┐        │
     └──────────│  failed   │────────┘
                │ (retry?)  │
                └──────────┘
```

---

## 4. Job Options

```js
await queue.add('process-report', data, {
  priority: 10,                     // lower = higher priority (1 is highest)
  delay: 5000,                      // wait 5s before processing
  attempts: 5,                      // retry 5 times on failure
  backoff: {
    type: 'exponential',            // 2s, 4s, 8s, 16s...
    delay: 2000,
  },
  removeOnComplete: true,           // remove immediately after success
  removeOnFail: 10,                 // keep last 10 failures
  timeout: 30000,                   // job must complete in 30s or be marked failed
});
```

---

## 5. Advanced Patterns

### Concurrent processing

```js
// Process up to 5 jobs at the same time
emailQueue.process('welcome-email', 5, async (job) => {
  // handle 5 emails concurrently
});
```

### Job progress

```js
// Worker reports progress
emailQueue.process('bulk-email', async (job) => {
  const recipients = job.data.recipients;
  for (let i = 0; i < recipients.length; i++) {
    await sendMail({ to: recipients[i] });
    const percent = Math.round(((i + 1) / recipients.length) * 100);
    job.progress(percent);  // <-- updates progress in Redis
  }
});

// Producer checks progress
const job = await emailQueue.add('bulk-email', { recipients });
setInterval(async () => {
  const state = await job.getState();
  const progress = await job.progress();
  console.log(`Job ${job.id}: ${state} ${progress}%`);
}, 1000);
```

### Scheduled / repeatable jobs

```js
// Run every day at midnight
const queue = new Queue('cleanup');

// Add repeatable job
await queue.add('cleanup-old-records', {}, {
  repeat: {
    cron: '0 0 * * *',     // every day at midnight (cron syntax)
    tz: 'America/New_York',
  },
});

// Worker
queue.process('cleanup-old-records', async (job) => {
  await prisma.item.deleteMany({
    where: { createdAt: { lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
  });
});
```

**Cron syntax:**
```
* * * * *
│ │ │ │ │
│ │ │ │ └── day of week (0-6, 0=Sunday)
│ │ │ └──── month (1-12)
│ │ └────── day of month (1-31)
│ └──────── hour (0-23)
└────────── minute (0-59)
```

Examples: `0 9 * * 1` = every Monday at 9am, `*/5 * * * *` = every 5 minutes.

---

## 6. Multiple Queue Types

```js
// queues/index.js
const emailQueue = require('./emailQueue');
const reportQueue = require('./reportQueue');
const imageQueue = require('./imageQueue');

module.exports = { emailQueue, reportQueue, imageQueue };
```

```js
// workers/index.js — start all workers
require('./emailWorker');
require('./reportWorker');
require('./imageWorker');

console.log('All workers started');
```

```bash
node src/workers/index.js  # start all workers
```

---

## 7. Queue Dashboard (Bull Board)

Bull board gives you a web UI to monitor queues — see jobs, retry failed ones, check progress.

```bash
npm install @bull-board/express
```

```js
// server.js
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const emailQueue = require('./queues/emailQueue');
const reportQueue = require('./queues/reportQueue');

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [
    new BullAdapter(emailQueue),
    new BullAdapter(reportQueue),
  ],
  serverAdapter,
});

app.use('/admin/queues', serverAdapter.getRouter());

// Visit http://localhost:3000/admin/queues
// See: job counts, retry failed jobs, add test jobs, view progress
```

---

## 8. Graceful Shutdown

When your server shuts down, you need to wait for active jobs to finish.

```js
// server.js
const emailQueue = require('./queues/emailQueue');

async function shutdown(signal) {
  console.log(`Received ${signal}, shutting down gracefully...`);

  await emailQueue.close();  // wait for active jobs to complete
  // close other queues...

  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });

  // Force exit after 10 seconds
  setTimeout(() => {
    console.error('Forced shutdown');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
```

---

## 9. Error Handling & Retries

```js
// Automatic retry (configured in queue creation or per job)
const queue = new Queue('email', {
  defaultJobOptions: {
    attempts: 5,
    backoff: {
      type: 'exponential',  // 2s, 4s, 8s, 16s, 32s
      delay: 2000,
    },
  },
});

// Manual retry on specific errors
queue.process(async (job) => {
  try {
    await sendMail(job.data);
  } catch (err) {
    if (err.code === 'RATE_LIMITED') {
      // Retry with a longer delay
      throw new Error('Rate limited');
    }
    if (err.code === 'INVALID_EMAIL') {
      // Don't retry — invalid email will always fail
      await job.discard();  // mark as failed, don't retry
      return;
    }
    throw err;  // retry with default backoff
  }
});
```

---

## 10. Producer-Consumer Pattern (Separate Processes)

For production, run the API server and workers as **separate processes** (or even separate machines):

```
┌──────────────────────┐     Redis      ┌──────────────────────┐
│   Express Server     │────queues─────→│   Worker Process     │
│   (producer)         │                │   (consumer)         │
│                      │                │                      │
│  POST /api/signup    │                │  send email          │
│  queue.add(job)      │                │  process image       │
│  respond 200         │                │  generate report     │
└──────────────────────┘                └──────────────────────┘
```

```bash
# Run separately:
node dist/server.js        # API — handles HTTP, adds jobs
node dist/workers.js       # Workers — processes jobs
```

This means:
- API stays fast (never blocked by heavy work)
- Workers can scale independently (more workers = more parallel processing)
- If API crashes, jobs are safe in Redis
- If a worker crashes, the job is retried

---

## 11. Real-World Example: User Signup Flow

```js
// routes/auth.js
router.post('/api/signup', async (req, res) => {
  const user = await prisma.user.create({
    data: { email: req.body.email, password: hashedPassword },
  });

  // Enqueue multiple jobs — all async
  await Promise.all([
    emailQueue.add('welcome-email', { email: user.email, name: user.name }),
    emailQueue.add('onboarding-series', { userId: user.id, delay: 24 * 60 * 60 * 1000 }),
    analyticsQueue.add('track-signup', { userId: user.id, source: req.headers.referer }),
    digestQueue.add('schedule-weekly-digest', { userId: user.id, repeat: { cron: '0 9 * * 1' } }),
  ]);

  res.status(201).json({ message: 'Check your email!' });
});
```

```js
// workers/emailWorker.js
const emailQueue = require('../queues/emailQueue');
const sendMail = require('../services/mailer');
const prisma = require('../prisma/client');

emailQueue.process('welcome-email', async (job) => {
  await sendMail({
    to: job.data.email,
    subject: `Welcome ${job.data.name}!`,
    html: `<h1>Get started</h1><p>Create your first todo...</p>`,
  });
});

emailQueue.process('onboarding-series', async (job) => {
  // Day 2: "You haven't created any items yet"
  const itemCount = await prisma.item.count({ where: { userId: job.data.userId } });
  if (itemCount === 0) {
    await sendMail({
      to: job.data.email,
      subject: 'Your todo list is empty...',
      html: `<p>Try adding your first item!</p>`,
    });
  }
});
```

---

## 12. Quick Reference

| Concept | Key Point |
|---|---|
| Bull | Redis-backed queue for Node.js |
| Producer | Adds jobs to queue (Express route) |
| Consumer/Worker | Processes jobs (separate process) |
| Job states | waiting → active → completed / failed |
| attempts | Number of retries on failure |
| backoff | Delay between retries (fixed or exponential) |
| delay | Wait before first processing |
| repeat | Cron-based scheduled jobs |
| progress | Report progress from worker (`job.progress(50)`) |
| Concurrency | Process N jobs in parallel (`.process(name, N, fn)`) |
| Bull Board | Web UI to monitor and manage queues |
| Graceful shutdown | Close queue, wait for active jobs to finish |

---

*Last updated: June 2026*
