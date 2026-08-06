# JavaScript Security, Performance Optimization, and Testing — Complete Reference

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

> Compiled: July 2026
> Sources: MDN, OWASP WSTG, State of JS 2024–2026 surveys, PkgPulse 2026 guides, Chrome DevTools docs, Vitest/Playwright official docs

---

# PART 1 — SECURITY

## 1. Cross-Site Scripting (XSS)

XSS is the most persistent frontend vulnerability. It occurs when an attacker injects malicious scripts into web pages viewed by other users.

### Three types of XSS:

| Type | Mechanism |
|------|-----------|
| **Reflected** | Attacker crafts a URL containing a script. Victim clicks the link. The server reflects the script back in the HTTP response. |
| **Stored** | Script is saved in a database or comment/review field, then served to every user who views that page. Most dangerous. |
| **DOM-based** | Client-side JavaScript reads attacker-controlled data from the URL or DOM and passes it to a dangerous sink without validation. |

### Dangerous DOM sinks:
- `innerHTML`, `outerHTML`
- `insertAdjacentHTML()`
- `document.write()` / `writeln()`
- `eval()`, `setTimeout(string)`, `setInterval(string)` — code evaluators
- `new Function()`
- `srcdoc` attribute on iframes
- `onclick` / `onerror` / `onload` event attributes

### Prevention:
1. **Auto-escaping frameworks** — React, Vue, Svelte escape content by default. Don't bypass this without good reason. Beware of: `dangerouslySetInnerHTML` (React), `v-html` (Vue), `{@html}` (Svelte).
2. **Context-aware output encoding** — HTML entity encode for HTML context, JS encode for JavaScript strings, URL encode for attributes.
3. **CSP** — Content Security Policy blocks inline/remote scripts.
4. **Trusted Types** — Runtime enforcement that dangerous DOM sinks reject raw strings.
5. **DOMPurify** / Sanitizer API — sanitize HTML before insertion.
6. **HttpOnly** cookies — session tokens not visible to JavaScript.

---

## 2. Cross-Site Request Forgery (CSRF)

CSRF tricks an authenticated user's browser into executing unwanted actions on a target site. While XSS exploits the user's trust in a website, CSRF exploits the website's trust in the user's browser.

### CSRF attack mechanics:
- The victim is authenticated on target.com (session cookie stored).
- The attacker's page sends a POST request to target.com/transfer.
- The browser automatically attaches the session cookie.
- The server cannot distinguish the forged request from a legitimate one.

### Prevention:

| Defense | How it works |
|---------|-------------|
| **SameSite cookies** | Set `SameSite=Lax` or `Strict` on cookies. Lax allows top-level GET navigation but blocks cross-site POST. Default in Chrome since 2021. |
| **CSRF tokens** | Server generates unique token per session. Token is included in forms and validated server-side. |
| **Origin/Referer validation** | Check `Origin` or `Referer` header at the server for state-changing requests. |
| **Fetch Metadata** | Server validates `Sec-Fetch-Site`, `Sec-Fetch-Mode`, `Sec-Fetch-Dest` headers. |
| **Authorization headers** | Use JWT in `Authorization` header instead of cookie-based auth. CSRF does not apply to header-based API auth. |
| **Force preflight** | Avoid "simple requests" by adding custom headers to state-changing API calls. |

Key: XSS can bypass CSRF defenses. If an attacker executes JS on the page, they can read CSRF tokens from the DOM.

---

## 3. Content Security Policy (CSP)

CSP is a browser security mechanism that restricts which resources a page can load. It is the strongest defense against XSS.

### CSP Directives:

| Directive | Controls |
|-----------|---------|
| `default-src` | Fallback for all resource types |
| `script-src` | Allowed sources of JavaScript |
| `style-src` | Allowed sources of CSS |
| `img-src` | Allowed image sources |
| `connect-src` | URLs for XMLHttpRequest/fetch/WebSocket |
| `frame-ancestors` | prevents clickjacking |
| `form-action` | Valid targets for form submission |
| `base-uri` | restricts `<base>` tag injection |
| `object-src` | controls plugins (`<object>`, `<embed>`) |
| `require-trusted-types-for` | enforce Trusted Types for DOM XSS sinks |

### Recommended CSP (2026):
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{RANDOM}' 'strict-dynamic';
  style-src 'self' 'nonce-{RANDOM}';
  img-src 'self' data: https:;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  base-uri 'none';
  require-trusted-types-for 'script';
  trusted-types dompurify;
```

- **nonces**: unique unpredictable token per HTTP response.
- **strict-dynamic**: automatically Trust scripts loaded by a nonce-trusted script. Removes the whitelist management nightmare.
- **hashes**: `sha256-...` for inline scripts.

---

## 4. Same-Origin Policy (SOP)

Fundamental browser security mechanism that restricts web pages from interacting with resources from a different origin. An origin is defined by the combination of protocol (scheme), host (domain), and port.

- Default: pages from origin A cannot read responses from origin B.
- SOP does NOT block writes (e.g., form submissions to another origin).
- By default, SOP blocks reading of cross-origin responses.

---

## 5. CORS — Cross-Origin Resource Sharing

CORS is NOT a security feature. It is a browser policy that allows a SERVER to tell the browser: "This origin is allowed to read my responses."

### CORS headers:
```
Access-Control-Allow-Origin: https://example.com    // Allowed origin
Access-Control-Allow-Methods: GET, POST, PUT        // Allowed methods
Access-Control-Allow-Headers: Content-Type, X-Custom // Allowed headers
Access-Control-Allow-Credentials: true              // allow cookies in cross-origin requests
```

### Golden rules:
- NEVER `Access-Control-Allow-Origin: *` with credentials.
- Pair `Allow-Credentials: true` with explicit origin, never wildcard.
- Do not echo back `Origin` header blindly.
- Prefer no CORS (same origin) whenever possible.
- Simple requests vs preflighted: requests with custom headers or non-simple content types trigger an OPTIONS preflight.

---

## 6. HTTPS and Mixed Content

- All production communication should be over TLS.
- Mixed content occurs when a secure page loads subresources over an insecure HTTP connection.
- **Active mixed content** (scripts, stylesheets, XHR) is blocked by modern browsers.
- **Passive mixed content** (images, audio, video) may be loaded but flagged as less secure.
- Always use HTTPS → set `Strict-Transport-Security` header.

---

## 7. Input validation and sanitization

- **Validation**: checks if the data conforms to expected format. reject if not.
- **Sanitization**: removes dangerous characters/HTML from the data.
- Use **whitelists**, not blacklists. define what is allowed; everything else is forbidden.
- Validate on both client AND server. Client for UX, server for actual security.
- Sanitize rich HTML with DOMPurify or the Sanitizer API.

---

## 8. Output encoding

Different encoding for different contexts:
- **HTML body** → HTML entity encode `<>&"'`
- **HTML attribute** → attribute-encode to break out of the value
- **JavaScript string** → JS-escape (`\" \' \\ \n \t \x00`)
- **URL** → URL-encode (`encodeURIComponent`)
- **CSS** → CSS-escape strings in expression contexts

Never put untrusted data into event handlers (`onclick`), CSS, or `<script>` tags.

---

## 9. DOMPurify and HTML Sanitizer API

### DOMPurify
- The well-established library for sanitizing HTML strings.
- Strips dangerous HTML, XSS vectors, script execution paths.
- Simple API: `DOMPurify(dirtyHTML)`, then do: `element.innerHTML = sanitized`
- Fallback for older browsers.

### HTML Sanitizer API (browser-native)
- `element.setHTML(untrusted)` — native browser API. Sanitizer API (2024 baseline).
- Preferred when available — no extra library needed.
- For modern apps: prefer setHTML + CSP over innerHTML + DOMPurify.

---

## 10. Trusted Types API

Runtime safeguard that forces dangerous DOM sinks to reject plain strings.

### Trusted Types enforced:
```
Content-Security-Policy: require-trusted-types-for 'script'; 
trusted-types myPolicy default;
```
- `innerHTML = someString` → throws if someString is not a TrustedHTML object.
- You create a 'TrustedHTML' via a registered policy function.
- Centralizes sanitization, preventing XSS in DOM sinks.

### Anatomy:
```javascript
if (window.trustedTypes && trustedTypes.createPolicy) {
  myPolicy = trustedTypes.createPolicy('default', {
    createHTML: (input) => DOMPurify.sanitize(input)
  });
}
el.innerHTML = myPolicy.createHTML(untrusted); // works
el.innerHTML = untrusted;                      // throws
```

---

## 11. SRI — Subresource Integrity

Protects against third-party script compromise.

```html
<script 
  crossorigin="anonymous"
  src="https://cdn.example.com/react.js"
  integrity="sha384-...">
</script>
```

The browser calculates the hash of the downloaded file. If it doesn't match the integrity attribute, the script is blocked. Prevents modified CDN scripts from executing in your page.

- use for ALL external scripts.
- regenerate integrity hash when the file updates.
- Self-host critical scripts when possible.

---

## 12. Cookie security: HttpOnly, Secure, SameSite

| attribute | Meaning |
|-----------|---------|
| `HttpOnly` | Inaccessible from JavaScript (`document.cookie`). Prevents XSS-based cookie theft. |
| `Secure` | Only transmitted over HTTPS. |
| `SameSite=Lax` | Sent only for top-level GET requests across origins (default in modern browsers). |
| `SameSite=Strict` | Never sent for cross-site requests. |
| `SameSite=None` | Sent for all cross-site requests. Requires Secure. |
| `Path=/` | Restricts scope to a path. |
| `Max-Age` | Prefer over Expires. Sets lifetime in seconds. |
| `__Host-*` prefix | Most restrictive: cookie sent only if set with Secure, Path=/, and no Domain attribute. |

Best practice: `Set-Cookie: __Host-session=abc123; Secure; HttpOnly; SameSite=Lax; Path=/; MaxAge=3600`

---

## 13. JWT — JSON Web Tokens

Common for stateless authentication. Important pitfalls:

### DO:
- Use asymmetric signing (RS256, ES256, EdDSA) with key rotation.
- Validate `aud` (audience) and `iss` (issuer) claims.
- Keep access tokens short (5–15 minutes).
- Store in httpOnly cookie OR in memory (NOT localStorage).
- Use refresh token rotation.

### DON'T:
- Use JWT in localStorage — XSS can steal it.
- Use HS256 with short/weak secret.
- Use `alg: none` (still in some libraries).
- Reuse JWT secrets across environments.
- store secrets in client bundles.

### When to use JWT vs session:
- JWT does not require a central store → good for stateless services.
- Problem: cannot revoke until expiry.
- Sessions with blacklist or reference token are revocable.

---

## 14. OAuth 2.0

### PKCE (Proof Key for Code Exchange)
- SPAs and mobile MUST use PKCE. Authorization Code Flow with PKCE replaced Implicit flow.
- SPA generates a `code_verifier` (cryptographically random string), transforms it to `code_challenge`.
- `redirect_uri` sent with request.
- Access token sent to callback endpoint only, not exposed in URL.

### Passkeys (WebAuthn)
- By 2026, passkey-first is the modern default.
- Phishing-resistant (domain-bound).
- `navigator.credentials.create({ publicKey })` to register
- `navigator.credentials.get({ publicKey })` to sign in
- Cross-synced by OS (Apple, Google, Microsoft).

---

## 15. OWASP Top 10

| # | Risk | Javhcript relevance |
|---|------|----------------------|
| 1 | Broken Access Control | Users doing things they shouldn't |
| 2 | Cryptographic Failures | Weak hashing, wrong algorithm |
| 3 | Injection | XSS, SQL injection in Node.js |
| 4 | Insecure Design | Logic flaws |
| 5 | Security Misconfiguration | Debug enabled in prod, missing headers |
| 6 | Vulnerable & outdated components | Dependabot/Snyk/npm audit |
| 7 | Identification & auth failures | Session hijack, token theft |
| 8 | Software & data integrity failures | Supply chain attacks |
| 9 | Security logging & monitoring | no CSP reports, no error tracking |
| 10 | SSRF | Server-side request forgery |

---

## 16. Prototype pollution

A vulnerability where an attacker adds or modifies properties on an object's prototype.

### How it works:
If your app merges user-controlled objects (e.g., `{...userInput}`) into an object, the attacker can set `__proto__`, `constructor.prototype` to inject properties into Object.prototype.

```javascript
// vulnerable:
const merged = Object.assign({}, userData); // if userData .__proto__ = {isAdmin: true}

// safe:
const merged = { ...userData }; // if Object.assign

// fix:
const safe = JSON.parse(JSON.stringify(userData));

sing Maps
function merge(root, data) {
  for (const key of Object.keys(data)) {
    if (key === '__proto__' || key === 'constructor') continue;
    root[key] = data[key];
  }
}
```

### Prevention:
- Avoid object __proto__ / two-way merges with user‑controlled keys.
- Use Map instead of Object for associative data.
- `Object.create(null)` to create objects without a prototype.
- Sanitize property keys for `__proto__` / `constructor` / `prototype`.

---

## 17. Clickjacking

Victim is tricked into clicking on a target page embedded in an attacker's iframe, leading to unintended actions.

### Prevention:
```
// HTTP header
X-Frame-Options: DENY

// CSP (modern):
frame-ancestors 'none'

// Or allow only specific origins:
frame-ancestors https://trusted.example.com
```

Stripe checkout widgets may need a specific allowlist, not just blanket DENY.

---

## 18. Open redirect vulnerabilities

An attacker uses a trusted site's redirect endpoint to send a user to a malicious destination.

```javascript
// vulnerable:
app.get('/goto', (req, res) => { res.redirect(req.query.url); });

// fix:
const allowed = ['https://help.example.com'];
if (allowed.includes(url)) { res.redirect(url); } else { res.redirect('/'); }
```

- Do not accept arbitrary URLs for redirect.
- use a mapping key → URL, not raw URL input.

---

## 19. SQL injection (Node.js)

When user‑supplied data is concatenated directly into SQL.

```javascript
// vulnerable:
connection.query(`SELECT * FROM users WHERE id = ${req.params.id}`);

// fix:
connection.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
```

- Always use parameterized queries / prepared statements.
- ORM (Prisma, TypeORM) handles this if you don't use `$queryRawUnsafe`.

---

## 20. Command injection

When user input is passed to OS commands.

```javascript
// vulnerable:
exec(`git archive ${input}`); // input: ; rm -rf /

// fix:
exec(`git archive ${sanitize(input)}`);
sanitize: strip(/[;|&`$()]/
// better: avoid OS commands entirely; use libraries.
```

- never concatenate user input into shell commands.
- if you must run a command, validate input against a strict allowlist.

---

## 21. Dependency vulnerabilities — npm audit

### npm audit:
```bash
npm audit            # check for known vulnerabilities
npm audit fix        # auto-fix within semver
npm audit fix --force # may break — fix manually
```

### Modern workflow:
- Run `npm audit` in CI.
- use Dependabot / Renovate / Snyk for automated dependency updates.
- Pin exact versions in lockfile (committed to repo).
- Prefer lockfiles over global install.
- For high-risk packages (webpack, express, passport): subscribe to security announcements.

### Supply chain defense:
- SRI on CDN scripts.
- npm provenance (verify package origin).
- SBOM + SLSA attestation.
- Avoid obscure packages with few downloads.
- Review dependencies before major version upgrade.

---

## 22. Secrets management

NEVER put secrets in client bundles.

| DON'T | DO |
|-------|----|
| API keys in environment vars for Vite/Next public build | are client-side accessible via `NEXT_PUBLIC_*`, ALL client env vars are sent to the user |
| Hardcoded tokens | use server-side env vars (\`process.env.MY_API_KEY\` only in getServerSideProps / server functions) |
| JWTs stored in localStorage | use httpOnly cookies |
| Git commit secrets | use `.gitignore` + `.env.example`, never commit `.env` |

Sensitive env vars must be server-only:
```javascript
// ❌ exposed to browser:
const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// ✅ stays on server:
const API_KEY = process.env.MY_API_KEY; // export async function getServerSideProps()
```

---

## 23. Rate limiting

Critical defense against credential stuffing, brute force, API abuse.

### Implementation (Express):

```javascript
import rateLimit from 'express-rate-limit';

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // 100 requests per window
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

// apply to all routes:
app.use(globalLimiter);

// Per-route:
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true, // only failed requests count towards limit
});

app.post('/auth/login', authLimiter, loginHandler);
```

### Redis for distributed:

```javascript
import RedisStore from 'rate-limit-redis';

const distributedLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
  }),
});
```

### For Node.js: `express-rate-limit`, `rate-limiter-flexible` or `express-slow-down`.

---

## 24. Security headers — The complete set

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Resource-Policy: same-site
```

### Setting them in Express:

```javascript
const helmet = require('helmet');
app.use(helmet());

// or manually:
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});
```

---

# PART 2 — PERFORMANCE OPTIMIZATION

## 1. Profiling tools

### Chrome DevTools Performance:
- Record runtime performance: Task view shows long tasks, individual frame durations.
- Bottom-up / call tree / event log panels.
- Use CPU throttling (4x slowdown) to simulate mid-range mobile.
- Network Throttle: Slow 3G.

### Lighthouse:
- Lab-based score for performance (0–100).
- reports LCP, TBT (proxy for INP), CLS.
- Run in Chrome DevTools or via Node CLI.
- use `Lighthouse metrics calculator: LCP ≤ 2.5s, TBT ≤ 200ms, CLS ≤ 0.1` for passing grade.

### Real User Monitoring:
- web-vitals library.
- CrUX (Chrome UX Report) data.
- Custom RUM (sendBeacon payload).

---

## 2. Core Web Vitals

| Metric | Good | Poor | What it measures |
|--------|------|------|------------------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5 s | > 4.0 s | Loading performance |
| **INP** (Interaction to Next Paint, replaced FID in March 2024) | ≤ 200 ms | > 500 ms | responsiveness |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | > 0.25 | visual Stability |

### LCP optimization:
- optimize the LCP element (hero image / large text).
- Preload the LCP resource: `<link rel="preload" fetchpriority="high" href="…" as="image">`.
- Serve LCP image in next-gen format (WebP / AVIF) with proper sizes.
- Eliminate render-blocking resources.
- good TTFB under 800 ms.

### INP optimization:
- Break long tasks (any task > 50 ms).
- code-split heavy JavaScript.
- Defer non-critical third-party scripts.
- Use Web Workers for CPU-heavy work.
- Use `scheduler.yield()` or `setTimeout()` to break up synchronous work.
- reduce event handler complexity.

### CLS prevention:
- Always set `width` and `height` on images / videos / iframes.
- reserve space for embeds and ads.
- Avoid inserting DOM nodes above previously painted content.
- Prefer `transform: translate()` for toggle animations (does not trigger layout).
- Use `size-set` for web fonts.

---

## 3. Lazy loading

### Images:
```html
<img src="placeholder.jpg" data-src="real.jpg" loading="lazy" alt="..." />
```

- The HTML attribute `loading="lazy"` works in all modern browsers.
- For custom lazy loading: Intersection Observer API.

### Components (React):
```javascript
const Heavy = React.lazy(() => import('./Heavy'));
const Another = React.lazy(() => import('./Another'));
```

### Vue:
```javascript
const Heavy = defineAsyncComponent(() => import('./Heavy.vue'));
```

### Routes:
Dynamic import-based routing creates separate chunks per route.

---

## 4. Code splitting

The single most effective JS performance improvement.

| Strategy | What it does | ROI |
|----------|-------------|-----|
| Route splitting | per-page chunk | 60–80% initial bundle reduction |
| Component splitting | lazy heavy component | 20–40% reduction |
| Vendor splitting | separate node_modules | Better caching across deploys |

### Webpack:
```javascript
splitChunks: {
  cacheGroups: {
    vendor: { test: /[\\/]node_modules[\\/]/, priority: 10 },
    react: { test: /[\\/]node_modules[\\/]react[\\/]/, priority: 20 },
  },
}
```

### Vite:
```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        router: ['react-router-dom'],
        query: ['@tanstack/react-query'],
      },
    },
  },
}
```

### Content-addressable filenames:
`[contenthash]` (Webpack) / automatic in Vite ensures cache stability.

---

## 5. Tree shaking

Dead code elimination. Requires ES modules import/export, as CommonJS is resolved at runtime.

### Requirements for successful tree shaking:
- ES Module imports.
- `"sideEffects": false` in your library's `package.json`.
- Specific imports: `import { map } from 'lodash/map'` not `import _ from 'lodash'`.

### Pitfalls:
- Dynamic property access cannot be shaken.
- Some packages (most of jQuery, moment.js-locale-data) cannot be tree-shaken.
- Use `webpack-bundle-analyzer` or `rollup-plugin-visualizer` to verify.

---

## 6. Bundle optimization

### Bundle analysis:
- `webpack-bundle-analyzer`
- `rollup-plugin-visualizer`
- `source-map-explorer`
- `size-limit`

### Dependency audit:
- Replace moment.js with date-fns or luxon.
- Replace lodash full with lodash-es for tree-shakeable imports.
- replace large chart libraries with lightweight alternatives.
- Audit unused dependencies.

### Recommended initial bundle targets:
- initial JS under 100–150 KB compressed (gzipped).
- Total JS < 300 KB gzipped.

---

## 7. Caching strategies

### Server/Browser caching headers:
```
# Strong caching on versioned assets:
Cache-Control: public, max-age=31536000, immutable

# Non-versioned HTML:
Cache-Control: no-cache

# API responses:
Cache-Control: private, max-age=300
```

### Service worker caching:
- Cache-first for static assets.
- Network-first for HTML / API.
- stale-while-revalidate for non-critical.
- ideal approach for PWAs.

---

## 8. Service Worker caching

```javascript
// Install: pre-cache core app resources
const PRECACHE = ['offline.html', '/static/js/main.abc123.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open('v1').then(cache => cache.addAll(PRECACHE)));
});

// Fetch: serve from cache first, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );
});
```

### Caching patterns:
| Strategy | Use for |
|----------|---------|
| Cache first | versioned assets |
| Network first | HTML, API data |
| stale-while-revalidate | news-feed-like data |
| network only | mutations |

---

## 9. Memory leak detection and prevention

### Common memory leak sources:
1. **Detached DOM nodes** — DOM nodes removed from the document but still referenced by JavaScript.
2. **Forgotten event listeners** – Added to window/document but never removed.
3. **Timers/intervals** – `setInterval` running forever.
4. **Closures** large data referenced in closures long after use.
5. **WebSocket subscriptions** not cleaned up.
6. **console.log in DevTools** keeps objects from being GC'd.

### Chrome DevTools leak detection:
1. Open Memory tab.
2. Click trash icon to force GC.
3. Click "Take snapshot" → Baseline.
4. Perform the suspect action three times.
5. Force GC again; click "Take snapshot".
6. Switch to Comparison view with Baseline selected.
7. look for objects with positive delta that match your action count.

### Prevention:
```javascript
// Clean up listeners on unmount:
useEffect(() => {
  const handler = () => { ... };
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);

// avoid closures caching large data:
function onButtonClick() {
  const hugeData = getHugeData(); // allocated fresh each click
  doSomething(hugeData);          // no closure.
}
```

Fixed-size snapshots — use null + GC.

---

## 10. DOM performance — minimize reflows/repaints

### Triggers for layout (reflow):
- Reading/Setting `offsetHeight`, `offsetWidth`, `scrollTop`, `clientTop`.
- Adding/removing DOM nodes.
- Changing display/width/position/float.
- Animating `top`, `left`, `width`, `height`.
- Changing CSS class.

### performance:
- Batch reads/writes: read all measurements first, then apply changes.
- Use DocumentFragment for batch DOM inserts.
- Use `requestAnimationFrame` for measurement and mutation scheduling.
- avoid layout-triggering properties in loops, cache them.

---

## 11. Virtual scrolling

Renders only the visible subset of a large list. Reduces DOM nodes from thousands to 10-20.

### Libraries:
- react-virtual / @tanncy/ react-virtual.
- vue-virtual-scroll-grid.
- Vuetify virtual-scroll.

### Implementation insight:
- dynamically measure item height if variable, or enforce fixed row height.
- use intersection observer for more fine-grained visibility.
- inside virtual scroller:

```javascript
const rowVirtualizer = useVirtual({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 50, // height per item
});

{items.slice(rowVirtualizer.virtualItems[0].index, lastIndex).map(renderRow)}
```

---

## 12. Debouncing and throttling

| technique | behavior |
|-----------|----------|
| Debounce | Wait for a pause before calling the function. e.g., search input. |
| Throttle | call at most once per interval. e.g., scroll/resize handler. |

### Simple debounce:
```javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
const handleInput = debounce(e => fetchResults(e.target.value), 300);
```

### Simple throttle:
```javascript
function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

### Libraries: lodash.debounce, lodash.throttle.

---

## 13. requestAnimationFrame

Marks a function to be called before the next repaint. Ensures animations are synchronized with the display refresh rate.

```javascript
function animate(timestamp) {
  // update element position based on timestamp
  element.style.transform = `translateX(${delta}px)`;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

### Why:
- The browser automatically pauses rAF callbacks when the tab is hidden.
- Throttles to display sync (~60fps).
- proper for animations, NOT for short DOM updates (use setTimeout/microtask for those).
- Do NOT rely on argument for time delta — use `performance.now()`

---

## 14. Web Workers

CPU-intensive code off the main thread. Cannot touch the DOM.

```javascript
// main.js:
const worker = new Worker('worker.js');
worker.postMessage(data);
worker.onmessage = (e) => { console.log(e.target.data); };

// worker.js:
onmessage = function(e) {
  const result = expensiveloop(e.data);
  self.postMessage(result);
};
```

The worker communicates via **postMessage**, receives via `onmessage`.

### Use cases:
- JSON/CSV/anoma parsing of large payloads.
- Cryptographic operations.
- Image/ OffscreenCanvas processing.
- Sorting / filtering large data sets.

---

## 15. OffscreenCanvas

standard canvas operations off the main thread as Web Worker.

```javascript
// main:
const canvas = document.getElementById('myCanvas');
const offscreen = canvas.transferControlToOffscreen();
worker.postMessage({ canvas: offscreen }, [offscreen]);

// worker:
onmessage = function(e) {
  const ctx = e.data.canvas.getContext('2d');
  ctx.moveRect(0, 0, 100, 100);
  // render loop:
  function render(time) {
    requestAnimationFrame(render);
    // drawing primitives
  }
  requestAnimationFrame(render);
};
```

Avoids main-thread jank from heavy canvas operations.

---

## 16. Event delegation

attach a single listener to a parent rather than individual listeners on many children.

```javascript
// ❌ Inefficient:
document.querySelectorAll('li.item').forEach(el => {
  el.addEventListener('click', handler);
});

// ✅ Delegation:
document.querySelector('ul.list').addEventListener('click', (e) => {
  const item = e.target.closest('li.item');
  if (!item) return;
  handler(item);
});
```

Great for lists, tables, menus — any list-type layout.

---

## 17. DocumentFragment

used for batch DOM updates. prep nodes in a fragment off-screen, then insert the entire fragment at once.

```javascript
const items = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  items.appendChild(li);
}
myList.appendChild(items); // single DOM operation
```

This triggers only one reflow (or as coincident as possible) instead of 1000.

---

## 18. requestIdleCallback

Schedule non-urgent work during the browser's idle periods.

```javascript
requestIdleCallback(function(deadline) {
  while (deadline.timeRemaining() > 0) {
    // Do work
  }
}, { timeout: 2000 }); // fallback: run eventually even if never idle
```

Use for:
- prefetching data
- caching computed values
- analytics

Important caveat: not supported in Safari.

---

## 19. Intersection Observer for lazy loading

Better performance than scroll listeners.

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
}, { rootMargin: '200px' });

document.querySelectorAll('img.lazy').forEach(el => observer.observe(el));
```

- rootMargin triggers the load before the element enters the viewport.
- unobserve after loading.
- Also used for infinite scroll, ad impression tracking.

---

## 20. Resource hints

| Hint | Attribute | Purpose |
|------|-----------|---------|
| Preload | `<link rel="preload">` | high-priority fetch of LCP images, fonts, critical CSS |
| Prefetch | `<link rel="prefetch">` | low-priority fetch for next-page resources |
| Modulepreload | `<link rel="modulepreload">` | preload + parse + compile ES modules |
| Preconnect | `<link rel="preconnect">` | early DNS+TCP+TLS handshake to cross-origin |
| dns-prefetch | `<link rel="dns-prefetch>` | DNS lookup only |

```html
<!-- Preload LCP image -->
<link rel="preload" fetchpriority="high" href="hero.avif" as="image">

<!-- preconnect to API or CDN -->
<link rel="preconnect" href="https://api.example.com">

<!-- prefetch next page -->
<link rel="prefetch" href="/products">

<!-- modulepreload for split js chunk -->
<link rel="modulepreload" href="/assets/chunk-vendor.a1b2.js">
```

Use preload for resources on current page, prefetch for next page.

---

## 21. Script loading

| Attribute | Order | Execution timing |
|-----------|-------|------------------|
| none (synchronous) | DOM order | Blocks HTML parsing, executes as soon as encountered |
| `async` | irrelevant | Downloads as multic, executes immediately when ready |
| `defer` | DOM order | Downloads as multic, executes after HTML parsing |
| `type="module"` | DOM order | defer-like, with additional dependency resolution, ESM parsing |

### Rule of thumb:
- application bundle: `defer`.
- analytics/ independent: `async`.
- dynamic import: `import()`

---

## 22. Critical rendering path

Control the order in which resources are loaded.

### The blocking chain:
1. HTML is downloaded.
2. `<head>` CSS is render-blocking.
3. JavaScript in `<head>` / `<body>` top is parser-blocking (if No async/defer).
4. After CSSOM + DOM are constructed → Render.  

### Best way to avoid:
- Inline critical CSS in `<head>` + load defer non-critical.
- Add defer/async to all scripts.
- Reduce and preload above-the-fold images.
- do not use @import in CSS - creates additional roundtrips.

---

## 23. CSS-in-JS performance

CSS-in-JS libraries inject styles into the DOM at runtime. this costs CPU for injection and parse.

### Impact:
- Can increase FID/INP if parsing CSS-in-JS synthemic at render.
- As of 2026, zero-runtime solutions like Vanilla-Extract, Linaria, or UnoCss are preferred for new projects.
- Emotion / styled-components: consider compile-time variant.

### alternative:
- prebuild CSS with SCSS/Tailwind/Uno.
- Static extraction: build-time CSS generation; zero JS overhead.

---

## 24. Virtual DOM vs Real DOM

| factor | Virtual DOM | Real DOM |
|--------|-------------|----------|
| Speed of diff | cheap (JS object) | expensive (layout + paint). |
| Batched updates | framework handles it (React, Vue) | manual batching with fragment |
| memory | keeps a shadow tree of everything | Nothing beyond current page 
| Rule:  

- Virtual DOM libraries (React) are fast enough for most use cases.
- Avoid unnecessary re-render: `React.memo`, `useMemo` + `useCallback`.
- For millions of nodes: virtual scrolling, not VDOM.

---

## 25. JIT compilation benefits

JavaScript is compiled Just-In-Time by modern engines (V8, SpiderMonkey).  

- Functions called frequently are marked hot → compiled to optimized (TurboFan) machine code.
- Monomorphic functions: same type per argument → faster JIT.
- Polymorphic/dynamic at runtime: forces bailout / deoptimization.
- TypeScript promotes monomorphic patterns.
- enable JIT benefits by keeping code predictable: narrow argument types, avoid environment mutation.

---

## 26. Object pooling

reuse objects instead of allocating new ones to reduce GC overhead.

```javascript
class VectorPool {
  constructor() {
    this._pool = [];
  }
  obtain(x, y) {
    return this._pool.pop() ?? { x, y };
  }
  release(vec) {
    this._pool.push(vec);
  }
}
```

Useful for particles, gameplay loops, frame-based geometry.

---

## 27. Efficient algorithms & data structures

Performance of a loop matters:

| size | O(n) | O(n²) |
|------|------|-------|
| 10 | instantaneous | instantaneous |
| 100 | 0.001 ms | 0.01 ms |
| 1,000 | 0.01 ms | 1 ms |
| 10,000 | 0.1 ms | 100 ms |
| 100,000 | 1 ms | 10 sec |
| 1,000,000 | 10 ms | 1,000+ sec |

Use Set / Map for O(1) lookups. `Set.has` > `Array.includes` on large arrays.  
Use `TypedArray` (Int32Array, Float64Array) for numeric data.  

---

## 28. Transferable objects (ArrayBuffer)

Zero-copy transfer of raw binary data.

```javascript
const bufferSize = 1024 * 1024 * 100; // 100 MB
const buffer = new ArrayBuffer(bufferSize);

// worker:
worker.postMessage({ buffer }, [buffer]);

// after transfer: buffer.byteLength === 0 (transferred)
```

Best for:
- OffscreenCanvas to worker.
- Large ArrayBuffer data between threads.

---

## 29. SharedArrayBuffer for multi-threading

Multiple workers can share the same raw memory. requires Cross-Origin Isolation.

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

```javascript
const buffer = new SharedArrayBuffer(1024);
const view = new Int32Array(buffer);

// workers use Atomics to synchronize:
Atomics.add(view, 0, 1);
Atomics.wait(view, 0, 1, 1000); // sync primitive
```

Used for:
- parallel video processing
- audio synthesizers
- game physics

---

## 30. Compression (gzip, brotli)

Compression reduces network transit.

| algorithm | Average size reduction | Compress time | decode time |
|-----------|----------------------|---------------|-------------|
| gzip | ~60-70% | moderate | fast |
| brotli | ~20% better than gzip | slower | moderate |

- Use Brotli (preferred for text/html/css, when the CDN/browser supports; Brotli is Level 4-5 on the fly.)
- gzip for fallback.
- Enable in Webpack/Vite:
  - Vite: Vite precompresses Brotli & Gzip for static assets.
  - Webpack: CompressionPlugin.
  - nginx: `gzip on; brotli on;` in config.

---

# PART 3 — TESTING

## 1. Testing types

| Type | Scope | Tool candidates |
|------|-------|-----------------|
| unit | smallest functions/classes | Vitest, Jest |
| integration | combined modules, with DOM | Vitest + Testing Library |
| component | Single component rendering | Vitest + Testing Library, Storybook + Vitest |
| e2e | full user flow | Playwright, Cypress |
| snapshot | prevent UI regressions | Vitest/Jest built-in |
| regression | catch unintended changes | E2e + snapshot |
| property-based | invariant via random input | fast-check |

---

## 2. Jest

Industry Standard since 2014.

### Installation:
```bash
npm install --save-dev jest
npm install --save-dev babel-jest @babel/preset-env
```

### Example:
```javascript
test('adds 1 + 2 = 3', () => {
  expect(1 + 2).toBe(3);
});
```

### Mocking:
```javascript
jest.mock('axios');
axios.get.mockResolvedValue({ data: users });
```

### Coverage:
```bash
jest --coverage
```

### Pros:
- enormous ecosystem.
- zero-config for most simple apps.
- snapshot built-in.

### Cons:
- Slow for large projects.
- ESM support needs babel/labjack ceremony.
- Lost new project adoption to Vitest.

---

## 3. Mocha + Chai

Flexible but requires manual assembly.

```javascript
const { expect } = require('chai');
describe('mochaSuite', () => {
  it('should pass', () => {
    expect(1 + 1).to.equal(2);
  });
});
```
- Mocha: test runner.
- Chai: assertion library.
- no built-in mock → require sinon.

---

## 4. Jasmine

- Older framework used by angular.
- includes assertion library and test runner.
- spies built-in.

```javascript
describe('jasmine Suite', () => {
  it('passes', () => {
    expect(1 + 1).toBe(2);
  });
});
```
no separate assertion needed.

---

## 5. Vitest

Winner of the unit/integration war — default for new projects.

### Setup:
```bash
npm install --save-dev vitest
# no further config for vite projects
```

### Example:
```javascript
import { describe, it, expect } from 'vitest';

it('works', () => {
  expect(sum(1, 2)).toBe(3);
});
```

### Advantages vs Jest:

| Factor | Jest | Vitest |
|--------|------|--------|
| cold start | ~5s | ~0.5s |
| Native ESM support | babel bridge | native |
| TypeScript | ts-jest, babel | esbuild by default |
| Re-run on change | ~2s | ~100ms |
| Config complexity | separate file, babel | Vite config reuse |
| Worker isolation | VM | thread/fork |

### Mocking:
```javascript
import { vi } from 'vitest';
vi.mock('../api');
```

### coverage:
```bash
vitest --coverage
```

---

## 6. Cypress

End-to-end and component testing for all browsers (Chromium, Firefox, WebKit in v14+).

### Checklist:
- runs inside the browser.
- snapshot across steps.
- real-time reload.

### Example:
```javascript
cy.visit('/login');
cy.get('[data-cy=email]').type('user@example.com');
cy.get('[data-cy=submit]').click();
cy.url().should('include', '/dashboard');
```
### Cons:
- single-tab execution.
- requires paid Cloud plan for parallelization across multiple browsers.

---

## 7. Playwright

De facto E2E standard by 2026 – multi-browser, auto-wait, Trace Viewer.

### Setup:
```bash
npm install --save-dev @playwright/test
npx playwright install
```

### Example:
```javascript
import { test, expect } from '@playwright/test';

test('navigate and check title', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);

  // auto-wait makes this reliable
  await page.click('text=Get Started');
  const url = page.url();
  expect(url).toContain('/getting-started');
});
```

### Auto-wait:
- `page.click()` waits for element to be visible, not obscured.
- `expect(locator).toBeVisible()` retries up to 5 seconds.
- dramatically reduced flakiness.

### Trace viewer:
```bash
npx playwright test --trace on
# output in test-results/
npx playwright show-report
```

Trace includes screenshots, network logs, console errors, timing.

### API testing:
```javascript
const response = await page.request.post('https://api.example.com/login', {
  data: { email, password }
});
expect(response.ok()).toBeTruthy();
```

### Multi-browser:
configure via `playwright.config.ts`: define Chromium, Firefox, WebKit.

---

## 8. Testing Library

Set of libraries to test components from the user's perspective.

### Principle:
- test behaviour, not implementation.
- queries by accessibility: `getByRole`, `getByLabel`, `getByText`.
- avoid test IDs unless absolutely necessary.

### React examples:
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders button and reacts', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /click me/i });
  fireEvent.click(button);
  expect(screen.getByText(/you clicked/i)).toBeTruthy();
});
```

### bindings:
- DOM Testing Library
- React Testing Library
- Vue Testing Library
- Svelte Testing Library
- Angular testing library

---

## 9. Puppeteer

Browser automation library controlled by JavaScript. Less integrated than Playwright.

```javascript
const puppeteer = require('puppeteer');
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://example.com');
await page.screenshot({ path: 'screenshot.png' });
```

### best for:
- custom automation / script.
- Screenshot diff integration.
- When you need puppeteer specifically for an DevTools Protocol scenario.

---

## 10. Test doubles: mocks, stubs, spies, fakes

| type | what it does |
|------|------------|
| Mock | pre-programmed with expectations |
| Stub | provides pre-arranged answers |
| Spy | Wraps a real object to record interactions |
| Fake | a lightweight working implementation |

### In Jest/Vitest:

```javascript
const spy = vi.spyOn(console, 'log');
const mock = vi.fn().mockReturnValue(42);
```

### In Sinon:

```javascript
sinon.spy(obj, 'method');
sinon.stub(obj, 'method').returns(42);
sinon.fake.returns(42);
sinon.mock(obj).expects('method').once();
```

---

## 11. Test coverage

| metric | meaning | Target |
|--------|---------|--------|
| line coverage | % of lines executed | 80%+
| branch coverage | % of true/false executed | 75%+ |
| function coverage | % of functions called | 80%+ |

```bash
vitest --coverage      # uses v8 or istanbul
jest --coverage        # built-in istanbul
```

Do NOT chase high coverage as goal: high coverage + poor tests is worse than low coverage + meaningful assertions.

---

## 12. TDD — Test-Driven Development

Process: write a failing test → write minimal code to make it pass → refactor.

### cycle:
1. Red: write test that fails.
2. Green: write simplest production code.
3. Refactor: Improve Implementation.

### Pros:
- high coverage.
- forces testable design.
- fewer regressions.

---

## 13. BDD — Behavior-Driven Development

Writing tests in human-readable Given-When-Then style.

### Structure:
```
Feature: User login
  Scenario: Valid user
    Given I am on the login page
    When I fill in credentials
    And I click submit
    Then I should see the dashboard
```

### Tools:
- Cucumber.js
- Jest/Jasmine BDD support.
- Playwright can implement BDD with Gherkin.

---

## 14. Property-based testing

Generates many random inputs; asserts the function's invariants hold.

```javascript
import fc from 'fast-check';

test('sorting is idempotent', () => {
  fc.assert(fc.property(fc.array(fc.integer()), (arr) => {
    const sorted = arr.sort((a,b) => a - b);
    expect(sorted).toEqual(sorted.sort((a,b) => a - b));
    // invariant: sorting already sorted returns same
  }));
});
```
Library: fast-check.

---

## 15. Snapshot testing

Captures the rendered output (string/HTML/JSON) and compares on subsequent runs.

```javascript
test('renders correctly', () => {
  const tree = renderer.create(<MyComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

### Good for:
- Stable UI components.
- Detecting unintended changes.

### Bad for:
- Highly dynamic content.
- Large snapshots that are never reviewed.

### in CI:
- `--ci` flag will fail on uncommitted snapshots.
- update with `vitest -u` / `jest -u`.

---

## 16. E2E testing patterns

### Dos:
- Focus on user journeys.
- 20-30 E2E tests covering auth, checkout, onboarding, core CRUD.
- Use describe + test(isolated).
- Clean up via Playwright's BrowserContext isolation.
- Run in CI with parallel execution across 4-8 workers.

### General:
```
E2E tests are expensive: trust only for high-value flows.
  Unit/Integration: ~70/20% of the pyramid.
  E2E: ~10% of the pyramid.
```

---

## 17. API testing

```javascript
// Vitest:
const response = await fetch('http://localhost:3001/api/users');
expect(response.status).toBe(200);

// Playwright:
const res = await request.get('http://localhost:3001/todos');
const json = await res.json();
expect(res.status()).toBe(200);
expect(json).toContainEqual(expect.objectContaining({ title: 'Do dishes' }));
```

### Tool:
- Supertest for express:
```javascript
const request = require('supertest');  
it('returns 200', async () => {
  await request(app).get('/users').expect(200);
});
```

---

## 18. Performance testing

| Tool | Type | what it measures |
|------|------|------------------|
| Chrome DevTools Performance | Lab | Frame timing, long tasks |
| Lighthouse | Lab | LCP, TBT, CLS |
| web-vitals | field | LCP, INP, field CLS |
| k6 / artillery | Load test | Throughput, latency |
| Sitespeed | Lab + field | Full evaluation |

Set performance budgets:
```bash
npx size-limit
```
```json
"size-limit": [
  { "name": "main bundle", "gzipped": true }
]
```

---

## 19. Security testing

| method | Tool | Detects |
|--------|------|---------|
| npm audit | npm | known dependency vulns |
| Retire.js | Snyk | jquery-plugin vulns |
| Zap OWASP | zaproxy | XSS, SQL injection, CSRF |
| ESLint-plugin-security | eslint | eval, innerHTML |
| Snyk | Snyk | dependency vulns, IaC, SAST |
| GitHub CodeQL | CodeQL | prototype pollution, resource leaks |

---

## 20. Code coverage reports

Publish coverage from CI to maintain long-term view.

### tools:
- c8 / istanbul.
- Codecov / Coveralls / SonarQube.

### Vite:
```bash
vitest run --coverage
```
output: folder `coverage/`.

### Jest:
```bash
jest --coverage
```
output: `coverage/` folder.

### Best practice:
- Fail CI if coverage drops by > 2%.
- Review snapshot coverage.
- exclude utility folders with `coverage.exclude`.

---

# PART 4 — MODULE BUNDLING AND TOOLING

## 1. npm / yarn / pnpm

| tool | lockfile | Disk efficiency | Install speed |
|------|----------|----------------|---------------|
| npm | `package-lock.json` | Standard | baseline |
| yarn | `yarn.lock` | similar | similar |
| pnpm | `pnpm-lock.yaml` | Shared store across projects | fast |

### Best practices:
- commit lockfile.
- use exact version in library.
- use `^` for application.
- Use `overrides`/`resolutions` for security.

```bash
# instead of npm
npm ci          # clean install from lock (fast, deterministic)
npm install     # mutates lock

# pnpm:
pnpm install --frozen-lockfile
```

---

## 2. Webpack

Configuration-based bundler that dominated 2014–2024.

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  optimization: {
    splitChunks: { chunks: 'all' },
    runtimeChunk: 'single',
  },
};
```

### Loaders: transform files
### Plugins: hook into build process

### Pros:
- mature, huge ecosystem.
- Module Federation for micro-frontends.

### Cons:
- cold start is slow (5-15 seconds).
- config is verbose.

---

## 3. Vite

Winner of the DX war; the default for new projects in 2026, including Vite 8.

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    proxy: { '/api': 'http://localhost:3001' },
  },
});
```

### architecture:
- **Dev:** esbuild-powered on-demand ESM transform → instant cold start.
- **Prod:** Rollup output → fully optimized.
- **Vite 8 (June 2026):** Rolwind Rust-based bundler, unify dev+prod, 10x faster builds.

---

## 4. Rollup

Library bundling specialist.

```javascript
import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.esm.js', format: 'esm', sourcemap: true },
      { file: 'dist/index.cjs', format: 'cjs', sourcemap: true },
    ],
    plugins: [resolve(), typescript(), terser()],
  },
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.d.ts' },
    plugins: [dts()],
  },
]);
```
---
---

## 5. esbuild

Written in Go; fastest bundler/transpiler.

```bash
esbuild src/app.ts --bundle --outfile=dist/bundle.js --minify
```

- ~100x faster than tsc for TypeScript transpilation.
- used via Webpack/Vite/Parcel.
- Not a dev server.
- Good for CLI tools / libs.
- Less sophisticated code splitting than Rollup.

---

## 6. Parcel

Zero config bundler.

```javascript
// parcel index.html
// automatically detects TypeScript, React, CSS, images.
```

Good for small-med but has a smaller ecosystem than Vite.

---

## 7. Babel

Transpiles modern JS → backwards-compatible.

### Presets:
```javascript
presets: [
  ['@babel/env', { targets: { browsers: '>0.25%, not dead' }}],
  '@babel/react',
  '@babel/typescript',
];
```

### Plugins:
```javascript
plugins: [
  '@babel/plugin-transform-runtime',
  'babel-plugin-styled-components',
]
```
Vite mainly bypasses Babel for esbuild-powered TS/JSX; Babel is now mainly a library-tool.

---

## 8. TypeScript

```typescript
const greet = (name: string): string => {
  return `Hello ${name}`;
};
```

### Benefits:
- type safety.
- IntelliSense.
- better documentation via types.
- can catch errors at compile time.

### tsconfig:
```javascript
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

TypeScript compatibility: all modern bundlers (Vite, Rollup, esbuild) compile TypeScript by default.

---

## 9. ESLint

Lint tool for catching problematic patterns.

```bash
npm install --save-dev eslint
npx eslint --init
```

### Basic config:
```javascript
export default {
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: { parser: '@typescript-eslint/parser' },
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    semi: ['warn', 'always'],
    'no-console': 'warn',
  },
};
```

### integrate with Vite:
```bash
npm install --save-dev eslint
# run: npx eslint .
```
in 2026, Biome is also a solid Rust-based replacement.

---

## 10. Prettier

opinionated code formatter.

```bash
npm install --save-dev prettier
npx prettier --check .
npx prettier --write .
```

Common config:
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2
}
```

Integrates with ESLint via `eslint-config-prettier` (disables eslint rules that conflict with prettier).

---

## 11. PostCSS

Post-process CSS with plugins, Tailwind; Vite bundles it by default.

```javascript
// postcss.config.js
export default {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    'cssnano': {},
  },
};
```
Use cases:
- Autoprefixer.
- Tailwind.
- cssnano for minification.

---

## 12. Source maps

map from the bundled code back to the original source.

### types:
| mode | effect |
|------|--------|
| `source-map` | full quality, slower |
| `hidden-source-map` | full source map, not included in the product. only sentry receives them |
| `nosources-source-map` | map w/o original source code |
| `eval-source-map` (Vite dev) | fast |

```javascript
build: { sourcemap: true } // default in Vite
```

NEVER deploy full source maps to production with vendored full source — use NoSources or hidden.

---

## 13. Hot Module Replacement

Updates modules in the running browser without a full reload.

### Vite:
- plugins like `@vitejs/plugin-react` provide React Fast Refresh.
- only changed modules get invalidated.
- preserves state when available.

### Webpack:
- HMR runtime included.
- Dev server uses WebSocket to send updates.

### Benefits:
- sub-second feedback.
- state persistence.

---

## 14. Environment variables

### Vite:
```bash
VITE_API_URL=https://api.example.com
VITE_APP_NAME=myapp
```
- prefixed with `VITE_` to avoid leaking secrets.
- accessed via `import.meta.env.VITE_API_URL`.
- inlined at build time.

### Next.js:
```bash
NEXT_PUBLIC_API_URL=https://api.example.com
NON_PUBLIC_KEY=supersecret
```
- `NEXT_PUBLIC_*` prefix for browser.
- un-prefixed: server only.

### Node.js:
```bash
process.env.MY_SECRET
```
no prefix.

---

## 2026 Stack Cheat Sheet

| layer | tool  |
|-------|-------|
| Build | Vite 8 |
| Unit/Int test | Vitest 3 |
| E2E test | Playwright 1.50+ |
| Component test | Testing Library |
| Mock API | MSW 2 |
| Visual regression | Chromatic / Percy |
| CI | GitHub Actions |
| Lint | ESLint / Biome |
| Format | Prettier |
| Bundle analyzer | rollup-plugin-visualizer |

---

## Key 2026 trends:
1. **Vite** won the dev bundler war. Webpack legacy maintenance only.
2. **Vitest** replaced Jest for new projects — same API, 10x speed.
3. **Playwright** replaced Cypress for new E2E — multi-browser, auto-wait.
4. **CSP become living runtime** — nonces + Trusted Types + reports.
5. **Machine learning & passkeys** change auth and code gen.
6. **Rust-based tools** (Rolwind, Turbopack, Biome, Partytown) increase speed.
7. **Supply chain** attacks via npm increased → lockfile + SRI + provenance auditing.
