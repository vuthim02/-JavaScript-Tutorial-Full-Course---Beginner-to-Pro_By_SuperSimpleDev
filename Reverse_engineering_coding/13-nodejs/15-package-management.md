# Package Management — npm, package.json, Semver, Environment

<img src="https://media.giphy.com/media/KGhpQ5NMoWKQurlHwI/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## npm Commands

```bash
npm init -y                # Initialize (skip prompts)
npm install express        # Install dependency
npm install --save-dev jest
npm install -g nodemon     # Global install
npm uninstall express
npm update
npm start / npm test / npm run build
```

## npm vs Yarn vs pnpm

| Feature | npm | Yarn | pnpm |
|---------|-----|------|------|
| **Lock file** | `package-lock.json` | `yarn.lock` | `pnpm-lock.yaml` |
| **Disk efficiency** | Copies per project | Copies per project | Hard links shared store |
| **Install speed** | Medium | Faster | Faster |
| **Workspaces** | Yes (npm 7+) | Yes | Yes |

pnpm stores packages once globally (content-addressable). Multiple projects sharing the same version use hard links.

---

## package.json

```json
{
    "name": "my-app",
    "version": "1.0.0",
    "main": "index.js",
    "type": "commonjs",
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js",
        "test": "jest"
    },
    "dependencies": { "express": "^4.18.0" },
    "devDependencies": { "jest": "^29.0.0" },
    "engines": { "node": ">=16.0.0" }
}
```

| Field | Purpose |
|-------|---------|
| `name` | Package name |
| `version` | Semver version |
| `main` | Entry point (default: `index.js`) |
| `type` | `"commonjs"` or `"module"` |
| `scripts` | Commands via `npm run <script>` |
| `dependencies` | Production dependencies |
| `devDependencies` | Dev-only dependencies |
| `engines` | Required Node.js version |

### Scripts Special Names

`npm start` → `"start"`, `npm test` → `"test"`, `npm run <name>` → any other.

### Pre/Post Hooks

```json
{
    "scripts": {
        "prebuild": "echo 'Before build'",
        "build": "webpack",
        "postbuild": "echo 'After build'"
    }
}
```

---

## node_modules & Dependency Resolution

```
require('express')
    ├── Look in project's node_modules/express
    ├── Look in parent's node_modules/express
    ├── ... up to root
```

A typical React app: `node_modules/` → ~200-400 MB, 50,000+ files. Dependencies get duplicated across versions.

**package-lock.json** locks exact versions of every dependency for reproducible installs across machines.

---

## Semver (Semantic Versioning)

Format: `MAJOR.MINOR.PATCH`

- **Major**: breaking changes
- **Minor**: new features (backwards-compatible)
- **Patch**: bug fixes (backwards-compatible)

```json
{
    "dependencies": {
        "express": "^4.18.0",   // >=4.18.0 <5.0.0
        "lodash": "~4.17.0",    // >=4.17.0 <4.18.0
        "react": "18.2.0",      // Exactly 18.2.0
    }
}
```

| Range | Meaning |
|-------|---------|
| `^4.18.0` | Compatible with minor (gets patches + features) |
| `~4.17.0` | Approximate, patch only |
| `4.17.0` | Exact |

---

## Environment Variables

```bash
# .env
PORT=3000
DATABASE_URL=postgres://user:pass@localhost:5432/mydb
JWT_SECRET=my-super-secret-key
NODE_ENV=development
```

```bash
npm install dotenv
```

```javascript
require('dotenv').config();
console.log(process.env.PORT); // '3000'
```

### Common Variables

| Variable | Purpose |
|----------|---------|
| `NODE_ENV` | `'development'`, `'production'`, `'test'` |
| `PORT` | HTTP server port |
| `DATABASE_URL` | Database connection string |
| `JWT_SECRET` | JWT signing key |
| `UV_THREADPOOL_SIZE` | libuv thread pool size |

### Best Practices

- Never commit `.env` (add to `.gitignore`). Provide `.env.example`.
- Validate required variables at startup:

```javascript
function requireEnv(name) {
    const value = process.env[name];
    if (!value) throw new Error(`Missing required env var: ${name}`);
    return value;
}
```

| Q | A |
|---|----|
| Which env var controls behavior? | Look for `process.env.X` in code |
| Is there a default? | Check for `|| 'defaultValue'` patterns |
| Is validation done? | Missing env vars should throw at startup |
## Next Steps

[Back to Chapter 14](14-memory-stdio-signals.md): Memory, STDIO, and Signals
[Proceed to Chapter 16](16-reverse-engineering-tactics.md): Reverse Engineering Tactics & Projects to learn about reverse engineering tactics & projects.
