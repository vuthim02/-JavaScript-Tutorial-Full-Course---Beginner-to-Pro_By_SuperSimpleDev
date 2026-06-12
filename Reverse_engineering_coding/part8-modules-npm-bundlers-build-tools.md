# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

# Part 8 — Modules, npm, Package Management, Bundlers, Build Tools, and Project Architecture

---

# Mission

Modern JavaScript development is impossible without understanding:

* Modules
* Package managers
* Dependencies
* Build systems
* Bundlers
* Transpilers
* Project structure

Almost every project built with:

* React
* Vue.js
* Angular
* Node.js
* Next.js
* Nuxt

depends heavily on this ecosystem.

---

# Overall Ecosystem

```text
Developer writes code (ES modules, TypeScript, JSX)
         │
         ▼
Modules imported and exported
         │
         ▼
Dependencies installed via package manager (npm, yarn, pnpm)
         │
         ▼
Package.json tracks everything
         │
         ▼
Build tools process (Babel transpilation, PostCSS)
         │
         ▼
Bundler combines (Webpack, Vite, Rollup, esbuild)
         │
         ▼
Optimization (minification, tree shaking, code splitting)
         │
         ▼
Source maps generated for debugging
         │
         ▼
Output: static files (HTML, JS, CSS) for browser / server
```

---

# Chapter 1 — Why Modules Exist

## The Problem of Global Scope

Imagine:

```javascript
function add() {}
function subtract() {}
function multiply() {}
function divide() {}
```

Now imagine:

10,000 functions.

Putting everything inside one file becomes impossible.

---

## Problems with Global Scripts

| Problem | Example |
|---------|---------|
| Name collisions | Two libraries define `function $()` |
| Implicit dependencies | Must load `jquery.js` before `plugin.js` |
| No encapsulation | Any script can modify any variable |
| Order sensitivity | Script tags must be in exact order |
| Hard to debug | "Who defined this variable?" |
| No tree shaking | Everything loads even if unused |

---

## How Modules Solve These

| Solution | Mechanism |
|----------|-----------|
| Organization | Each file is a module with a clear purpose |
| Reuse | Import any module from any file |
| Encapsulation | Variables are private unless exported |
| Maintainability | Change one module without affecting others |
| Explicit dependencies | `import` makes dependencies clear |
| Tree shaking | Bundler removes unused exports |

---

## Module Timeline

```text
1995: No modules (everything global)
2009: CommonJS (Node.js, require())
2011: AMD (RequireJS, browser)
2013: UMD (Universal, works everywhere)
2015: ES Modules (ES6, official standard)
2018: ES Modules in Node.js (stable)
2020: Dynamic import widely supported
Present: ES Modules is the standard
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why separate this code? | To organize by concern, enable reuse, and encapsulate logic. |
| Which parts belong together? | Functions that operate on the same data or serve the same feature. |
| Which functions should be reusable? | Utility functions (format, validate, calculate) shared across features. |
| How to detect if a project uses modules? | Look for `import`/`export` statements or `require()` calls. |
| What happens without modules? | Global scope pollution, name collisions, fragile script ordering. |

---

# Chapter 2 — ES Modules

## Modern Standard

Introduced in ES6 (2015). Native support in modern browsers and Node.js.

File:

```javascript
math.js
```

```javascript
export function add(a, b) {
    return a + b;
}
```

---

Another file:

```javascript
main.js
```

```javascript
import { add } from "./math.js";

console.log(
    add(2,3)
);
```

Output:

```text
5
```

---

## Flow

```text
main.js (entry point)
   │
   │  import { add } from "./math.js"
   ▼
math.js (module)
   │
   │  export function add() { ... }
   ▼
add() executed in main.js scope
```

---

## How the Browser Loads ES Modules

```html
<script type="module" src="main.js"></script>
```

Key differences from regular scripts:

| Feature | Regular `<script>` | `<script type="module">` |
|---------|-------------------|-------------------------|
| Default scope | Global | Module scope (not global) |
| Deferred by default | No | Yes (equivalent to `defer`) |
| Strict mode | Opt-in | Always strict mode |
| Top-level `await` | Not allowed | Allowed |
| CORS | Same-origin | Cross-origin requires CORS headers |
| Duplicate | Allowed | Error if duplicate `type="module"` |

---

## Module Resolution

```javascript
// Relative paths (must start with ./ or ../)
import { add } from "./math.js";
import { sub } from "../utils/math.js";

// Bare specifiers (npm packages)
import lodash from "lodash";

// URL imports
import { format } from "https://cdn.example.com/utils.js";
```

---

## Module Execution is Deferred

```html
<script type="module">
    console.log("Module"); // Runs after HTML parsed
</script>
<script>
    console.log("Regular"); // Runs immediately when encountered
</script>
// Output order: Regular → Module (if module is in head)
```

---

## Strict Mode by Default

```javascript
// Inside a module, this is undefined (not window)
console.log(this); // undefined

// Variables are not global
var x = 5;
console.log(window.x); // undefined
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Where does this function come from? | Check the `import` statement path. The function is exported from that file. |
| Which file exports it? | Look for `export` keyword in the imported file. |
| Is the file an ES module? | Check for `"type": "module"` in package.json, or `.mjs` extension. |
| What happens if the import path is wrong? | Module not found error (404 for browser, ERR_MODULE_NOT_FOUND for Node). |
| Are ES modules cached? | Yes. Each module is loaded and executed once, then cached. |

---

# Chapter 3 — Named Export

## Multiple Exports

Export individual declarations:

```javascript
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export function multiply(a, b) { return a * b; }
```

---

Export at the end:

```javascript
function add() {}
function subtract() {}
function multiply() {}

export { add, subtract, multiply };
```

---

Import:

```javascript
import {
    add,
    subtract
}
from "./math.js";
```

---

## Memory Layout

```text
math.js (Module)
   │
   ├── export: add       → function(a,b) { return a+b; }
   ├── export: subtract  → function(a,b) { return a-b; }
   └── export: multiply  → function(a,b) { return a*b; }

main.js (Module)
   │
   └── import { add, subtract }
       │
       └── add is a live binding to math.js's add
```

---

## Live Bindings

ES modules create **live bindings**, not copies.

```javascript
// counter.js
export let count = 0;
export function increment() {
    count++;
}

// main.js
import { count, increment } from "./counter.js";
console.log(count); // 0
increment();
console.log(count); // 1 (live binding updated)
```

This is different from CommonJS which copies the value.

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How many named exports does this module have? | Count the `export` keywords (or the `export {}` block). |
| Can I rename a named export on import? | Yes: `import { add as plus } from "./math.js"`. |
| Can a module have both named and default exports? | Yes. `export default class {}` + `export function helper() {}`. |
| What happens if I import a name that doesn't exist? | Syntax error at compile time. |

---

# Chapter 4 — Default Export

## One Primary Export

Each module can have **one** default export.

```javascript
export default function greet()
{
}
```

---

## Default Export Forms

```javascript
// Function declaration
export default function() {} // anonymous
export default function greet() {} // named internally

// Class
export default class {}

// Expression
export default 42;
export default { key: "value" };
export default [1, 2, 3];

// Variable (must be declared separately)
const name = "App";
export default name;
```

---

## Importing Default

```javascript
import greet
from "./greet.js";
```

Notice: no curly braces `{}`.

The imported name can be anything:

```javascript
import hello from "./greet.js";
import myFunction from "./greet.js";
// Both import the same default export
```

---

## Named vs Default Import Syntax

```javascript
// Named: needs curly braces
import { add, subtract } from "./math.js";

// Default: no curly braces
import MathLib from "./math.js";

// Combined: default + named
import React, { useState, useEffect } from "react";
```

---

## When to Use Default vs Named

| Use Case | Recommended |
|----------|-------------|
| Single main export (class, component) | Default |
| Utility library with many functions | Named |
| Module that exports one thing | Default |
| Module that exports multiple things | Named |
| You want to enforce the import name | Named |
| You want the importer to choose the name | Default |

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this default export? | Check for `export default` keyword. |
| Or named export? | Check for `export function`, `export const`, or `export {}`. |
| Can a module have only a default export? | Yes. |
| Can I mix default and named in one import? | Yes: `import def, { named } from "./module.js"`. |
| What is the difference in import syntax? | Default: `import x from "./m.js"`. Named: `import { x } from "./m.js"`. |

---

# Chapter 5 — Import Aliases

## Renaming on Import

```javascript
import {
    add as plus
}
from "./math.js";
```

Now:

```javascript
plus(2,3) // 5
add(2,3)  // ReferenceError: add is not defined
```

---

## Why Use Aliases

### 1. Name Conflicts

```javascript
import { format } from "./date-utils.js";
import { format } from "./string-utils.js"; // Error: duplicate

// Fix:
import { format as formatDate } from "./date-utils.js";
import { format as formatString } from "./string-utils.js";
```

### 2. Shortening Names

```javascript
import { createStore as create } from "./store.js";
```

### 3. Clarifying Context

```javascript
import { get as getUser } from "./services/user.js";
import { get as getPost } from "./services/post.js";
```

---

## Export Aliases (Rename on Export)

```javascript
function internalName() {}

export { internalName as publicName };
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why was an alias used? | Likely to avoid name conflicts or to provide clearer naming. |
| What is the original function name? | The name after `as` is the alias; the original is before `as`. |
| Can I alias a default export? | Yes: `import { default as myDefault } from "./module.js"`. |

---

# Chapter 6 — Export All (Barrel Files)

## Re-exporting

```javascript
export *
from "./math.js";
```

---

## Barrel Files

Collect and re-export modules from a single index file.

Example:

```text
utils/
    math.js
    string.js
    array.js
    index.js   ← barrel file
```

---

## index.js (Barrel)

```javascript
export * from "./math.js";
export * from "./string.js";
export * from "./array.js";
```

---

## Import from Barrel

```javascript
import {
    add,
    capitalize,
    flatten
}
from "./index.js"; // or just "./utils"
```

---

## Named Re-export

```javascript
// Re-export specific names
export { add, subtract } from "./math.js";

// Re-export with rename
export { add as plus } from "./math.js";

// Re-export default as named
export { default as MathLib } from "./math.js";
```

---

## Benefits of Barrel Files

```text
- Single import path instead of many
- Encapsulates internal module structure
- Cleaner imports in consumer code
- Easy to add/remove exports without changing consumers
```

---

## Caution: Barrel Files Can Cause Circular Dependencies

```javascript
// a.js
export * from "./b.js";
export const A = 1;

// b.js
export * from "./a.js"; // Circular!
export const B = 2;
```

Some exports may be `undefined` in circular barrels.

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is function directly exported? | Check if it's defined in the same file you're importing from. |
| Or re-exported? | Check if the import path is a barrel file (index.js) that re-exports from other files. |
| How to find the original definition of a re-exported function? | Follow the chain: import → barrel → source file. |
| What problems can barrel files cause? | Circular dependencies, slower module resolution, importing more than needed. |

---

# Chapter 7 — Module Scope

## Variables Are Private to File

File A:

```javascript
let secret=100;
```

File B:

Cannot access `secret` directly.

---

## What's Private vs Public

```javascript
// math.js

// Private (not exported)
const internalValue = 42;
function helper() { return internalValue * 2; }

// Public (exported)
export function add(a, b) { return a + b; }
export const PI = 3.14159;
```

---

## Advantage

No global pollution.

Before modules:

```javascript
// Every script could access window variables
window.count = 0; // Anyone can modify

// Unclear who defined what
// "Where does this variable come from?"
```

With modules:

```javascript
// counter.js
let count = 0;
export function getCount() { return count; }
export function increment() { count++; }

// main.js
import { getCount, increment } from "./counter.js";
// count is not accessible here directly
// Only through exported functions
```

---

## Module-Level Code Runs Once

```javascript
// config.js
console.log("Config module loaded"); // Runs once
export const API_URL = "https://api.example.com";

// main.js
import { API_URL } from "./config.js"; // "Config module loaded"
import { API_URL } from "./config.js"; // Not loaded again (cached)
```

Modules are cached after first import.

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this variable accessible outside the module? | If it's not exported, no. |
| How can I access a private variable? | Only through exported functions that close over it. |
| Is the module executed once or every import? | Once. The result is cached. |
| Can modules have side effects? | Yes. Code at the module top-level runs on import (e.g., `console.log`, setting up global state). |

---

# Chapter 8 — CommonJS

## Traditional Node.js System

Before ES modules, Node.js used CommonJS.

Export:

```javascript
// math.js
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }

module.exports = {
    add,
    subtract
};
```

---

Import:

```javascript
const math = require("./math");

console.log(math.add(2, 3)); // 5
```

---

## Key Differences from ES Modules

| Feature | CommonJS (`require`) | ES Modules (`import`) |
|---------|---------------------|----------------------|
| Syntax | `require()` | `import ... from` |
| Default | `module.exports = value` | `export default value` |
| Named | `exports.name = value` | `export const name = value` |
| Loading | Synchronous | Asynchronous |
| Resolution | Runtime | Static (parse-time) |
| Live bindings | No (copy of value) | Yes (live binding) |
| Top-level `this` | `module.exports` | `undefined` |
| File extension | Usually `.js` | `.js`, `.mjs` |
| Dynamic import | `require()` anywhere | `import()` (dynamic) |

---

## CommonJS in Node.js Today

Node.js supports both:

```json
// package.json
{
    "type": "commonjs" // default, or omit
}
// .js files → CommonJS

{
    "type": "module"
}
// .js files → ES modules
```

Or use file extensions:

```text
.cjs → CommonJS always
.mjs → ES module always
```

---

## CommonJS is Synchronous

```javascript
const fs = require("fs");     // Synchronous
const data = fs.readFileSync("file.txt"); // Synchronous

// ES version is async:
import fs from "fs/promises";
const data = await fs.readFile("file.txt");
```

This is why CommonJS worked well for Node.js (server-side) but not browsers (which need async loading).

---

## require() Can Be Dynamic

```javascript
// Conditional loading
let module;
if (condition) {
    module = require("./feature-a");
} else {
    module = require("./feature-b");
}

// Dynamic variable path
const path = "./locale/" + language;
const messages = require(path);
```

Dynamic `require()` is not possible with static `import`.

---

## Dynamic import() Works in Both

```javascript
// Works everywhere (returns a promise)
const module = await import("./module.js");
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is project using CommonJS? | Check for `require()`, `module.exports`, or `"type": "commonjs"` in package.json. |
| Or ES modules? | Check for `import`/`export`, or `"type": "module"` in package.json, or `.mjs` extension. |
| What happens if you mix both in the same file? | Can't. A file is either CommonJS or ES module. But you can `import()` CommonJS from ES modules. |
| How to tell which system a package uses? | Check its `package.json` for `"type"` field or `"exports"` map. |

---

# Chapter 9 — package.json

## Heart of the Project

Defines metadata, dependencies, scripts, and configuration.

Example:

```json
{
  "name": "project",
  "version": "1.0.0"
}
```

---

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

---

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

---

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

---

## Directory

```text
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

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What packages exist? | Check `dependencies` and `devDependencies` in package.json. |
| Which scripts are available? | Check `"scripts"` field. Run `npm run <script>`. |
| What is the entry point? | Check `"main"`, `"module"`, or `"exports"` field. |
| What version of Node is required? | Check `"engines"` field. |
| Is this a module or CommonJS project? | Check `"type"` field (omit = CommonJS, `"module"` = ES modules). |

---

# Chapter 10 — npm

## Node Package Manager

The default package manager for Node.js. Downloads and manages dependencies.

---

## Commands

Initialize a project:

```bash
npm init
```

(Prompts for name, version, etc.)

```bash
npm init -y
```

(Accepts all defaults, creates package.json immediately.)

---

Install a package:

```bash
npm install lodash
```

This:

1. Downloads lodash and its dependencies
2. Places them in `node_modules/`
3. Adds `lodash` to `dependencies` in `package.json`
4. Updates `package-lock.json`

---

## Install Variations

```bash
npm install axios              # Production dependency
npm install -D jest            # devDependency (development only)
npm install -g nodemon         # Global install (system-wide)
npm install --save-exact vue   # Exact version (no ^ or ~)
```

---

## What npm Creates

```text
node_modules/
   │
   ├── lodash/
   ├── axios/
   ├── ... (all transitive dependencies)

package-lock.json (exact version tree)
package.json (updated with new dependencies)
```

---

## npm ci (Clean Install)

```bash
npm ci
```

- Installs exact versions from `package-lock.json`
- Deletes `node_modules` first
- Fails if `package-lock.json` is out of sync with `package.json`
- Faster than `npm install` in CI environments

---

## npm Audit

```bash
npm audit
```

Scans dependencies for known vulnerabilities.

```bash
npm audit fix
```

Attempts to fix vulnerabilities by updating packages.

---

## npm outdated

```bash
npm outdated
```

Shows which packages have newer versions available.

```text
Package  Current  Wanted  Latest  Location
lodash    4.17.20 4.17.21 4.17.21  my-app
react     17.0.0  17.0.2  18.2.0   my-app
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which package was installed? | Check `dependencies` or `devDependencies` in package.json. |
| Where is package stored? | `node_modules/<package-name>/` |
| What version was installed? | Check `package-lock.json` or `node_modules/<package>/package.json`. |
| Is the package global or local? | Global: `/usr/local/lib/node_modules/`. Local: `./node_modules/`. |
| How to check if `postinstall` scripts ran? | Check the package's docs. Some packages run build steps on install. |

---

# Chapter 11 — node_modules

## Contains All Dependencies

Can contain thousands of folders.

```text
node_modules/
    ├── .package-lock.json      ← internal lock
    ├── lodash/
    │   ├── package.json
    │   ├── index.js
    │   └── ...
    ├── axios/
    │   ├── package.json
    │   ├── index.js
    │   └── ...
    └── ... (hundreds more)
```

---

## Do Not Manually Edit

Everything in `node_modules` is generated by the package manager.

Manual changes will be overwritten on the next `npm install`.

---

## Never Upload to GitHub

Add to `.gitignore`:

```text
node_modules/
dist/
.env
```

Use:

```text
package.json
package-lock.json
```

instead.

---

## Why node_modules is So Large

```text
"Left pad" problem:
A package that is 1 line of code can have:
  - Its own dependencies (1 line each)
  - Their dependencies
  - Transitive dependencies

Example: create-react-app had ~1,400 packages
Total size: ~200MB
```

---

## Deduplication

npm attempts to hoist shared dependencies to the top-level `node_modules`.

```text
Before dedup:
project/
  node_modules/
    a/
      node_modules/
        lodash@4.17.21
    b/
      node_modules/
        lodash@4.17.21

After dedup (if versions match):
project/
  node_modules/
    lodash@4.17.21  ← shared
    a/
    b/
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How many packages are installed? | `ls node_modules | wc -l` or `npm ls --depth=0`. |
| Which package depends on which? | `npm ls <package>` shows the dependency tree. |
| Why are there duplicate packages? | Two different packages require incompatible versions. |
| Can I delete node_modules and reinstall? | Yes. `rm -rf node_modules && npm install` is a common fix. |

---

# Chapter 12 — package-lock.json

## Stores Exact Versions

Ensures:

Same dependencies across machines.

---

Example:

Developer A

```text
Windows
```

Developer B

```text
Linux
```

Both install identical versions.

---

## Why It's Needed

```json
// package.json
{
    "dependencies": {
        "lodash": "^4.17.20"
    }
}
```

The `^` means "any 4.x.x version". Without lock:

```text
Developer A installs: lodash@4.17.20
Developer B installs (next week): lodash@4.17.25 (new release)
```

Different versions → different behavior.

---

## Lock File Contents

```json
{
    "name": "my-app",
    "lockfileVersion": 3,
    "packages": {
        "node_modules/lodash": {
            "version": "4.17.21",
            "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
            "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z..."",
            "engines": {
                "node": ">=4"
            }
        }
    }
}
```

The `integrity` hash verifies the package hasn't been tampered with.

---

## Lock File Versions

| Version | npm Version | Notes |
|---------|-------------|-------|
| 1 | npm 5-6 | Original format |
| 2 | npm 7-8 | Improved metadata |
| 3 | npm 9+ | Most efficient (current) |

---

## Should You Commit package-lock.json?

**Yes** for application projects (apps).
**No** for library projects (if you want consumers to get the latest compatible versions).

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What exact version is pinned? | Check `package-lock.json` → `packages` → specific version. |
| Is the lock file up to date? | Run `npm install`. If it changes, it was outdated. |
| What happens if you delete the lock file? | A new one is generated with the latest compatible versions. |
| Should you commit the lock file? | Yes for apps (reproducible builds). Optional for libraries. |

---

# Chapter 13 — Dependencies

## Production Packages

```bash
npm install axios
```

Inside:

```json
"dependencies": {
    "axios": "^1.6.0"
}
```

---

## What Goes in dependencies

```text
Runtime libraries:
  - React, Vue, Angular (frameworks)
  - Express (server framework)
  - Axios (HTTP client)
  - Lodash (utilities)
  - Moment/date-fns (date handling)
```

These packages are needed for the application to run in production.

---

## Transitive Dependencies

```text
Your app
  └── axios
       ├── follow-redirects
       └── form-data
            └── asynckit
```

You install `axios` → npm also installs `follow-redirects`, `form-data`, and `asynckit`.

Total packages > what you explicitly installed.

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does the application need this package in production? | If it's used in runtime code (not build/test), yes. |
| Is this a transitive dependency? | Check if you directly installed it or if it's a dependency of another package. |
| How to remove a dependency? | `npm uninstall <package>`. |

---

# Chapter 14 — devDependencies

## Development Tools

```bash
npm install -D vite
```

Stored inside:

```json
"devDependencies": {
    "vite": "^5.0.0"
}
```

---

## What Goes in devDependencies

```text
Build tools:
  - Vite, Webpack, Rollup (bundlers)
  - Babel (transpiler)

Testing:
  - Jest, Vitest, Mocha, Cypress

Linting/Formatting:
  - ESLint, Prettier

Type checking:
  - TypeScript

Development servers:
  - Nodemon, Vite dev server
```

---

## Why Separate?

```text
Production deployment:
  npm install --production
  (only installs dependencies, not devDependencies)
  → Smaller, faster install
  → No build tools, no test frameworks

CI/CD pipeline:
  npm install
  (installs everything for testing and building)
```

---

## Common DevDependencies Examples

| Package | Purpose | Category |
|---------|---------|----------|
| `vite` | Dev server + bundler | Build |
| `@vitejs/plugin-react` | React support for Vite | Build |
| `typescript` | Type checking | Language |
| `eslint` | Code quality | Linting |
| `prettier` | Code formatting | Formatting |
| `jest` | Testing framework | Testing |
| `@testing-library/react` | UI testing | Testing |
| `sass` | SCSS compilation | Styles |

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does application need this in production? | Build tools and test frameworks are not needed. |
| Or only during development? | Check if it's in `devDependencies`. |
| How to move a package from dependencies to devDependencies? | `npm install -D <package>` then remove from `dependencies` manually. |
| What happens if I put a build tool in dependencies? | It's installed in production unnecessarily, increasing size and install time. |

---

# Chapter 15 — Semantic Versioning

## Version Format

```text
Major.Minor.Patch
```

Example:

```text
2.5.1
```

| Component | Meaning | Example |
|-----------|---------|---------|
| Major | Breaking changes | `2.5.1` → `3.0.0` (API changed) |
| Minor | New features (backward compatible) | `2.5.1` → `2.6.0` (new method added) |
| Patch | Bug fixes (backward compatible) | `2.5.1` → `2.5.2` (bug fix) |

---

## Breaking Changes (Major)

```text
- Function removed
- Function signature changed
- Default behavior changed
- Class renamed
- Deprecated features removed
```

Example: React 17 → React 18 (new concurrent features, some breaking changes)

---

## New Features (Minor)

```text
- New function added
- New option added
- New class added

Old code continues to work.
```

---

## Bug Fixes (Patch)

```text
- Crash fixed
- Wrong output fixed
- Edge case handled

No new functionality.
No API changes.
```

---

## Version Symbols in package.json

### ^ (Caret)

```json
"vue": "^3.5.0"
```

Allows:

```text
3.x.x
```

Not:

```text
4.x.x
```

Keeps you on the latest minor/patch within the same major version.

---

### ~ (Tilde)

```json
"vue": "~3.5.0"
```

Allows:

```text
3.5.x
```

Only patch updates.

---

### Exact

```json
"vue": "3.5.0"
```

Only one specific version. No updates.

---

### * (Wildcard)

```json
"vue": "*"
```

Any version (not recommended – unpredictable).

---

### >=

```json
"vue": ">=3.0.0 <4.0.0"
```

Version range.

---

## Version Resolution Example

```json
// package.json
"lodash": "^4.17.20"

// Current installed: 4.17.20
// npm update → 4.17.21 (patch), 4.17.22...
// But NOT 4.18.0 (minor) or 5.0.0 (major)

// "lodash": "~4.17.20"
// npm update → 4.17.21, 4.17.22...
// But NOT 4.18.0
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Can package automatically update? | Depends on the version range (`^`, `~`, exact). |
| Which versions are allowed? | Check the semver range in `package.json`. |
| What does `^2.0.0` mean? | Any version `>=2.0.0 <3.0.0`. |
| What does `~2.0.0` mean? | Any version `>=2.0.0 <2.1.0`. |
| What does `2.0.0` (no symbol) mean? | Only version 2.0.0 exactly. |
| What is the risk of `^`? | New minor versions may introduce unexpected changes. |

---

# Chapter 16 — npm Scripts

## Shortcuts for Common Commands

```json
"scripts":
{
    "dev": "vite",
    "build": "vite build",
    "test": "jest",
    "lint": "eslint src/"
}
```

Run:

```bash
npm run dev
```

---

## Special Script Hooks

npm automatically runs these scripts at certain lifecycle events:

| Script Name | When It Runs |
|-------------|--------------|
| `preinstall` | Before `npm install` |
| `postinstall` | After `npm install` |
| `prepublishOnly` | Before `npm publish` |
| `prebuild` | Before `build` script |
| `postbuild` | After `build` script |

---

## Script Chaining

```json
{
    "scripts": {
        "clean": "rm -rf dist",
        "build": "npm run clean && vite build",
        "deploy": "npm run build && gh-pages -d dist"
    }
}
```

`&&` runs scripts sequentially. `&` runs in parallel.

---

## Passing Arguments

```bash
npm run test -- --coverage
# Passes --coverage to the test command
```

---

## Pre/Post Hooks

```json
{
    "scripts": {
        "prebuild": "npm run clean && npm run lint",
        "build": "vite build",
        "postbuild": "echo Build complete!"
    }
}
```

```bash
npm run build
# Runs: prebuild → build → postbuild
```

---

## npm run vs Direct Command

```bash
# Without npm run (requires global install or full path)
vite          # Error: command not found (unless installed globally)

# With npm run (uses local node_modules/.bin)
npm run dev   # Finds vite in node_modules/.bin/vite
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What scripts are available? | Check `"scripts"` in `package.json`. |
| How to run a script? | `npm run <script-name>`. |
| What does `npm start` do? | Runs the `"start"` script. `npm test` runs `"test"`. `npm run` is for custom scripts. |
| How are scripts resolved? | From `node_modules/.bin/`. npm adds this to PATH when running scripts. |

---

# Chapter 17 — npx

## Temporary Execution

Runs a package without permanently installing it.

```bash
npx create-vite my-app
```

---

## How npx Works

```text
1. Check if package is installed locally (node_modules)
2. If not, check if installed globally
3. If not, download from npm registry
4. Execute the command
5. (Optional: cache for future use)

All without adding to dependencies
```

---

## When to Use npx

```bash
# Scaffold a new project
npx create-react-app my-app
npx create-vite my-app
npx create-next-app my-app

# Run a one-time tool
npx eslint src/
npx prettier --check src/
npx http-server

# Run a specific version
npx cowsay@1.0.0 "Hello"
```

---

## npx vs npm -g

```bash
# Global install (stays forever)
npm install -g create-react-app
create-react-app my-app

# npx (runs once, no global pollution)
npx create-react-app my-app
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this package installed permanently? | If using `npx`, no. If using `npm install -g`, yes. |
| Where does npx cache packages? | `~/.npm/_npx/` (home directory cache). |
| Can npx run local scripts? | Yes. `npx jest` runs `node_modules/.bin/jest`. |

---

# Chapter 18 — Bundlers

## The Problem

Browser cannot efficiently load thousands of files.

```html
<!-- Loading individual modules is slow -->
<script type="module" src="a.js"></script>
<script type="module" src="b.js"></script>
<script type="module" src="c.js"></script>
<!-- ... 500 more requests ... -->
```

Each file = one HTTP request. Hundreds of requests = slow.

---

## The Solution: Bundle

Bundler combines:

```text
500 source files
    ↓
1 optimized bundle (or several chunks)
```

---

## What a Bundler Does

```text
Input:     src/main.js
              import { add } from './math.js'
              import { format } from './date.js'
              import React from 'react'
              import './styles.css'

Processing:
  1. Resolve all imports (follow dependency graph)
  2. Transform files (JSX → JS, TS → JS, SCSS → CSS)
  3. Tree shaking (remove unused code)
  4. Code splitting (optional: split into chunks)
  5. Minify (compress code)

Output:     dist/assets/index.a1b2c3d4.js
            dist/assets/index.e5f6g7h8.css
```

---

## Popular Bundlers

| Bundler | Speed | Configuration | Best For |
|---------|-------|---------------|----------|
| Webpack | Moderate | Complex (webpack.config.js) | Large apps, legacy projects |
| Vite | Fast | Minimal (vite.config.js) | Modern apps, fast dev server |
| Rollup | Fast | Moderate (rollup.config.js) | Libraries, tree-shaking focus |
| Parcel | Fast | Zero config | Prototypes, simple projects |
| esbuild | Very fast | Minimal | Speed-critical, used inside Vite |
| Turbopack | Very fast | Minimal | Next.js (Rust-based, experimental) |

---

## How Webpack Works (Simplified)

```text
Entry: src/index.js
         │
         ▼
Webpack walks the dependency graph
         │
         ▼
For each file, a "loader" processes it:
  - babel-loader: JSX → JS
  - ts-loader: TypeScript → JS
  - css-loader + style-loader: CSS → JS
  - file-loader: images → copied to dist
         │
         ▼
Webpack wraps everything in a runtime
         │
         ▼
Output: dist/bundle.js
```

---

## How Vite Works (Dev vs Prod)

```text
Development:
  Uses native ES modules (no bundling needed)
  - Browser imports modules directly
  - esbuild pre-bundles dependencies
  - Fast Hot Module Replacement (HMR)

Production:
  Uses Rollup for optimized bundling
  - Tree shaking
  - Code splitting
  - Minification
```

---

## Entry and Output (Webpack Example)

```javascript
// webpack.config.js
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.[contenthash].js",
    },
};
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How do thousands of modules become one application? | The bundler resolves the dependency graph, transforms files, and combines them. |
| Which bundler is this project using? | Check for config files: `vite.config.js`, `webpack.config.js`, `rollup.config.js`. |
| What is the entry point? | Check the bundler config for `entry` field, or `index.html`'s `<script>` tag. |
| Where does the output go? | Usually `dist/`, `build/`, or `out/`. |

---

# Chapter 19 — Transpilers

## Convert Modern Code to Older JavaScript

Example:

Modern:

```javascript
const add = (a, b) => a + b;
```

Transpiled (older):

```javascript
var add = function(a, b) {
    return a + b;
};
```

---

## Why Transpile?

```text
Browser compatibility:
- You write modern JS (ES2024)
- Transpiler outputs ES2015 (widely supported)
- Old browsers (IE11, older Chrome/Firefox) can run it

New features become available immediately:
- Optional chaining ?.
- Nullish coalescing ??
- Private class fields #
- async/await
```

---

## Babel

The most popular JavaScript transpiler.

```bash
npm install -D @babel/core @babel/preset-env
```

Configuration:

```json
// babel.config.json
{
    "presets": [
        ["@babel/preset-env", {
            "targets": "> 0.25%, not dead"
        }]
    ]
}
```

---

## Babel Presets

| Preset | Converts |
|--------|----------|
| `@babel/preset-env` | Modern JS → older JS (targets based) |
| `@babel/preset-react` | JSX → `React.createElement()` |
| `@babel/preset-typescript` | TypeScript → JS |
| `@babel/preset-flow` | Flow types → JS |

---

## Babel Plugins (Individual Transformations)

```json
{
    "plugins": [
        "@babel/plugin-transform-arrow-functions",
        "@babel/plugin-transform-optional-chaining"
    ]
}
```

---

## SWC and esbuild (Faster Alternatives)

```text
Babel:  written in JavaScript (slower but extensible)
SWC:    written in Rust (10-20x faster than Babel)
esbuild: written in Go (10-100x faster than Babel)

Many modern tools:
  - Vite uses esbuild for transforms
  - Next.js uses SWC
  - Parcel uses SWC
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this project using a transpiler? | Check for `babel.config.*`, `.babelrc`, or transpiler in bundler config. |
| What is being transpiled? | JSX, TypeScript, modern JS features. |
| What target browsers? | Check `browserslist` in `package.json` or `@babel/preset-env` targets. |
| Can I see the original source? | With source maps enabled, DevTools shows original code. |

---

# Chapter 20 — Tree Shaking

## Removing Unused Code

Example:

Imported:

```javascript
import {
    add
}
from "./math";
```

Unused:

```javascript
multiply()
subtract()
divide()
```

get removed from the final bundle.

---

## How Tree Shaking Works

```text
Requires:
1. ES module syntax (static import/export)
2. Side-effect-free modules
3. Bundler configured for tree shaking

Process:
- Bundler analyzes which exports are actually used
- Unused exports are "dead code eliminated"
- The resulting bundle only contains used code
```

```javascript
// math.js – all exported
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export function multiply(a, b) { return a * b; }

// main.js – only imports add
import { add } from "./math";

// After tree shaking, bundle contains:
// function add(a, b) { return a + b; }
// (subtract and multiply are removed)
```

---

## Side Effects

If a module has side effects, it cannot be tree-shaken:

```javascript
// side-effect.js
console.log("Module loaded!"); // Side effect!
export function helper() {}

// Even if helper is not imported, console.log still runs
// Bundler cannot remove this module
```

Mark packages as side-effect-free in `package.json`:

```json
{
    "sideEffects": false
}
```

Or specify files with side effects:

```json
{
    "sideEffects": [
        "*.css",
        "./src/polyfills.js"
    ]
}
```

---

## Benefits

```text
Smaller bundles:
  - lodash: import { debounce } → only debounce included
  - moment.js: all locales removed if unused
  - UI libraries: only used components

Faster downloads
Faster parsing
Less memory
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is tree shaking working? | Check if unused imports are in the final bundle. Use bundle analyzer tools. |
| Why might tree shaking fail? | CommonJS (`require`), dynamic imports, side effects, module-level code. |
| How to check bundle contents? | Use `vite build --analyze`, `webpack-bundle-analyzer`, or source maps. |

---

# Chapter 21 — Source Maps

## Debugging the Original Code

Generated during build.

Without source maps:

```text
minified.js
function a(b,c){return b+c}
```

Hard to understand. Error points to line 1 regardless of original location.

---

With source maps:

Developer sees original source in DevTools.

```text
DevTools:
  src/
    main.js    ← Original source shown
    utils.js   ← Even though bundled
```

---

## How Source Maps Work

```text
Bundle + Source Map:
  dist/bundle.js              ← minified code
  dist/bundle.js.map           ← mapping file

The .map file contains:
  - Original file names
  - Original line numbers
  - Original column numbers
  - Mappings: "minified position → original position"

Chrome/Firefox DevTools reads the .map file automatically
when they detect the comment at the end of the bundle:
//# sourceMappingURL=bundle.js.map
```

---

## Source Map Types

| Type | Quality | Build Speed | Size |
|------|---------|-------------|------|
| `source-map` | Original source | Slow | Large |
| `eval` | Transformed only | Fast | None (inline) |
| `inline-source-map` | Original source | Moderate | Large (inline) |
| `hidden-source-map` | Original source | Moderate | Separate (no comment) |
| `nosources-source-map` | Stack traces only | Moderate | Small (no source content) |

---

## Source Maps in Production

```javascript
// vite.config.js
export default {
    build: {
        sourcemap: true, // Generate source maps
    },
};
```

**Security note:** Source maps expose your original source code. In production, consider:
- Not shipping source maps
- Using `hidden-source-map` (for internal debugging)
- Restricting access to `.map` files

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does this bundle have source maps? | Check for `.map` files in `dist/` or `//# sourceMappingURL=` comment. |
| How to enable source maps? | In bundler config, set `sourcemap: true` or equivalent. |
| Are source maps safe in production? | They expose original source. Restrict access or use `hidden-source-map`. |
| How to debug without source maps? | Deobfuscate variable names manually, use `console.log` with original source. |

---

# Chapter 22 — Minification

## Code Compression

Transforms:

```javascript
function calculateTotal(price, tax) {
    return price + (price * tax);
}
```

Into:

```javascript
function a(b,c){return b+b*c}
```

---

## Minification Techniques

| Technique | Before | After |
|-----------|--------|-------|
| Whitespace removal | `function add(a, b) { return a + b; }` | `function add(a,b){return a+b}` |
| Variable renaming | `calculateTotal(price, tax)` | `a(b,c)` |
| Inlining | `const TWO = 2; return x * TWO;` | `return x * 2;` |
| Dead code removal | `if (false) { ... }` | (removed) |
| Boolean simplification | `if (true) { doStuff(); }` | `doStuff();` |
| String shortening | `errorMessage` (used once) | inlined |

---

## Minification Tools

| Tool | Language | Used By |
|------|----------|---------|
| Terser | JS | Webpack, Rollup (default) |
| esbuild | Go | Vite (dev), standalone |
| SWC | Rust | Next.js, Parcel |
| UglifyJS | JS | Older tools (deprecated) |

---

## Minification Stats

```text
Original: 250 KB (readable, commented, full names)
Minified: 80 KB  (compressed)
Gzipped:  22 KB  (server compression)

Total reduction: ~91% from original
```

---

## Minification vs Compression (Gzip)

```text
Minification: Code-level optimization (renames vars, removes whitespace)
Gzip: Network-level compression (same as zip files)

Both are used:
- Server sends .js.gz (gzip compressed)
- Browser decompresses to .js (minified)
- Browser parses .js (minified → executed)
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is the code minified? | Variable names are single letters, no whitespace, no comments. |
| Which minifier was used? | Check the bundle header comment (e.g., `/*! Terser */`). |
| Can I read minified code? | Use "Pretty print" in DevTools ({} button) or source maps. |
| How much space was saved? | Compare original file size vs minified size vs gzipped size. |

---

# Chapter 23 — Code Splitting

## Loading Only What's Needed

Instead of:

```text
1MB bundle (entire app)
```

Split into:

```text
Home page      → 200KB
Dashboard      → 300KB
Settings       → 150KB
Admin panel    → 350KB
```

Loaded only when the user visits that route.

---

## Dynamic Import

The key to code splitting:

```javascript
// Static import (loaded immediately, included in bundle)
import { processData } from "./utils/data.js";

// Dynamic import (loaded on demand)
const module = await import("./admin.js");
```

`import()` returns a Promise. The module is fetched when the `import()` call executes.

---

## Dynamic Import in Action

```javascript
// Instead of:
import { AdminDashboard } from "./pages/Admin.js";

// Do:
const AdminDashboard = React.lazy(() => import("./pages/Admin.js"));

// Or vanilla:
button.addEventListener("click", async () => {
    const { showAdmin } = await import("./admin.js");
    showAdmin();
});
```

---

## How the Bundler Splits

```text
Entry: src/main.js
          │
          ▼
Dependency graph:
  main.js
    ├─ home.js        → included in main chunk
    ├─ dashboard.js   → included in main chunk
    └─ import("./admin.js") → SEPARATE CHUNK

Output:
  dist/main.a1b2.js         (shared code + home + dashboard)
  dist/admin.c3d4.js        (admin module, loaded on demand)
```

---

## Route-Based Splitting (React Example)

```javascript
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Admin = lazy(() => import("./pages/Admin"));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
```

---

## Chunk Naming

```javascript
// vite.config.js
export default {
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: "chunks/[name]-[hash].js",
                manualChunks: {
                    vendor: ["react", "react-dom"], // Separate vendor chunk
                },
            },
        },
    },
};
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is module loaded immediately? | Static `import` = immediate. Dynamic `import()` = on demand. |
| Or lazily? | Check for `import()`, `React.lazy()`, or route-based dynamic imports. |
| What is the split point? | The location of the `import()` call defines the split boundary. |
| How many chunks does the app produce? | Check the `dist/` folder for multiple JS files. |

---

# Chapter 24 — Environment Variables

## Configuration Separation

File:

```text
.env
```

Example:

```text
API_URL=https://example.com
API_KEY=abc123
NODE_ENV=production
```

---

## Access in Node.js

```javascript
// Node.js (after dotenv or built-in)
const apiUrl = process.env.API_URL;
```

---

## Access in Vite (Frontend)

```javascript
// Vite exposes env vars prefixed with VITE_
console.log(import.meta.env.VITE_API_URL);

// .env
VITE_API_URL=https://api.example.com
```

---

## Access in Create React App

```javascript
// CRA exposes env vars prefixed with REACT_APP_
console.log(process.env.REACT_APP_API_URL);
```

---

## .env Files Hierarchy

```text
.env                     ← Always loaded (base)
.env.local               ← Local overrides (never committed)
.env.development         ← Development only
.env.production          ← Production only
.env.test                ← Test only
```

Priority: specific > general. Later files override earlier ones.

---

## Security Warning

```text
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

---

## .gitignore

```text
# Keep .env out of version control!
.env
.env.local
.env.*.local

# Exception: commit .env.example (template without real values)
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Where do environment variables come from? | `.env` files, system environment, or CI/CD pipeline variables. |
| Are they available at build time or runtime? | Build time: bundled into output. Runtime: `process.env` (Node.js) or `import.meta.env` (Vite). |
| Are secrets exposed to frontend? | Check if the variable is prefixed with `VITE_` or `REACT_APP_`. If so, it's in the bundle. |
| How to find which .env files exist? | Look for `.env`, `.env.local`, `.env.development`, `.env.production`. |

---

# Chapter 25 — Project Structure

## Small Project

```text
src/
│
├── main.js          ← Entry point
├── app.js           ← Application logic
├── utils.js         ← Utility functions
└── config.js        ← Configuration
```

---

## Medium Project (Feature-based)

```text
src/
│
├── components/       ← Reusable UI components
│   ├── Button.js
│   ├── Card.js
│   └── Modal.js
│
├── pages/            ← Route-level components
│   ├── Home.js
│   ├── Dashboard.js
│   └── Settings.js
│
├── services/         ← API calls, external integrations
│   ├── api.js
│   └── auth.js
│
├── utils/            ← Pure utility functions
│   ├── format.js
│   └── validation.js
│
├── store/            ← State management
│   └── index.js
│
├── assets/           ← Images, fonts, SVGs
│   └── logo.svg
│
├── styles/           ← Global styles
│   └── global.css
│
└── main.js           ← Entry point
```

---

## Large Project (Module/Feature-based)

```text
src/
│
├── core/             ← Core framework, base classes
│   ├── App.js
│   ├── Router.js
│   └── ErrorBoundary.js
│
├── features/         ← Each feature is self-contained
│   ├── auth/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── index.js
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── index.js
│   │
│   └── settings/
│       └── ...
│
├── shared/           ← Shared across features
│   ├── components/
│   │   ├── Button.js
│   │   └── Modal.js
│   ├── hooks/
│   │   └── useAuth.js
│   └── utils/
│
├── services/         ← Shared API layer
│   └── api.js
│
├── config/           ← Environment config
│   └── constants.js
│
├── store/            ← Global state
│   └── index.js
│
├── tests/            ← Test setup, mocks
│   └── setup.js
│
├── types/            ← TypeScript types
│   └── index.d.ts
│
└── main.js           ← Entry point
```

---

## Key Principles

```text
Separation of concerns:
  - UI components ≠ business logic ≠ data fetching

Feature colocation:
  - Everything a feature needs is in one folder

Explicit boundaries:
  - Features don't import from other features' internals
  - Shared code goes in shared/ or core/

Consistent naming:
  - PascalCase for components
  - camelCase for utilities
  - kebab-case for files
```

---

# Chapter 26 — Monorepo

## Single Repository, Multiple Packages

Contains:

```text
frontend/     ← React app
backend/      ← Express API
mobile/       ← React Native app
shared/       ← Shared types, utilities
tools/        ← ESLint config, build scripts
```

---

## Benefits

```text
Shared code:
  - Types, utilities, configs shared across projects
  - Change once, update everywhere

Unified versioning:
  - All packages in one repo
  - Atomic commits (change API + consumer together)

Simplified CI/CD:
  - One pipeline
  - One test suite

Easier refactoring:
  - Rename a shared type → all consumers updated
```

---

## Monorepo Tools

| Tool | Key Feature |
|------|-------------|
| Nx | Dependency graph, affected commands, caching |
| Turborepo | Parallel builds, caching, task orchestration |
| pnpm workspaces | Built-in workspace support, disk efficient |
| Lerna | Publishing, versioning (older, often used with Nx) |
| Rush | Microsoft's monorepo manager |

---

## pnpm Workspaces Example

```yaml
# pnpm-workspace.yaml
packages:
  - "frontend"
  - "backend"
  - "shared"
  - "tools/*"
```

```json
// shared/package.json
{
    "name": "@myapp/shared",
    "main": "index.js"
}

// frontend/package.json
{
    "name": "@myapp/frontend",
    "dependencies": {
        "@myapp/shared": "workspace:*"
    }
}
```

---

## Turborepo Example

```json
// turbo.json
{
    "pipeline": {
        "build": {
            "dependsOn": ["^build"],
            "outputs": ["dist/**"]
        },
        "test": {
            "dependsOn": ["build"]
        },
        "dev": {
            "cache": false
        }
    }
}
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How many packages are in this repo? | Check `packages/` or `package.json`'s `workspaces` field. |
| Which monorepo tool is used? | Check for `turbo.json`, `nx.json`, `pnpm-workspace.yaml`, `lerna.json`. |
| Where is shared code? | Usually in a `shared/` or `packages/shared/` directory. |
| Can one package depend on another? | Yes, via workspace protocol (`workspace:*`). |

---

# Chapter 27 — Package Managers

## npm (Node Package Manager)

Default. Ships with Node.js.

```bash
npm install axios
```

```text
Advantages:
  - Comes with Node (no separate install)
  - Largest ecosystem
  - Familiar to everyone

Disadvantages:
  - Slower than alternatives
  - Lock file can become large
  - Less strict about dependency hoisting
```

---

## Yarn

Created by Facebook/Meta. Faster than npm.

```bash
yarn add axios
```

```text
Advantages:
  - Faster than npm v1-v6 (similar to npm v7+)
  - Offline cache (install without internet)
  - yarn.lock is deterministic
  - Workspaces built-in

Disadvantages:
  - Separate install required
  - Slightly different commands
  - Two versions (Classic vs Berry) with different behaviors
```

---

## pnpm

Disk-efficient. Uses hard links.

```bash
pnpm add axios
```

```text
Advantages:
  - Extremely fast
  - Disk efficient (hard links, single copy of each version)
  - Strict (packages can only access their declared dependencies)
  - Workspaces built-in
  - Monorepo-friendly

How pnpm saves space:
  node_modules/.pnpm/
    lodash@4.17.21/  ← single copy (hard linked)
    react@18.2.0/    ← single copy

  Each project's node_modules contains symlinks to .pnpm
```

---

## Bun

Newest. Written in Zig. Includes runtime + package manager + bundler + test runner.

```bash
bun add axios
```

```text
Advantages:
  - Extremely fast (10-30x npm)
  - Built-in: runtime, bundler, test runner
  - Node.js compatible
  - Native TypeScript support

Disadvantages:
  - Newer (less battle-tested)
  - Smaller ecosystem of plugins
  - Some Node.js APIs not fully implemented
```

---

## Comparison

| Feature | npm | Yarn | pnpm | Bun |
|---------|-----|------|------|-----|
| Install speed | Moderate | Fast | Fast | Very fast |
| Disk usage | High | High | Low | Moderate |
| Workspaces | Yes | Yes | Yes | Yes |
| Lock file | package-lock.json | yarn.lock | pnpm-lock.yaml | bun.lockb |
| Offline cache | Limited | Yes | Yes | Yes |
| Strict deps | No | No | Yes | No |
| Run scripts | npm run | yarn | pnpm | bun run |
| Monorepo tools | Limited | Berry | Built-in | Minimal |

---

# Senior Reverse Engineering Checklist

Whenever entering a project ask:

### Where is package.json?

Root directory is the most common location. Look for it first.

---

### Which package manager?

Check for lock files: `package-lock.json` (npm), `yarn.lock` (Yarn), `pnpm-lock.yaml` (pnpm), `bun.lockb` (Bun).

---

### Which dependencies?

Read `dependencies` (production) and `devDependencies` (development).

---

### Which build tool?

Check `devDependencies` for: `vite`, `webpack`, `rollup`, `parcel`.

---

### Which bundler?

Likely the same as the build tool. Check config files: `vite.config.*`, `webpack.config.*`, `rollup.config.*`.

---

### Which scripts exist?

Run `npm run` (without arguments) to list all available scripts.

---

### Which modules export functionality?

Look at `src/` directory structure. Entry point is usually `src/main.js` or `src/index.js`.

---

### How are files organized?

Feature-based? Type-based? Monorepo? Check folder structure.

---

### Which files are entry points?

Check `index.html` for `<script type="module" src="...">`. Check `package.json` for `"main"`.

---

### Which modules are loaded dynamically?

Search for `import(` or `React.lazy(` in the codebase.

---

### Where do environment variables come from?

Look for `.env` files, `process.env`, or `import.meta.env`.

---

### Which code runs in development only?

Check for `if (process.env.NODE_ENV === 'development')`, dev tools, mock data.

---

### Which code runs in production?

Build output (`dist/`, `build/`). Production-only optimizations, analytics, error tracking.

---

# Projects

## Math Library

Structure:

```text
math/
│
├── add.js          ← export function add(a, b)
├── subtract.js     ← export function subtract(a, b)
├── multiply.js     ← export function multiply(a, b)
├── divide.js       ← export function divide(a, b)
└── index.js        ← export * from "./add.js" (barrel file)
```

```javascript
// Usage
import { add, subtract } from "./math/index.js";
console.log(add(5, 3)); // 8
```

---

## Utilities Package

Modules:

```text
utils/
│
├── array.js        ← flatten, unique, groupBy, shuffle
├── string.js       ← capitalize, truncate, slugify, camelCase
├── date.js         ← formatDate, daysBetween, isWeekend
├── number.js       ← clamp, round, randomInt, formatCurrency
└── index.js        ← barrel file
```

Each module is self-contained. No internal dependencies between them.

---

## Todo Application

Folders:

```text
todo-app/
│
├── package.json
├── vite.config.js
├── index.html
│
└── src/
    ├── main.js
    │
    ├── components/
    │   ├── TodoList.js
    │   ├── TodoItem.js
    │   ├── AddTodo.js
    │   └── FilterBar.js
    │
    ├── services/
    │   └── todoApi.js       ← fetch, add, delete, update
    │
    ├── utils/
    │   ├── storage.js       ← localStorage wrapper
    │   └── filters.js       ← filter/sort logic
    │
    └── store/
        └── todoStore.js     ← state management
```

---

## API Client Package

Exports:

```javascript
// client.js
export async function get(url, options) {}
export async function post(url, data, options) {}
export async function put(url, data, options) {}
export async function del(url, options) {}

// Usage
import { get, post } from "@myapp/api-client";

const users = await get("/users");
const newUser = await post("/users", { name: "Alice" });
```

---

## Multi-package Monorepo

Structure:

```text
monorepo/
│
├── pnpm-workspace.yaml
├── turbo.json
├── package.json          ← root (scripts: dev, build, test)
│
├── packages/
│   ├── shared/           ← @myapp/shared
│   │   ├── package.json
│   │   └── src/
│   │       ├── types.js
│   │       └── utils.js
│   │
│   ├── frontend/         ← @myapp/frontend
│   │   ├── package.json
│   │   └── src/
│   │       └── main.js
│   │
│   └── backend/          ← @myapp/backend
│       ├── package.json
│       └── src/
│           └── server.js
│
└── tools/
    ├── eslint-config/    ← @myapp/eslint-config
    └── tsconfig/         ← @myapp/tsconfig
```

Using:

* pnpm (workspaces)
* Turborepo (parallel builds, caching)

---

# Part 8 Summary

| Concept | Key Takeaway |
|---------|-------------|
| ES Modules | `import`/`export` – the standard module system |
| Named export | `export function name() {}` → `import { name }` |
| Default export | `export default {}` → `import name` (no `{}`) |
| Barrel files | `index.js` that re-exports multiple modules |
| Module scope | Variables are private unless exported |
| CommonJS | `require()`/`module.exports` – Node.js legacy system |
| package.json | Project metadata, dependencies, scripts |
| npm | Default package manager |
| node_modules | Dependency storage (do not commit) |
| package-lock.json | Exact version lock for reproducibility |
| dependencies | Production packages |
| devDependencies | Development-only tools |
| Semantic versioning | `Major.Minor.Patch` with `^` `~` ranges |
| npm scripts | Shortcuts: `npm run dev`, `npm run build` |
| npx | Run packages without installing |
| Bundlers | Combine many files into optimized bundles |
| Transpilers | Convert modern JS to older versions (Babel) |
| Tree shaking | Remove unused code from bundles |
| Source maps | Map minified code back to original |
| Minification | Compress code (smaller files) |
| Code splitting | Load code on demand with `import()` |
| Environment variables | `.env` files for configuration |
| Project structure | Feature-based or type-based organization |
| Monorepo | Multiple packages in one repository |
| Package managers | npm, Yarn, pnpm, Bun (different trade-offs) |

---

# Next Part (Part 9)

We will enter one of the largest sections of the JavaScript ecosystem:

# Browser Internals, DOM, BOM, Events, Forms, Storage, Rendering Pipeline, and Browser APIs

including absolutely everything behind how browsers execute JavaScript and render interactive web pages.
