# 24 — Environment Variables

<img src="https://media.giphy.com/media/SvFocn0wNMx0iv2rYz/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Configuration Separation

File: `.env`

Example:

```
API_URL=https://example.com
API_KEY=abc123
NODE_ENV=production
```

## Access in Node.js

```javascript
// Node.js (after dotenv or built-in)
const apiUrl = process.env.API_URL;
```

## Access in Vite (Frontend)

```javascript
// Vite exposes env vars prefixed with VITE_
console.log(import.meta.env.VITE_API_URL);

// .env
VITE_API_URL=https://api.example.com
```

## Access in Create React App

```javascript
// CRA exposes env vars prefixed with REACT_APP_
console.log(process.env.REACT_APP_API_URL);
```

## .env Files Hierarchy

```
.env                     ← Always loaded (base)
.env.local               ← Local overrides (never committed)
.env.development         ← Development only
.env.production          ← Production only
.env.test                ← Test only
```

Priority: specific > general. Later files override earlier ones.

## Security Warning

```
NEVER store:
  - Passwords
  - Secrets
  - API keys
  - Database credentials

... inside frontend code.

Why?
  Frontend .env variables are BUNDLED into the JavaScript.
  Anyone can view them in DevTools → Sources → bundle.

Solution:
  Use server-side code (Node.js backend, BFF layer) to keep secrets.
  Send only public data to the frontend.
```

## .gitignore

```
# Keep .env out of version control!
.env
.env.local
.env.*.local

# Exception: commit .env.example (template without real values)
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Where do environment variables come from? | `.env` files, system environment, or CI/CD pipeline variables. |
| Are they available at build time or runtime? | Build time: bundled into output. Runtime: `process.env` (Node.js) or `import.meta.env` (Vite). |
| Are secrets exposed to frontend? | Check if the variable is prefixed with `VITE_` or `REACT_APP_`. If so, it's in the bundle. |
| How to find which .env files exist? | Look for `.env`, `.env.local`, `.env.development`, `.env.production`. |
## Next Steps

[Back to Chapter 23](23-code-splitting.md): 23 — Code Splitting
[Proceed to Chapter 25](25-project-structure.md): 25 — Project Structure to learn about 25 — project structure.
