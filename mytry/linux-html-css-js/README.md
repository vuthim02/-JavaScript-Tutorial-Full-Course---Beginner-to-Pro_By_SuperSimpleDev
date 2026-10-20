# Linux & Linus Torvalds — Full Stack (HTML, CSS & JS)

This is the **HTML + CSS + JS** half of a two-part learning project: static
markup plus front-end JavaScript (modules, fetch, WebSocket), a Node/Express
backend, and a PWA. The "HTML & CSS only" version with the same pages but zero
JavaScript lives in the sibling folder `linux-html-css/`.

This is a **learning project**. The full source is already here as a *reference*, but you
will learn the most by **rewriting it yourself, step by step**. Below is the standard
project structure plus an ordered build plan. Do not copy-paste from the reference —
type every line, think about each tag and property, then check your result against it.

---

## 1. Standard structure

A small multi-page "static" website follows this layout:

```
linux-html-css-js/
├── index.html                     # Home page (entry point)
├── pages/
│   ├── history.html               # History of Linux (timeline)
│   ├── linus.html                 # About Linus Torvalds
│   ├── about-me.html              # About the site author
│   ├── terminal.html              # Terminal simulator (shell + JS)
│   ├── api-playground.html        # REST API playground (fetch + JWT)
│   └── live.html                  # WebSocket live room (chat + pings)
├── assets/
│   ├── css/
│   │   ├── style.css              # Shared styles (all pages)
│   │   ├── terminal.css           # Styles only for terminal.html
│   │   └── lab.css                # API status widget, logs, live room
│   ├── js/
│   │   ├── main.js                # Classic scripts: footer year + helpers
│   │   ├── terminal.js            # The whole terminal simulator (+ hash/cpu demos)
│   │   ├── modules/               # Shared ES modules (front-end JS)
│   │   │   ├── utils.js           # debounce, throttle, generators, FNV-1a (Uint8Array)
│   │   │   ├── events.js          # EventBus (pub/sub, WeakMap once-cleanup, iterable)
│   │   │   ├── store.js           # LocalStore + Proxy/Reflect logging wrapper
│   │   │   ├── api.js             # ApiClient (fetch wrapper: timeout/retry/JWT)
│   │   │   ├── db.js              # IndexedDB helper (notes cache)
│   │   │   └── site.js            # Site init: clock, reveal, api widget, SW
│   │   ├── workers/
│   │   │   └── hash.worker.js     # Web Worker: mines an FNV-1a nonce off the UI thread
│   │   └── pages/                 # Page-level ES modules
│   │       ├── api-playground.js  # REST CRUD + JWT + IndexedDB offline cache
│   │       └── live.js            # WebSocket client + Canvas activity trace
│   └── images/
│       ├── linus.webp             # Original photo
│       ├── linus-200.webp         # Resized variants (responsive images)
│       ├── linus-300.webp
│       ├── linus-454.webp
│       └── icon.svg               # PWA app icon (Tux)
├── server/                        # Express + WebSocket backend (Node)
│   ├── package.json               # deps: express, ws, cors
│   ├── data/db.json               # Simple JSON "database"
│   ├── test/                      # node:test unit tests (npm test)
│   │   ├── validators.test.js
│   │   ├── jwt.test.js
│   │   ├── repositories.test.js
│   │   └── noteService.test.js
│   └── src/
│       ├── index.js               # Entry: static + API + WS on :3000
│       ├── config.js              # Port, paths, rate limits
│       ├── middleware/            # cors, logger, rateLimiter, auth (JWT), errors
│       ├── utils/                 # AppError, asyncHandler, JWT (HS256), validators
│       ├── repositories/          # Data layer (base + notes JSON repository)
│       ├── services/              # Business logic
│       ├── controllers/           # HTTP handlers
│       ├── routes/                # /api/v1/router
│       └── ws/hub.js              # WebSocket hub: broadcast, visitor count, chat
├── manifest.webmanifest           # PWA manifest (name, icons, theme)
├── sw.js                          # Service worker (offline cache)
└── README.md                      # This file
```

**Convention recap**

- `index.html` always lives in the root — servers look for it automatically.
- One folder per concern: `assets/css`, `assets/js`, `assets/images`.
- Pages folder keeps subpages tidy; links between them use **relative paths**:
  - from root → `pages/history.html`
  - from `pages/` → `../assets/css/style.css`
- Keep shared styles in `style.css`; page-specific styles in their own file.
- No repetition of rules across CSS files (a small website = one shared file).

---

## 2. The pages & what each one teaches

| Page            | Practise                                                                    |
| --------------- | --------------------------------------------------------------------------- |
| `index.html`    | Semantic layout, hero section, cards (grid), stats, table, blockquote       |
| `history.html`  | Timeline via pseudo-elements, `progress`/`meter`, `pre/code`, a table       |
| `linus.html`    | Two-column `grid`, figure/figcaption, checked-list with `::before`          |
| `about-me.html` | Simple page: section split, definition/check list, contact card             |
| `terminal.html` | Terminal look (monospace, blinking cursor) + JS command simulator           |
| `api-playground.html` | Live REST calls: fetch wrapper, CRUD, JWT auth, error states         |
| `live.html`     | WebSocket chat, broadcasts, ping, reconnect with backoff               |

---

## 3. Build order (recommended)

> Start from an empty folder. After each step open the page in a browser to verify.

### Step 1 — root skeleton + shared CSS
1. `mkdir pages assets assets/css assets/js assets/images`
2. Create `assets/css/style.css` and define the **design system** in `:root`:
   - color variables (`--color-bg`, `--color-accent`, …), shadow, fonts
3. Write `index.html`: the `head` (charset, viewport, title, stylesheet link),
   a `<header class="navbar">`, a `<main>`, and a `<footer>`.
4. Style: reset (`* { box-sizing: border-box }`), navbar (sticky), container,
   hero, section titles, cards, footer. Add `@media (max-width: 700px)`.

### Step 2 — copy the navbar recipe to subpages
5. Create `pages/history.html` reusing the same navbar/header/footer markup with
   a `.active` class on the current link.
6. Point its stylesheet at `../assets/css/style.css`.
7. Build the vertical **timeline**: `.timeline` + `.timeline-item`, the vertical
   line and year dots drawn with `::before`.

### Step 3 — the Linus page (two-column layouts)
8. Create `pages/linus.html`. Use a `.split` grid
   (`grid-template-columns: 1fr 1fr`).
9. Add the photo as a circular `<figure>` + `<figcaption>`.
10. Add a "key facts" list whose bullets are `::before` check marks.

### Step 4 — index polish
11. Back in `index.html`, add: cards grid, a stats grid, a `<table>` with
    `<thead>/<tbody>/<tfoot>`, a `<blockquote><cite>`, and `<details>/<summary>`.
12. Add `main.js`: write the current year into `#year` in the footer.

### Step 5 — About Me + footer link walkthrough
13. Create `pages/about-me.html` reusing the shared layout — no new CSS needed.

### Step 6 — the Terminal (mostly JS, CSS for looks)
14. Create `pages/terminal.html` to hold a `.term-window` with a titlebar, an
    output area, and an input row.
15. In `assets/css/terminal.css`: green-on-black colors, monospace font,
    blinking block cursor (`@keyframes`), scanline overlay.
16. Rewrite `assets/js/terminal.js`: a *virtual filesystem* (plain JS object),
    command parser, and handlers for `ls`, `cd`, `cat`, `echo`, etc.

### Step 7 — navigation + final checks
17. Add the **Terminal** link to the navbar on every page.
18. Run a local server and click every link:
    ```bash
    cd linux-html-css-js && python3 -m http.server 8000
    ```

### Step 8 — shared ES modules (front-end JS)
19. Create `assets/js/modules/` and split the front-end into reusable modules:
    - `utils.js` — `debounce`, `throttle`, `escapeHTML`, `formatUptime`, …
    - `events.js` — a tiny `EventBus` (`on`/`once`/`off`/`emit`) so page code can
      publish events without knowing each other.
    - `store.js` — a `LocalStore` wrapper that JSON-serializes values into
      `localStorage` and supports a TTL ("expires in X ms").
    - `api.js` — an `ApiClient` class wrapping `fetch`: it adds an
      `AbortController` timeout, automatic JSON parsing, one retry with
      exponential backoff, and converts HTTP errors into `ApiError` objects.
    - `site.js` — imported by every page: runs the live clock, the
      IntersectionObserver scroll-reveal, the home `#api-status` widget, the
      search filter, toasts, and registers the service worker.
23. Load them with `<script type="module" src="../assets/js/modules/site.js">`
    (page-specific modules come first, then `site.js`, then classic `main.js`).

### Step 9 — API Lab page
24. Create `pages/api-playground.html` + `assets/js/pages/api-playground.js`.
    This page *talks to the real backend*: it reads `GET /api/v1/system/status`,
    lists/creates/edits/deletes notes (`CRUD`), and plays with JWT auth
    (groove the token, hit `/api/v1/auth/protected`, then try without a token).
25. Handle the **offline case**: catch `fetch` network errors and show a helpful
    message instead of crashing.

### Step 10 — Live page (WebSocket)
26. Create `pages/live.html` + `assets/js/pages/live.js`. Connect to
    `ws(s)://your-host/ws`, listen for `welcome`, `visitor:join` and `chat`
    messages, and broadcast your own `chat` messages.
27. Add a **ping/pong** heartbeat and a **reconnect** loop with exponential
    backoff (max ~15 s) so the page survives a server restart.

### Step 11 — the server (Express + WebSocket)
28. From scratch inside `server/`, build in this order and test each layer with
    `curl` before moving on:
    - `src/config.js` → constants (port 3000, API prefix `/api/v1`, rate limits)
    - `src/utils/` → `AppError`, `asyncHandler`, `jwt.sign/verify` (HS256),
      `validators`
    - `src/repositories/` → `baseRepository` + `noteRepository` reading/writing
      `server/data/db.json`
    - `src/middleware/` → `cors`, `logger`, `rateLimiter`, `auth` (JWT verify),
      `errorHandler`
    - `src/routes/` + `src/controllers/` + `src/services/` → the `/api/v1`
      router: `system/status`, `notes` CRUD, `auth/token`, `auth/protected`
    - `src/ws/hub.js` → WebSocket hub (welcome, visitor:join, chat, ping)
    - `src/index.js` → glue it all together and serve the static site too
29. Verify the round trip from curl:
    ```bash
    cd server && npm install && npm start     # http://localhost:3000
    curl localhost:3000/api/v1/system/status
    ```

---

## 4. HTML concepts you'll practise (by area)

- **Head/meta:** charset, viewport, description, Open Graph, favicon.
- **Semantic layout:** `header`, `nav`, `main`, `section`, `article`, `footer`.
- **Text:** `h1–h3`, `p`, `strong`, `em`, `mark`, `small`, `sub/sup`,
  `abbr`, `blockquote`, `cite`, `address`, `dl/dt/dd`, `ruby`, `bdi`.
- **Media:** `img`, `picture`+`source`+`srcset`, `audio`, `video`, `iframe`,
  `canvas`, `figure/figcaption`.
- **Forms:** every `input` type, `select`+`optgroup`+`datalist`, `textarea`,
  `fieldset/legend`, `checkbox/radio`, `range`, `file`, `hidden`, `output`,
  `novalidate`, `formnovalidate`, required/disabled/readonly/pattern.
- **Tables:** `caption`, `thead/tbody/tfoot`, `colspan`/`rowspan`.
- **Interactive:** `details/summary`, `dialog`, `popover`, `template`,
  `contenteditable`, `tabindex`, `hidden`, `noscript`.
- **Lists:** `ol` (reversed/start/type), nested `ul`, `menu`.
- **Attributes:** `lang`, `data-*`, `aria-*`, `role`, `draggable`, `title`.

## 5. CSS concepts you'll practise (by area)

- **Selectors:** element, class, id, descendant, `>`, `+`, `~`, attribute
  `[type="…"]`, `:hover`, `:focus`, `:checked`, `:not()`, `:is()`,
  `:where()`, `:has()`, `:nth-child`, `:target`.
- **Pseudo-elements:** `::before`, `::after`, `::selection`, `::placeholder`,
  `::marker`, `::backdrop`, `::first-line`.
- **Box model:** margin, padding, border, border-radius, box-shadow (incl. inset).
- **Layout:** flexbox (direction, justify/align, wrap, gap), grid
  (template-areas, auto-fit/minmax, span), `float`+`clear`, multi-column
  (`column-count`), `position` (static/relative/absolute/sticky).
- **Colors & effects:** `linear/radial/conic/repeating` gradients,
  `background-clip: text`, `filter`, `clip-path`, `backdrop-filter`,
  `mix-blend-mode`, opacity.
- **Responsive:** `clamp()`, `min()/max()`, `vw/vh`, `@media` queries,
  `@container`, `prefers-reduced-motion`, `aspect-ratio`.
- **Motion:** `transition`, `transform`, `@keyframes` animation.
- **Modern extras:** custom properties (variables), `@supports`, logical
  properties, `scroll-snap`, `line-clamp`, custom scrollbars, print styles.

---

## 6. Rules for a clean rewrite

- Write your own text/code. Read the reference only when stuck.
- Keep `index.html` in the root, everything else under `pages/` or `assets/`.
- One stylesheet-first approach: style naming with a `-` prefix
  (`.card`, `.navbar-inner`) and group rules with comment banners.
- After each page, run the local server and click every link on the page.
- Validate: all tags closed, `alt` on images, `<label for>` matches input ids.

---

## 7. JS concepts you'll practise (by area)

- **Language:** `let`/`const`, template literals, arrow functions, default/rest
  params, destructuring, optional chaining `?.` + nullish `??`, classes with
  private fields, `Array.map/filter/reduce`, sets, spread.
- **Async:** `fetch()` + `async/await`, `Promise.all`, `AbortController` +
  `AbortSignal.timeout()`, retry with exponential backoff, `try/catch/finally`.
- **OOP:** classes (`ApiClient`, `EventBus`, `LocalStore`), private `#fields`,
  static helpers, constructor injection (config passed in, not hard-coded).
- **Design patterns:** module pattern (ES modules), pub/sub (`EventBus`),
  factory/service/repository layering on the server, middleware chains.
- **Web APIs:** `IntersectionObserver` (scroll-reveal), `localStorage`,
  `IndexedDB` (`db.js`: store all notes offline, read them back, wipe the cache),
  `WebSocket`, `Canvas 2D` (live-room latency line chart drawn on
  `requestAnimationFrame`), Web Workers (`hash.worker.js` mines a FNV-1a nonce
  on a background thread — try `cpu` in the Terminal; falls back to sync code
  when workers are unavailable), `navigator.serviceWorker`, `URL`, `Date`,
  `setInterval`, `Element.after/before`, `<template>`.
- **Advanced language features:**
  - **Generators & iterators:** `range()`/`chunks()` in `utils.js`, plus
    `*[Symbol.iterator]()` on `EventBus` and the local store so you can do
    `for (const e of bus)` and `for (const {key,value} of store)`.
  - **`Symbol`:** `Symbol.toStringTag` on the EventBus, `Symbol.iterator` on
    iterables (`console.log(Object.prototype.toString.call(bus))` → `[object
    EventBus]`).
  - **`Proxy` + `Reflect`:** `createObservedStore()` in `store.js` logs every
    read and blocks writes to protected keys; the live page wraps its debug log
    in one.
  - **`WeakMap`/`WeakSet`:** nobody leaks a listener — `events.js` uses a
    `WeakMap` so a `.once()` registration never fires twice and can be
    garbage-collected; the WebSocket hub uses a `WeakSet` to guarantee every
    disconnected socket is torn down exactly once.
  - **Typed arrays:** `fnv1a()` hashes text through a `Uint8Array` +
    `TextEncoder` with `Math.imul`; the live canvas drives its plot from a
    `Float32Array` ring buffer.
- **Testing (server):** `npm test` runs a `node:test` suite — 20 tests over
  validators, HS256 JWT create/verify/expiry, the JSON repository, and the
  note service (injected with a temp-file repo, no touching real data).
- **Errors in the real world:** classify `NetworkError` / `Timeout` / `HTTP
  error` / `Validation` and give the user a readable message each time.
- **PWA:** `manifest.webmanifest` + `sw.js` (network-first for HTML,
  cache-first for assets, offline fallback page).

## 8. The API (what your JS actually talks to)

Server base: `http://localhost:3000`, API prefix `/api/v1`, WebSocket `/ws`.

| Method & path              | Purpose                         |
| -------------------------- | ------------------------------- |
| `GET  /api/v1/system/status` | uptime, server time, notes count, live clients |
| `GET  /api/v1/notes`         | list all notes                  |
| `POST /api/v1/notes`         | create note (`{title, body}`)   |
| `PUT  /api/v1/notes/:id`     | update a note                   |
| `DELETE /api/v1/notes/:id`   | delete a note                   |
| `POST /api/v1/auth/token`    | exchange name → signed JWT      |
| `GET  /api/v1/auth/protected`| 401 without a bearer token      |
| `POST /api/v1/visitors`      | register a visit (via site.js)  |

WS messages (JSON): server sends `welcome` (list of ids + counts as payload),
`visitor:join`, `chat` (broadcast), `pong` (reply to your `ping`). You send
`ping`, `chat`, and `register` (visitor name).

## 9. How to run everything

1. Static only (API calls will fail gracefully):
   ```bash
   cd linux-html-css-js && python3 -m http.server 8000
   ```
2. Full stack (recommended — API + WebSocket + offline + PWA):
   ```bash
   cd linux-html-css-js/server
   npm install          # first time only
   npm start            # http://localhost:3000
   ```
3. Run the unit tests (server, 20 tests):
   ```bash
   cd linux-html-css-js/server
   npm test
   ```
4. Test the API without a browser:
   ```bash
   curl localhost:3000/api/v1/system/status
   ```
5. The dev `package.json` script runs the server with `node --watch` so edits
   to `server/src` restart it automatically; JSON changes are picked up on
   every request (no restart needed for `data/db.json`).

---