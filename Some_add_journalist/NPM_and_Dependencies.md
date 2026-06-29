# NPM & Dependencies — package.json, Semantic Versioning, Dev vs Production

---

## 1. What Is NPM?

**NPM** = Node Package Manager. It's the tool that installs, manages, and shares JavaScript packages.

```
npm install express
     ↓
Downloads express from npmjs.com into node_modules/
Adds it to package.json (dependencies)
Creates/updates package-lock.json
```

---

## 2. package.json — The Heart of Your Project

Every Node.js project has a `package.json`. It describes your project and its dependencies.

```json
{
  "name": "my-todo-app",
  "version": "1.0.0",
  "description": "A simple todo app",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.21.0"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```

**Key fields:**
| Field          | Purpose                                    |
|----------------|--------------------------------------------|
| name           | Project name (must be unique if published) |
| version        | Current version (semver)                    |
| main           | Entry point file                           |
| scripts        | Command shortcuts (`npm run dev`, `npm start`) |
| dependencies   | Packages needed to **run** the app         |
| devDependencies| Packages needed to **develop** the app     |

---

## 3. Semantic Versioning (SemVer)

Every package version follows: **`MAJOR.MINOR.PATCH`**

```
express: 4.21.0
          │  │  │
          │  │  └── PATCH = bug fixes (backward compatible)
          │  └───── MINOR = new features (backward compatible)
          └──────── MAJOR = breaking changes (not backward compatible)
```

**Example:**
```
express 3.0.0 → 4.0.0  (MAJOR: completely different API, breaks old code)
express 4.20.0 → 4.21.0 (MINOR: new features, old code still works)
express 4.21.0 → 4.21.1 (PATCH: bug fix, nothing changes for you)
```

**Rules:**
- `1.0.0` — first stable release
- Below `1.0.0` (e.g., `0.8.0`) is pre-release — anything can change
- Always specify exact versions in production for reproducibility

---

## 4. Version Ranges (^, ~, \*, exact)

In `package.json`, you specify **version ranges** — not exact versions.

| Prefix | Meaning                    | Example       | Allows                     |
|--------|----------------------------|---------------|----------------------------|
| (none) | Exact version              | `4.21.0`      | Only `4.21.0`              |
| `^`    | Compatible with major      | `^4.21.0`     | `4.x.x` (any 4.* except breaking) |
| `~`    | About the same (patch)     | `~4.21.0`     | `4.21.x` (patch updates only) |
| `*`    | Any version                | `*`           | Any version (dangerous)    |
| `>=`   | Greater than or equal     | `>=4.21.0`    | `4.21.0` or higher         |

**What `^4.21.0` actually allows:**
```
✅ 4.21.0
✅ 4.21.1  (patch)
✅ 4.22.0  (minor — new features, safe)
✅ 4.99.99 (any 4.x)
❌ 5.0.0   (major — blocked)
```

**What `~4.21.0` actually allows:**
```
✅ 4.21.0
✅ 4.21.1  (patch)
❌ 4.22.0  (minor — blocked)
```

**What exact `4.21.0` allows:**
```
✅ 4.21.0 only
```

**Best practice:** Use `^` for most packages (get minor updates automatically). Use exact for critical dependencies.

---

## 5. Dependencies vs devDependencies

```bash
npm install express          # → saves in "dependencies"
npm install --save-dev jest  # → saves in "devDependencies"
```

|                | dependencies                        | devDependencies                          |
|----------------|-------------------------------------|-------------------------------------------|
| Used for       | Running the app in production       | Developing/testing the app                |
| Examples       | express, cors, pg, jsonwebtoken     | jest, nodemon, eslint, prettier, typescript |
| Installed where| Everywhere (dev + production)       | Only in development                       |
| npm install    | Both installed                      | Both installed                            |
| npm ci --production | Only dependencies installed     | NOT installed                             |

**Why separate them?**
- Smaller production install = faster deployment
- Testing tools (jest) and linters (eslint) aren't needed on the server

---

## 6. package-lock.json

**What it is:** An auto-generated file that locks every dependency to an **exact** version (including sub-dependencies).

```
package.json:
  express: ^4.21.0  (range)

package-lock.json:
  express: 4.21.2   (exact version installed)
  body-parser: 1.20.3
  qs: 6.11.2
  ... (every sub-dependency pinned)
```

**Why it exists:** Two developers running `npm install` might get different minor versions. The lock file ensures **everyone gets the exact same dependency tree**.

| File              | Commit? | Purpose                        |
|-------------------|---------|--------------------------------|
| package.json      | ✅ Yes  | Human-readable, version ranges |
| package-lock.json | ✅ Yes  | Machine-generated, exact versions (reproducible builds) |
| node_modules      | ❌ No   | Ignored (gitignore) — installed by npm |

**Key commands:**
```bash
npm install     # Install from package.json + package-lock.json
npm ci          # Install EXACTLY from package-lock.json (faster, stricter)
```

`npm ci` is used in CI/CD (GitHub Actions, Render, Railway) for reproducible builds. It fails if `package.json` and `package-lock.json` don't match.

---

## 7. Useful npm Commands

| Command                            | What It Does                                    |
|------------------------------------|-------------------------------------------------|
| `npm init -y`                      | Create a new package.json                       |
| `npm install`                      | Install all dependencies                        |
| `npm install express`              | Install package and add to dependencies         |
| `npm install --save-dev jest`      | Install and add to devDependencies              |
| `npm install -g pm2`              | Install globally (available system-wide)        |
| `npm uninstall express`            | Remove package                                  |
| `npm update`                       | Update packages within version range            |
| `npm outdated`                     | Show which packages are out of date             |
| `npm ci`                           | Clean install from lock file (for CI/CD)        |
| `npm audit`                        | Check for security vulnerabilities              |
| `npm audit fix`                    | Auto-fix security issues                        |
| `npm ls`                           | List installed packages (dependency tree)       |
| `npm run dev`                      | Run the `dev` script                            |
| `npx create-react-app my-app`     | Run a package without installing it             |

---

## 8. Scripts — Your Command Shortcuts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js",
    "test": "jest",
    "lint": "eslint .",
    "format": "prettier --write .",
    "deploy": "git push origin main"
  }
}
```

```bash
npm start      # runs: node server.js
npm run dev    # runs: node --watch server.js
npm test       # runs: jest
npm run lint   # runs: eslint .
```

**npm start** and **npm test** are special — you can omit `run`. All others need `npm run <script>`.

**Pre/Post hooks:**
```json
{
  "scripts": {
    "prebuild": "npm run lint",
    "build": "tsc",
    "postbuild": "npm run deploy"
  }
}
```
`npm run build` automatically runs `prebuild` first, then `build`, then `postbuild`.

---

## 9. node_modules — What Is It?

```
node_modules/
├── express/
├── cors/
├── body-parser/  (dependency of express)
├── array-flatten/ (dependency of express)
├── ...  (hundreds of folders)
```

- Every package can have its own dependencies → deep tree
- `express` alone pulls in ~50+ sub-dependencies
- A typical tiny project has 500–2000 files in `node_modules`

**DO NOT:**
- Commit `node_modules/`
- Manually edit files inside `node_modules/`

---

## 10. Security — npm audit

```bash
npm audit
# Shows: critical, high, moderate, low vulnerabilities

npm audit fix
# Auto-fixes (updates to patched versions)
```

**In CI/CD:**
```bash
npm audit --audit-level=high
# Fails the build if high or critical vulnerabilities exist
```

---

## 11. Common Problems & Fixes

| Problem                      | Likely Cause                       | Fix                                                |
|------------------------------|------------------------------------|----------------------------------------------------|
| `module not found`           | Package not installed              | `npm install <package>`                            |
| `EACCES: permission denied`  | Global install without sudo (Linux)| Use `nvm` to manage Node, avoid `sudo npm install -g` |
| Different behavior on two machines | package-lock.json not committed | Commit and share `package-lock.json`              |
| `npm install` very slow     | Network issues or large dependency count | Use `npm ci` instead, or check network |
| Versions differ from lock file | package.json was edited manually | Run `npm install` to sync, then commit changes   |

---

## 12. Quick Reference

| Concept                     | Key Point                                    |
|-----------------------------|----------------------------------------------|
| package.json                | Project manifest — name, scripts, deps       |
| package-lock.json           | Exact version pinning — always commit        |
| node_modules                | Installed packages — never commit            |
| SemVer                      | MAJOR.MINOR.PATCH                            |
| `^` (caret)                 | Allow minor/patch updates (default)          |
| `~` (tilde)                 | Allow patch updates only                     |
| dependencies                | Needed in production                         |
| devDependencies             | Needed only for development                  |
| npm install                 | Install from package.json + lock             |
| npm ci                      | Exact install from lock file only (CI/CD)    |
| npm start                   | `node server.js`                             |
| npm run dev                 | Custom dev script                            |

---

*Last updated: June 2026*
