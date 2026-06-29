# Environment Variables — .env, Secrets, Dev vs Prod

---

## 1. What Are Environment Variables?

**Environment variables** are key-value pairs set **outside** your code, available to the running process. They keep config separate from code.

```
Code (server.js)          Environment (process.env)
─────────────────         ─────────────────────────
const port = process.env.PORT || 3000
                         PORT=3000     (set by OS/user)
                         DB_URL=postgres://...
                         SECRET_KEY=abc123
```

**Why outside code?** So the same code can run in different environments with different settings — without changing a single line.

---

## 2. Why Use Them

| Reason                | Example                                    |
|-----------------------|--------------------------------------------|
| Never commit secrets  | API keys, DB passwords, JWT secrets        |
| Different per env     | `DEV=true`, `NODE_ENV=production`          |
| Easy config changes   | Change port without editing code           |
| Platform standard     | Every hosting service uses them (Render, Railway, Vercel) |

**Golden rule:** Never hardcode secrets in source files.

---

## 3. The .env File

A `.env` file holds env vars during development. It is **never committed to git**.

```
# .env  (in project root — DO NOT COMMIT)
PORT=3000
DB_URL=mongodb://localhost:27017/myapp
JWT_SECRET=my-super-secret-key-change-in-production
NODE_ENV=development
```

**Loading .env in Node.js:**
```bash
npm install dotenv
```

```js
// server.js — top of file
require('dotenv').config();

const port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV);  // "development"
```

**Without dotenv, process.env still works** — you just need to set variables some other way.

---

## 4. Setting Environment Variables

### In Development (local)

**Option 1 — .env file (recommended):**
```
# .env
PORT=3000
```

```js
require('dotenv').config();
```

**Option 2 — inline in terminal:**
```bash
PORT=4000 node server.js
```

**Option 3 — export (persistent in session):**
```bash
export PORT=4000
node server.js
```

### In Production (hosting platform)

Set via hosting dashboard or CLI:
```bash
# Render / Railway / Fly.io — web UI or CLI
railway set PORT 3000
railway set DB_URL postgres://...
```

---

## 5. .env.example Pattern

Commit a template so other developers know what variables to set:

```bash
# .env.example  (COMMIT THIS — no secrets!)
PORT=3000
DB_URL=
JWT_SECRET=
NODE_ENV=development
```

```bash
# .gitignore  (add this)
.env
```

When a new developer clones the project:
```bash
cp .env.example .env
# Edit .env with real values
```

---

## 6. Dev vs Production Config

```js
// server.js
require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL,
  jwtSecret: process.env.JWT_SECRET,
  isDev: process.env.NODE_ENV !== 'production',
  logLevel: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
};
```

**Typical differences:**

| Setting            | Development               | Production               |
|--------------------|---------------------------|--------------------------|
| `NODE_ENV`         | `development`             | `production`             |
| Port               | `3000`                    | `PORT` assigned by host  |
| Database           | Local SQLite / localhost  | Cloud managed DB         |
| Logging            | Verbose (debug)           | Minimal (warn/error)     |
| CORS               | Allow all origins         | Allow specific domain    |
| Error messages     | Full stack traces         | Generic messages         |

**NODE_ENV behavior:**
```js
// Express enables caching + disables verbose errors in production
if (app.get('env') === 'production') {
  // Production-specific setup
}
```

---

## 7. Best Practices

| Practice                     | Why                                      |
|------------------------------|------------------------------------------|
| Never commit `.env`          | Secrets exposed in git history           |
| Always commit `.env.example` | Onboarding new devs                      |
| Use `.gitignore` for `.env`  | Prevent accidental commits               |
| Validate required vars at startup | Fail fast, not at runtime           |
| Keep secrets out of code     | No hardcoded API keys                    |
| Use different values per env  | Dev secrets ≠ prod secrets              |
| Rotate secrets periodically  | Leaked credentials have limited window   |

**Validating required vars:**
```js
function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const dbUrl = requireEnv('DB_URL');
const jwtSecret = requireEnv('JWT_SECRET');
```

---

## 8. Quick Reference

| Concept            | Key Point                                    |
|--------------------|----------------------------------------------|
| What               | Key-value config outside your code           |
| .env file          | Local dev file, NEVER committed              |
| process.env        | Node.js global to access env vars            |
| dotenv             | npm package to load .env into process.env   |
| .env.example       | Template without secrets, always committed   |
| NODE_ENV           | Standard var to detect dev vs production     |
| Secrets            | DB passwords, API keys, JWT secrets          |

---

*Last updated: June 2026*
