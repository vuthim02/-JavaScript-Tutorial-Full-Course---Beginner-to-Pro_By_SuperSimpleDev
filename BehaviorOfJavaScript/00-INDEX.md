# Behavior of JavaScript - Complete Reference

**68,284 lines** of comprehensive JavaScript documentation across 28 files (~1.7MB total).

---

## File Index

### Core JavaScript (01-16)

| # | File | Topics | Lines |
|---|------|--------|-------|
| 01 | [JavaScript Fundamentals](01-JavaScript-Fundamentals.md) | Data types, variables, operators, control flow, type conversion, type checking | 2,308 |
| 02 | [Functions and Closures](02-Functions-and-Closures.md) | Declarations, expressions, arrow functions, closures, this, call/apply/bind, execution context, generators | 2,857 |
| 03 | [Objects, Prototypes, and Classes](03-Objects-Prototypes-and-Classes.md) | Object creation, properties, prototypes, ES6 classes, inheritance, Proxy/Reflect, WeakRef | 2,171 |
| 04 | [Asynchronous JavaScript](04-Asynchronous-JavaScript.md) | Event loop, Promises, async/await, generators, iterators, Web Workers, Fetch, Observers | 2,810 |
| 05 | [ES6+ Modern JavaScript](05-ES6-Modern-JavaScript.md) | Arrow functions, destructuring, modules, Map/Set, Symbol, Proxy, Temporal API, all new methods | 2,629 |
| 06 | [DOM Manipulation and Events](06-DOM-Manipulation-and-Events.md) | DOM tree, selecting, creating, modifying, events, delegation, propagation, Web Components | 2,479 |
| 07 | [Error Handling and Debugging](07-Error-Handling-and-Debugging.md) | Error types, try/catch, custom errors, console methods, DevTools, breakpoints, source maps | 2,955 |
| 08 | [Functional Programming](08-Functional-Programming.md) | Pure functions, immutability, currying, composition, functors, monads, memoization, FP libraries | 2,438 |
| 09 | [JavaScript Engine Internals](09-JavaScript-Engine-Internals.md) | V8, JIT compilation, hidden classes, garbage collection, memory model, optimization | 1,884 |
| 10 | [Web APIs](10-Web-APIs.md) | Fetch, Storage, Workers, Canvas, WebGL, Observers, Crypto, Clipboard, Geolocation, 60+ APIs | 3,480 |
| 11 | [Design Patterns](11-Design-Patterns.md) | 50 patterns: Singleton, Factory, Observer, MVC, Redux, HOC, Memoization, Circuit Breaker | 2,196 |
| 12 | [RegExp, JSON, Date/Math](12-RegExp-JSON-Date-Math.md) | Regular expressions, JSON, Date/Time, Math, Number, BigInt, Intl | 1,476 |
| 13 | [Security, Performance, Testing](13-Security-Performance-Testing.md) | XSS, CSRF, CORS, Core Web Vitals, Jest, Playwright, Webpack, Vite, Babel, TypeScript | 2,108 |
| 14 | [Node.js Fundamentals](14-Node.js-Fundamentals.md) | Modules, fs, http, streams, cluster, worker threads, Express, REST, GraphQL, deployment | 2,814 |
| 15 | [Strings, Arrays, Collections](15-Strings-Arrays-Collections.md) | All string/array methods, TypedArrays, Map, Set, WeakMap, WeakSet, iterators, generators | 1,948 |
| 16 | [OOP and Inheritance](16-OOP-and-Inheritance.md) | OOP principles, prototypes, classes, inheritance, mixins, SOLID, composition, Proxy | 2,073 |

### Languages & Frameworks (17-19)

| # | File | Topics | Lines |
|---|------|--------|-------|
| 17 | [TypeScript Complete](17-TypeScript-Complete.md) | Types, generics, utility types, mapped/conditional types, tsconfig, React/Node typing, patterns | 1,703 |
| 18 | [React & Framework Patterns](18-React-Framework-Patterns.md) | Hooks, state management, Next.js, Vue, Angular, Svelte, component patterns, Server Components | 2,137 |
| 19 | [Build Tools & Bundlers](19-Build-Tools-and-Bundlers.md) | Webpack, Vite, Rollup, esbuild, Babel, ESLint, Prettier, monorepos, package managers | 2,526 |

### Testing (20)

| # | File | Topics | Lines |
|---|------|--------|-------|
| 20 | [Testing Deep Dive](20-Testing-Deep-Dive.md) | Jest, Vitest, React Testing Library, Cypress, Playwright, mocking, TDD/BDD, CI/CD | 3,488 |

### Backend & Data (21-23)

| # | File | Topics | Lines |
|---|------|--------|-------|
| 21 | [Database & ORM](21-Database-and-ORM.md) | MongoDB, Mongoose, PostgreSQL, Prisma, Drizzle, Redis, Supabase, migrations, N+1 | 2,266 |
| 22 | [API Design Patterns](22-API-Design-Patterns.md) | REST, GraphQL, tRPC, WebSocket, SSE, pagination, rate limiting, documentation | 3,513 |
| 23 | [Authentication & Authorization](23-Authentication-and-Authorization.md) | JWT, OAuth, Passkeys, 2FA, RBAC, ABAC, session management, security headers | 1,921 |

### DevOps & Infrastructure (24-25)

| # | File | Topics | Lines |
|---|------|--------|-------|
| 24 | [DevOps & Deployment](24-DevOps-and-Deployment.md) | Docker, CI/CD, GitHub Actions, Vercel, Lambda, Kubernetes, monitoring, logging | 2,397 |
| 25 | [WebAssembly & Performance](25-WebAssembly-and-Performance.md) | Wasm, Emscripten, WASI, Core Web Vitals, Lighthouse, profiling, optimization | 2,428 |

### Platforms (26-28)

| # | File | Topics | Lines |
|---|------|--------|-------|
| 26 | [Mobile & Desktop JS](26-Mobile-and-Desktop-JS.md) | React Native, Electron, Capacitor, PWA, push notifications, deep linking | 2,910 |
| 27 | [SSR, SSG & Meta-Frameworks](27-SSR-SSG-Meta-Frameworks.md) | Next.js, Nuxt, SvelteKit, Astro, Remix, hydration, streaming, edge rendering | 2,465 |
| 28 | [Code Quality & Workflow](28-Code-Quality-and-Workflow.md) | Git, ESLint, Prettier, Husky, JSDoc, Storybook, VS Code, DevTools tips | 1,827 |

---

## Learning Path (Recommended Order)

### Beginner
1. 01 - JavaScript Fundamentals
2. 02 - Functions and Closures
3. 06 - DOM Manipulation and Events
4. 15 - Strings, Arrays, Collections

### Intermediate
5. 03 - Objects, Prototypes, and Classes
6. 16 - OOP and Inheritance
7. 05 - ES6+ Modern JavaScript
8. 07 - Error Handling and Debugging
9. 12 - RegExp, JSON, Date/Math

### Advanced
10. 04 - Asynchronous JavaScript
11. 08 - Functional Programming
12. 11 - Design Patterns
13. 10 - Web APIs
14. 17 - TypeScript Complete
15. 18 - React & Framework Patterns

### Expert
16. 09 - JavaScript Engine Internals
17. 13 - Security, Performance, Testing
18. 20 - Testing Deep Dive
19. 25 - WebAssembly & Performance

### Full Stack
20. 14 - Node.js Fundamentals
21. 21 - Database & ORM
22. 22 - API Design Patterns
23. 23 - Authentication & Authorization
24. 27 - SSR, SSG & Meta-Frameworks

### DevOps
25. 19 - Build Tools & Bundlers
26. 24 - DevOps & Deployment
27. 28 - Code Quality & Workflow
28. 26 - Mobile & Desktop JS

---

## Quick Reference by Topic

| Want to learn about... | Go to |
|----------------------|-------|
| Data types and variables | 01 |
| Functions, closures, this | 02 |
| Objects and classes | 03, 16 |
| Promises and async/await | 04 |
| ES6+ features | 05 |
| DOM and events | 06 |
| Error handling | 07 |
| Functional programming | 08 |
| How JS engines work | 09 |
| Browser APIs | 10 |
| Design patterns | 11 |
| RegExp, dates, math | 12 |
| Security and testing | 13 |
| Node.js | 14 |
| Arrays, Maps, Sets | 15 |
| OOP patterns | 16 |
| TypeScript | 17 |
| React, Vue, Angular | 18 |
| Webpack, Vite, Babel | 19 |
| Jest, Cypress, Playwright | 20 |
| MongoDB, Prisma, SQL | 21 |
| REST, GraphQL, tRPC | 22 |
| JWT, OAuth, Passkeys | 23 |
| Docker, CI/CD, deployment | 24 |
| WebAssembly, performance | 25 |
| React Native, Electron | 26 |
| Next.js, Nuxt, SvelteKit | 27 |
| Git, ESLint, code quality | 28 |
