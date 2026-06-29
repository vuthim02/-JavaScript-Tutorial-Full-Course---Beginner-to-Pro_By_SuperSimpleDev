# Level 76: CDN and External Script Loading

## Error Snippets (1-70)

### Error 1: CDN Script Loaded After Module That Depends on It
**Description:** The module script imports before the CDN library is loaded.
```javascript
<script type="module" src="js/app.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Error 2: CDN Script URL Uses HTTP Instead of HTTPS
**Description:** Loading a CDN script over HTTP which causes mixed content warnings.
```javascript
<script src="http://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Error 3: CDN Script Tag Missing Integrity Attribute
**Description:** Loading a CDN script without Subresource Integrity (SRI) check.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Error 4: Using CDN Library Before Script Loads
**Description:** Module code uses the library before the CDN script has loaded.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script>
  console.log(dayjs().format('YYYY-MM-DD')); // dayjs is undefined if script hasn't loaded
</script>
```

### Error 5: CDN Version Pinned to Latest Causing Breakage
**Description:** Using `latest` or no version number in CDN URL.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs/dayjs.min.js"></script>
```

### Error 6: Wrong CDN Path for Library
**Description:** The CDN path doesn't match the actual file location.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dist/dayjs.min.js"></script>
```

### Error 7: CDN Script Blocking DOM Rendering
**Description:** Loading a render-blocking CDN script in the `<head>` without `defer` or `async`.
```javascript
<head>
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
</head>
```

### Error 8: Module CDN Import Using Wrong Specifier
**Description:** Using npm-style import from CDN without the correct CDN import syntax.
```javascript
import dayjs from 'dayjs';
// No import map or bundler configured
```

### Error 9: CDN Library Version Mismatch Between Files
**Description:** Two CDN scripts loading different versions of the same library.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1.10.0/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1.11.0/dayjs.min.js"></script>
```

### Error 10: CDN Script Loaded With `async` Causing Race
**Description:** Using `async` on a CDN script that must load before dependent code.
```javascript
<script async src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script>
  dayjs(); // may fail if async hasn't loaded yet
</script>
```

### Error 11: Using ES Module CDN With Wrong Import Syntax
**Description:** Trying to use a UMD CDN build with ES module import syntax.
```javascript
// dayjs loaded from CDN as UMD
import dayjs from 'dayjs'; // Not a module, won't work
```

### Error 12: CDN Script Failed to Load Due to Network
**Description:** No fallback if the CDN is unreachable.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Error 13: Import Map Missing for Bare Specifiers
**Description:** Using bare import specifiers without an import map.
```javascript
import dayjs from 'dayjs';
// No import map defined in HTML
```

### Error 14: CDN URL With Wrong File Extension
**Description:** CDN URL points to a `.ts` TypeScript file instead of `.js`.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.ts"></script>
```

### Error 15: Multiple CDN Scripts Without Defer
**Description:** Multiple synchronous CDN scripts block rendering sequentially.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios@1/axios.min.js"></script>
```

### Error 16: CDN Library Accessed Before DOM Ready
**Description:** Using CDN-loaded library to manipulate DOM before the DOM is ready.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script>
  document.getElementById('date').textContent = dayjs().format('YYYY-MM-DD');
</script>
```

### Error 17: CDN Script in Module Script Without `async` or `defer`
**Description:** Module script tag loads CDN dependencies via non-module script.
```javascript
<script src="https://cdn.example.com/lib.js"></script>
<script type="module" src="app.js"></script>
// app.js needs lib.js but it might not be loaded yet
```

### Error 18: CDN URL Uses Deprecated CDN Provider
**Description:** Using a CDN provider that is no longer maintained.
```javascript
<script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.0.0/dayjs.min.js"></script>
```

### Error 19: CDN Library Exposes Global That Conflicts With Module
**Description:** A CDN library sets a global variable that conflicts with module variables.
```javascript
// dayjs CDN sets window.dayjs
// Module also declares: const dayjs = 'custom';
```

### Error 20: Import Map URL Points to Non-Existent File
**Description:** The import map JSON file URL is incorrect.
```javascript
<script type="importmap" src="import-map.json"></script>
```

### Error 21: CDN Script Loaded Twice on Same Page
**Description:** Two scripts load the same CDN library redundantly.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Error 22: Using CDN Library That Requires Polyfills
**Description:** A modern CDN library is used in an older browser without polyfills.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Error 23: CDN Script Interfering With Module Scope
**Description:** A CDN script modifies the global namespace in unexpected ways.
```javascript
// CDN script defines:
window.$ = { version: '1.0.0' };
```

### Error 24: Inline Script Between CDN Script Tags Using Module Variables
**Description:** An inline script tries to use variables from CDN scripts that haven't loaded.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script>
  // This might work if cached, but unreliable
  const today = dayjs().format('YYYY-MM-DD');
</script>
```

### Error 25: CDN URL Points to Unpkg but Package Is Non-Existent
**Description:** The package name in the CDN URL doesn't exist.
```javascript
<script src="https://unpkg.com/non-existent-package@1.0.0/lib.js"></script>
```

### Error 26: Module Import Map Has Syntax Error
**Description:** The import map JSON has a syntax error.
```javascript
<script type="importmap">
{
  "imports": {
    "dayjs": "https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"
  }
}
</script>
```

### Error 27: CDN Library Overwrites Existing Global
**Description:** The CDN library's global variable overwrites an existing variable.
```javascript
// Before CDN:
window.dayjs = 'custom value';
// After CDN load:
window.dayjs = dayjs library // overwritten!
```

### Error 28: Async CDN Script With Dependencies
**Description:** Two async CDN scripts where one depends on the other.
```javascript
<script async src="https://cdn.example.com/plugin.js"></script>
<script async src="https://cdn.example.com/core.js"></script>
// plugin.js depends on core.js
```

### Error 29: CDN Script Tag Has Wrong `type` Attribute
**Description:** Setting `type="module"` on a CDN script that is UMD/IIFE.
```javascript
<script type="module" src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Error 30: Using CDN Library Without Checking Load Status
**Description:** No verification that the CDN library loaded successfully before using it.
```javascript
function initApp() {
  dayjs(); // assumes dayjs is loaded
}
```

### Error 31: CDN Script Loads in `<head>` But Dependent Script in `<body>`
**Description:** CDN script in `<head>` blocks rendering unnecessarily.
```javascript
<head>
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
</head>
<body>
  <script src="js/app.js"></script>
</body>
```

### Error 32: CDN Bundle Includes Both Dev and Prod
**Description:** Loading both development and production builds of the same library.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Error 33: Dynamic Import of CDN Module Without Full URL
**Description:** Using bare specifier in dynamic import without import map.
```javascript
async function loadDayjs() {
  return import('dayjs');
}
```

### Error 34: CDN Cache Busting Too Aggressive
**Description:** Adding random query params to CDN URLs defeats caching.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js?t=${Date.now()}"></script>
```

### Error 35: CDN Script Uses `defer` But Needs Immediate Execution
**Description:** Using `defer` on a CDN script that is needed before DOM is parsed.
```javascript
<script defer src="https://cdn.example.com/polyfill.js"></script>
```

### Error 36: CDN Plugin Loaded Before Core Library
**Description:** A DayJS plugin script is loaded before the core DayJS library.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/plugin/relativeTime.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Error 37: Import Map With Wrong URL Format
**Description:** The import map URL doesn't end with `.js` for a JS file.
```javascript
<script type="importmap">
{
  "imports": {
    "dayjs": "https://cdn.jsdelivr.net/npm/dayjs@1/"
  }
}
</script>
```

### Error 38: CDN Library Not Compatible With Strict CSP
**Description:** The CDN library uses `eval()` which violates Content Security Policy.
```javascript
// CDN library uses eval internally
```

### Error 39: Loading Both Minified and Source Map Unnecessarily
**Description:** The HTML loads the source map file as a script.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js.map"></script>
```

### Error 40: CDN Script in Module Context Using `document.write`
**Description:** The CDN library uses `document.write` which doesn't work in module scripts.
```javascript
// Some CDN libraries use document.write for loading
```

### Error 41: CDN Script Loaded in Both Server and Client
**Description:** CDN script tag is included in SSR output causing duplicate loading.
```javascript
// Server-rendered HTML includes CDN script, then client also loads it
```

### Error 42: Using CDN URL With Version Constraint That Resolves Wrong
**Description:** Version constraint `^1.0.0` might resolve to 2.0.0 on some CDNs.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@^1.0.0/dayjs.min.js"></script>
```

### Error 43: CDN Script Not Cached Due to Missing Cache Headers
**Description:** CDN response lacks proper caching headers causing repeated downloads.
```javascript
// CDN returns no-cache headers
```

### Error 44: Inline Import Map With Duplicate Keys
**Description:** The import map has duplicate entries for the same specifier.
```javascript
<script type="importmap">
{
  "imports": {
    "dayjs": "https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js",
    "dayjs": "https://cdn.example.com/dayjs.min.js"
  }
}
</script>
```

### Error 45: CDN Script Loaded Before Meta Charset
**Description:** CDN script loads before the charset meta tag is defined.
```javascript
<head>
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
  <meta charset="UTF-8">
</head>
```

### Error 46: Using CDN Library That Needs Transpilation
**Description:** A modern CDN library is used in IE11 without transpilation.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Error 47: CDN URL Points to Wrong Package Name
**Description:** The package name in the CDN URL is misspelled.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjss@1/dayjs.min.js"></script>
```

### Error 48: CDN Library Loaded But Not Used
**Description:** A CDN library is loaded but never referenced in the code.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js"></script>
// Only lodash is used, dayjs is not
```

### Error 49: Module Script Loaded Before Import Map
**Description:** A module script that uses mapped imports runs before the import map is defined.
```javascript
<script type="module">
  import dayjs from 'dayjs';
</script>
<script type="importmap">
{
  "imports": {
    "dayjs": "https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"
  }
}
</script>
```

### Error 50: CDN Script With Wrong MIME Type
**Description:** The CDN serves the script with an incorrect MIME type.
```javascript
// Server returns Content-Type: text/plain instead of application/javascript
```

### Error 51: CDN URL Contains Spaces
**Description:** The CDN URL has URL-encoded spaces.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/day%20js.min.js"></script>
```

### Error 52: CDN Library Uses Deprecated API
**Description:** The loaded CDN library uses deprecated browser APIs.
```javascript
// Library shows deprecation warnings in console
```

### Error 53: CDN Script Loads Before CSS
**Description:** CDN render-blocking script loads before critical CSS.
```javascript
<head>
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
  <link rel="stylesheet" href="styles.css">
</head>
```

### Error 54: CDN Script Without Crossorigin Attribute for Integrity
**Description:** Using SRI integrity hash but missing `crossorigin` attribute.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"
        integrity="sha384-hash"></script>
```

### Error 55: CDN Module Import With Wrong Path Separator
**Description:** Using backslash in CDN URL path on Windows.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1\dayjs.min.js"></script>
```

### Error 56: CDN Script Loading Blocks Other Resources
**Description:** A large CDN script in `<head>` delays loading of CSS and fonts.
```javascript
<head>
  <script src="https://cdn.example.com/heavy-library.js"></script>
  <link rel="stylesheet" href="styles.css">
  <link rel="preload" href="fonts.woff2" as="font">
</head>
```

### Error 57: CDN URL Query Parameter Causes Cache Miss
**Description:** Using unique query parameters prevents CDN caching.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js?v=1.0.0"></script>
```

### Error 58: CDN Library Added via JavaScript After DOM Ready
**Description:** Dynamically adding a CDN script and using it immediately.
```javascript
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js';
document.head.appendChild(script);
dayjs(); // dayjs not loaded yet
```

### Error 59: Import Map With Non-CDN URL That 404s
**Description:** The import maps to a URL that returns a 404 error.
```javascript
<script type="importmap">
{
  "imports": {
    "dayjs": "https://cdn.example.com/non-existent/dayjs.min.js"
  }
}
</script>
```

### Error 60: CDN Script Causes Layout Shift
**Description:** A CDN script adds content to the page, causing layout shift.
```javascript
// CDN widget script inserts elements asynchronously
```

### Error 61: CDN Library Not Available in Offline Mode
**Description:** The app breaks when offline because CDN libraries aren't cached.
```javascript
// No service worker caching for CDN resources
```

### Error 62: CDN Script Error Bubbles to Window
**Description:** CDN script errors bubble up to window error handler.
```javascript
window.onerror = (msg) => {
  console.log('Error:', msg);
};
// CDN script error triggers this
```

### Error 63: CDN Bundle Too Large for Mobile
**Description:** The CDN library bundle size is too large for slow mobile connections.
```javascript
// 500KB+ CDN bundle on 3G connection
```

### Error 64: CDN Library Contains Debug Code in Production
**Description:** The CDN URL points to the development build with debug logging.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.js"></script>
```

### Error 65: CDN Script Tag Attribute Order Causes Issues
**Description:** The `src` attribute comes after other attributes in unexpected ways.
```javascript
<script defer integrity="sha384-hash" src="https://cdn.example.com/lib.js"></script>
```

### Error 66: Using Same CDN Domain for Multiple Libraries Without HTTP/2
**Description:** Loading many libraries from the same CDN domain without HTTP/2 multiplexing.
```javascript
<script src="https://cdn.example.com/lib1.js"></script>
<script src="https://cdn.example.com/lib2.js"></script>
<script src="https://cdn.example.com/lib3.js"></script>
```

### Error 67: CDN Script Blocks Main Thread
**Description:** A synchronous CDN script executes for too long on the main thread.
```javascript
// CDN script performs heavy computation
```

### Error 68: CDN URL With Path Traversal
**Description:** CDN URL contains path traversal sequences.
```javascript
<script src="https://cdn.jsdelivr.net/npm/../../etc/passwd"></script>
```

### Error 69: CDN Library Modifies Global Prototypes
**Description:** The CDN library modifies built-in prototypes causing issues.
```javascript
// CDN library does: Array.prototype.includes = function() { ... }
```

### Error 70: CDN Script Loads External Fonts Unnecessarily
**Description:** A CDN widget script loads its own fonts, overriding site fonts.
```javascript
// CDN widget injects @font-face rules
```

## Issue Snippets (1-30)

### Issue 1: All CDN Scripts Are Synchronous
**Description:** All CDN scripts are loaded synchronously without `defer` or `async`.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios@1/axios.min.js"></script>
```

### Issue 2: CDN Libraries Loaded in Both Dev and Prod
**Description:** The same CDN libraries are loaded during development and production without difference.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Issue 3: No Fallback CDN Provider
**Description:** Single CDN provider with no fallback if the primary CDN is down.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Issue 4: CDN Scripts Without SRI Integrity Hashes
**Description:** No Subresource Integrity hashes on any CDN scripts.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js"></script>
```

### Issue 5: CDN Scripts Mixed With Bundle Scripts
**Description:** CDN scripts and local scripts are loaded in arbitrary order.
```javascript
<script src="js/app.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script src="js/cart.js"></script>
```

### Issue 6: No Import Map for Module Imports
**Description:** Module imports use bare specifiers without an import map or bundler.
```javascript
import dayjs from 'dayjs';
import lodash from 'lodash';
```

### Issue 7: CDN Libraries Not Version Pinned
**Description:** CDN URLs use version ranges that can unexpectedly update.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@latest/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js"></script>
```

### Issue 8: CDN Domains Not Using Same Protocol
**Description:** Mixed HTTP and HTTPS CDN domains.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script src="http://cdn.example.com/lib.js"></script>
```

### Issue 9: CDN Libraries Loaded in `<head>` Blocking Render
**Description:** All CDN scripts are in `<head>` blocking first paint.
```javascript
<head>
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js"></script>
</head>
```

### Issue 10: Large CDN Libraries Used for Small Features
**Description:** Importing a large CDN library for a single small feature.
```javascript
// Loading moment.js (50KB) just for one date format:
moment().format('MMMM D, YYYY');
```

### Issue 11: No CDN Resource Timing Monitoring
**Description:** No monitoring of CDN load times or failures.
```javascript
// No performance monitoring for CDN resources
```

### Issue 12: CDN Script Redundancy With npm Installed Version
**Description:** Library loaded both via CDN script tag and installed via npm.
```javascript
// HTML:
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
// JS:
import dayjs from 'dayjs'; // from node_modules
```

### Issue 13: CDN Libraries Not Tree-Shaken
**Description:** Whole library loaded from CDN even when only a subset is used.
```javascript
// Loading entire lodash (500KB+) for just _.debounce
```

### Issue 14: No CDN Preconnect/Preload Hints
**Description:** No DNS prefetch or preconnect for CDN domains.
```javascript
<!-- Missing: -->
<link rel="preconnect" href="https://cdn.jsdelivr.net">
```

### Issue 15: CDN Scripts Not Deferred for Non-Critical Libraries
**Description:** Non-critical CDN libraries loaded synchronously.
```javascript
<script src="https://cdn.example.com/analytics.js"></script>
<script src="https://cdn.example.com/chat-widget.js"></script>
```

### Issue 16: CDN Libraries Not Grouped by Dependency Order
**Description:** CDN scripts load in arbitrary order regardless of dependencies.
```javascript
<script src="https://cdn.example.com/plugin.js"></script>
<script src="https://cdn.example.com/core.js"></script>
```

### Issue 17: Same CDN Library Loaded From Multiple CDNs
**Description:** The same library is loaded from different CDN providers in different pages.
```javascript
// Page 1: cdn.jsdelivr.net
// Page 2: cdnjs.cloudflare.com
```

### Issue 18: CDN Script Error Not Handled Gracefully
**Description:** No fallback UI when a CDN library fails to load.
```javascript
// App crashes if CDN is down
```

### Issue 19: CDN Library Version Not Documented
**Description:** No documentation of which CDN library versions are in use.
```javascript
// No version comment or package.json entry
```

### Issue 20: CDN URLs Hardcoded Across Multiple Files
**Description:** CDN URLs repeated in many HTML files instead of centralized.
```javascript
<!-- Repeated in 10+ HTML files: -->
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Issue 21: CDN Script Overrides Important Browser Features
**Description:** A CDN polyfill overrides native browser APIs.
```javascript
// Polyfill CDN overrides fetch, Promise, etc.
```

### Issue 22: No CDN Script Defer for Below-the-Fold Content
**Description:** CDN scripts for below-the-fold content load eagerly.
```javascript
<script src="https://cdn.example.com/footer-widget.js"></script>
```

### Issue 23: CDN Libraries Not Pruned After Migration
**Description:** Old CDN library still loads after migrating to a new library.
```javascript
// Both old and new libraries loaded:
<script src="https://cdn.example.com/moment.min.js"></script>
<script src="https://cdn.example.com/dayjs.min.js"></script>
```

### Issue 24: CDN Scripts in Template Partials
**Description:** CDN scripts included in template partials, loaded multiple times.
```javascript
<!-- header.html has: -->
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<!-- footer.html has: -->
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Issue 25: CDN Library Accessed via Global Instead of Import
**Description:** Using CDN library's global variable directly instead of importing.
```javascript
// Relying on global dayjs from CDN script
const today = dayjs().format('YYYY-MM-DD');
```

### Issue 26: No CDN Compression Check
**Description:** CDN resources might not be served with gzip/brotli compression.
```javascript
// Large uncompressed CDN bundle
```

### Issue 27: CDN Script Blocks Interactive Time
**Description:** CDN scripts delay Time to Interactive.
```javascript
<script src="https://cdn.example.com/heavy-chat-widget.js"></script>
```

### Issue 28: CDN Libraries Not Audited for Security
**Description:** No regular security audit of CDN library versions.
```javascript
// Using old library versions with known vulnerabilities
```

### Issue 29: CDN URL Includes Region-Specific Domain
**Description:** CDN URL hardcoded to a specific regional domain.
```javascript
<script src="https://cdn-eu.example.com/lib.js"></script>
```

### Issue 30: CDN Script Loading Strategy Changes Across Environments
**Description:** CDN scripts loaded differently in dev, staging, and prod.
```javascript
// Dev: async CDN
// Prod: sync CDN
```

## Modification Snippets (1-50)

### Modify 1: Add Defer Attribute to CDN Scripts
**Description:** Add `defer` to all CDN script tags to prevent render blocking.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js"></script>
```

### Modify 2: Add SRI Integrity Hashes to CDN Scripts
**Description:** Add Subresource Integrity attributes to all CDN script tags.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Modify 3: Add Fallback CDN Provider
**Description:** Add a fallback CDN provider if the primary CDN fails.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Modify 4: Create Import Map for CDN Modules
**Description:** Add an import map to resolve bare module specifiers to CDN URLs.
```javascript
// Currently no import map, modules can't use bare specifiers
```

### Modify 5: Move CDN Scripts From `<head>` to End of `<body>`
**Description:** Relocate all CDN scripts from the `<head>` to improve load performance.
```javascript
<head>
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js"></script>
</head>
```

### Modify 6: Add Preconnect Hints for CDN Domains
**Description:** Add `<link rel="preconnect">` for CDN domains.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Modify 7: Pin CDN Library Versions
**Description:** Replace version ranges with exact version numbers.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@latest/dayjs.min.js"></script>
```

### Modify 8: Add CDN Load Error Fallback
**Description:** Add error handling for when a CDN library fails to load.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Modify 9: Create a CDN Script Loader Module
**Description:** Create a JavaScript module that loads CDN scripts dynamically with error handling.
```javascript
// Currently CDN scripts loaded via HTML script tags only
```

### Modify 10: Remove Redundant CDN Scripts
**Description:** Remove CDN scripts that are no longer needed.
```javascript
<script src="https://cdn.jsdelivr.net/npm/moment@2/moment.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Modify 11: Consolidate CDN Library Versions
**Description:** Ensure the same library version is used across all pages.
```javascript
// Page 1: dayjs@1.10.0
// Page 2: dayjs@1.11.0
```

### Modify 12: Add Async Loading for Non-Critical CDN Scripts
**Description:** Add `async` to CDN scripts that are not critical for initial render.
```javascript
<script src="https://cdn.example.com/analytics.js"></script>
<script src="https://cdn.example.com/chat-widget.js"></script>
```

### Modify 13: Create a CDN Library Version Manifest
**Description:** Create a central file documenting all CDN library versions used.
```javascript
// No documentation of CDN versions
```

### Modify 14: Implement CDN Script Caching Strategy
**Description:** Configure service worker to cache CDN resources for offline use.
```javascript
// CDN scripts not cached by service worker
```

### Modify 15: Add CDN Performance Monitoring
**Description:** Track CDN script load times and failures.
```javascript
// No CDN performance metrics
```

### Modify 16: Move CDN URLs to Environment Variables
**Description:** Centralize CDN URLs so they can be changed per environment.
```javascript
// CDN URLs hardcoded in HTML
```

### Modify 17: Implement Dynamic CDN Loading With Retry
**Description:** Create a function that loads CDN scripts with retry logic.
```javascript
// Currently static script tags only
```

### Modify 18: Add Import Map Scopes for CDN Packages
**Description:** Use import map scopes to map sub-paths of CDN packages.
```javascript
// Current import map is flat
```

### Modify 19: Bundle Small CDN Libraries Instead of Loading Separately
**Description:** Inline small CDN libraries to reduce HTTP requests.
```javascript
<script src="https://cdn.example.com/small-lib.js"></script>
```

### Modify 20: Add CDN Script Load Timeout
**Description:** Add timeout handling for slow CDN script loading.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Modify 21: Use Module CDN Builds Instead of UMD
**Description:** Switch CDN script references from UMD to ES module builds.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Modify 22: Add Conditional Loading for CDN Polyfills
**Description:** Only load polyfill CDN scripts when needed via feature detection.
```javascript
<script src="https://cdn.example.com/polyfill.js"></script>
```

### Modify 23: Implement CDN Script Priority Loading
**Description:** Load critical CDN scripts first, defer non-critical ones.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script src="https://cdn.example.com/chat-widget.js"></script>
```

### Modify 24: Add CDN Resource Hints for Early Loading
**Description:** Add `dns-prefetch` and `preconnect` hints for all CDN domains.
```javascript
<!-- No resource hints currently -->
```

### Modify 25: Create a Vendor Bundle With CDN Dependencies
**Description:** Bundle CDN dependencies into a single vendor file.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js"></script>
```

### Modify 26: Add CDN Script Load Animation
**Description:** Show loading state while CDN scripts are loading.
```javascript
// No loading feedback for CDN scripts
```

### Modify 27: Implement CDN Module Fallback URLs
**Description:** Add fallback URLs for CDN module imports in import map.
```javascript
<script type="importmap">
{
  "imports": {
    "dayjs": "https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"
  }
}
</script>
```

### Modify 28: Move CDN Scripts to Conditional Comments
**Description:** Load CDN scripts conditionally based on browser support.
```javascript
<!--[if IE]>
<script src="https://cdn.example.com/ie-polyfill.js"></script>
<![endif]-->
```

### Modify 29: Add CDN Script Load Event Handlers
**Description:** Add `onload` and `onerror` handlers to CDN script tags.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Modify 30: Create CDN Library Wrapper Module
**Description:** Wrap CDN libraries in ES modules for consistent importing.
```javascript
// Currently using global from CDN script:
const today = dayjs().format('YYYY-MM-DD');
```

### Modify 31: Optimize CDN Script Loading Order
**Description:** Reorder CDN scripts so dependencies load before dependents.
```javascript
<script src="https://cdn.example.com/plugin.js"></script>
<script src="https://cdn.example.com/core.js"></script>
```

### Modify 32: Add Local Fallback Files for CDN Libraries
**Description:** Add local copies of CDN libraries as fallback when CDN is unavailable.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Modify 33: Implement CDN Script Compression Check
**Description:** Verify CDN scripts are served with compression.
```javascript
// No compression verification
```

### Modify 34: Add CDN Cache Busting Strategy
**Description:** Add version-based cache busting for CDN scripts.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Modify 35: Create a CDN Health Check Script
**Description:** Create a script that periodically verifies CDN availability.
```javascript
// No CDN health checking
```

### Modify 36: Reduce CDN Script Count by Combining
**Description:** Combine multiple small CDN scripts into one request where possible.
```javascript
<script src="https://cdn.example.com/a.js"></script>
<script src="https://cdn.example.com/b.js"></script>
<script src="https://cdn.example.com/c.js"></script>
```

### Modify 37: Add CDN Module Polyfill for Legacy Browsers
**Description:** Add a module polyfill CDN script for browsers that don't support ES modules.
```javascript
<script type="module" src="js/app.js"></script>
```

### Modify 38: Implement CDN Script Lazy Loading
**Description:** Load CDN scripts only when their functionality is needed.
```javascript
<script src="https://cdn.example.com/lightbox.js"></script>
```

### Modify 39: Add CDN Script Nonce for CSP
**Description:** Add CSP nonce attributes to CDN script tags.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Modify 40: Create CDN Usage Dashboard
**Description:** Monitor which CDN scripts are loaded and their performance.
```javascript
// No CDN usage monitoring
```

### Modify 41: Move CDN Configuration to JSON
**Description:** Centralize CDN configuration in a JSON file loaded by the app.
```javascript
// CDN URLs scattered in HTML templates
```

### Modify 42: Add CDN Script Type Check
**Description:** Ensure CDN scripts are of type `text/javascript` or `module`.
```javascript
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

### Modify 43: Implement CDN Script De-duplication
**Description:** Prevent the same CDN script from being loaded twice.
```javascript
// CDN script can appear multiple times
```

### Modify 44: Add CDN Security Headers Check
**Description:** Verify CDN responses include security headers.
```javascript
// No security header verification
```

### Modify 45: Create CDN Script Migration Plan
**Description:** Document steps to migrate from one CDN provider to another.
```javascript
// No migration documentation
```

### Modify 46: Implement CDN Component Dynamic Import
**Description:** Dynamically import CDN components only when needed.
```javascript
// CDN components loaded eagerly
```

### Modify 47: Add CDN Script Bundle Analysis
**Description:** Analyze CDN bundle sizes and optimize.
```javascript
// No bundle size analysis
```

### Modify 48: Implement CDN Script Priority Hints
**Description:** Add `importance` attribute to prioritize CDN script loading.
```javascript
<script src="https://cdn.example.com/critical.js" importance="high"></script>
```

### Modify 49: Add CDN Script Reload Capability
**Description:** Add ability to reload CDN scripts that fail to load initially.
```javascript
// No reload capability
```

### Modify 50: Create CDN Script A/B Testing
**Description:** A/B test different CDN library versions.
```javascript
// No CDN A/B testing
```
