# 09 — package.json

<img src="https://media.giphy.com/media/KGhpQ5NMoWKQurlHwI/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Heart of the Project

Defines metadata, dependencies, scripts, and configuration.

```json
{
  "name": "project",
  "version": "1.0.0"
}
```

## Full Structure

```json
{
    "name": "my-app",
    "version": "1.0.0",
    "description": "A sample project",
    "main": "dist/index.js",
    "module": "dist/index.mjs",
    "types": "dist/index.d.ts",
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "test": "jest",
        "lint": "eslint src/"
    },
    "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
    },
    "devDependencies": {
        "vite": "^5.0.0",
        "eslint": "^8.0.0"
    },
    "peerDependencies": {
        "react": ">=16.8.0"
    },
    "optionalDependencies": {
        "fsevents": "^2.3.2"
    },
    "engines": {
        "node": ">=18.0.0"
    },
    "browserslist": [
        "> 1%",
        "last 2 versions"
    ]
}
```

## Important Fields

| Field | Purpose |
|-------|---------|
| `name` | Package name (used in `npm install`) |
| `version` | Current version (semver) |
| `main` | Entry point for CommonJS (`require()`) |
| `module` | Entry point for ES modules (`import`) |
| `exports` | Modern entry point with subpath exports |
| `scripts` | Commands (`npm run <script>`) |
| `dependencies` | Production packages |
| `devDependencies` | Development-only packages |
| `peerDependencies` | Hosted dependencies (plugins) |
| `type` | `"module"` or `"commonjs"` |

## The `exports` Field (Modern Alternative to `main`)

```json
{
    "exports": {
        ".": {
            "import": "./dist/index.mjs",
            "require": "./dist/index.cjs",
            "types": "./dist/index.d.ts"
        },
        "./utils": {
            "import": "./dist/utils.mjs",
            "require": "./dist/utils.cjs"
        }
    }
}
```

Allows importing subpaths:

```javascript
import { format } from "my-package/utils";
```

## Directory Layout

```
project/
│
├── package.json       ← Project metadata and dependencies
├── node_modules/      ← Installed packages (do not commit)
├── package-lock.json  ← Exact version lock
├── src/               ← Source code
├── dist/              ← Built output
├── public/            ← Static assets
└── .gitignore         ← Ignore node_modules, dist
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What packages exist? | Check `dependencies` and `devDependencies` in package.json. |
| Which scripts are available? | Check `"scripts"` field. Run `npm run <script>`. |
| What is the entry point? | Check `"main"`, `"module"`, or `"exports"` field. |
| What version of Node is required? | Check `"engines"` field. |
| Is this a module or CommonJS project? | Check `"type"` field (omit = CommonJS, `"module"` = ES modules). |
## Next Steps

[Back to Chapter 8](08-commonjs.md): 08 — CommonJS
[Proceed to Chapter 10](10-npm.md): 10 — npm (Node Package Manager) to learn about 10 — npm (node package manager).
