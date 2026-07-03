# CORS (Cross-Origin Resource Sharing)

## The Same-Origin Policy

Browsers block JavaScript from making requests to a different origin (protocol + domain + port).

```
Same origin:     https://example.com/page1  and  https://example.com/api
Different origin: https://example.com  and  https://api.example.com
Different origin: https://example.com  and  http://example.com (different protocol)
Different origin: https://example.com  and  https://example.com:8080 (different port)
```

## Why CORS Exists

Prevents malicious websites from reading data from other sites using the user's credentials.

```
Without CORS:
  evil.com → fetch("https://bank.com/api/balance") → reads user's bank data ❌

With CORS:
  evil.com → fetch("https://bank.com/api/balance") → blocked ❌
  myapp.com → fetch("https://api.myapp.com/data") → allowed (with CORS headers) ✅
```

## How CORS Works (Preflight)

For "non-simple" requests, the browser sends a preflight OPTIONS request first:

```
Browser → Server:  OPTIONS /api/data
                    Origin: https://myapp.com
                    Access-Control-Request-Method: POST
                    Access-Control-Request-Headers: Content-Type, Authorization

Server → Browser:  Access-Control-Allow-Origin: https://myapp.com
                    Access-Control-Allow-Methods: GET, POST, PUT, DELETE
                    Access-Control-Allow-Headers: Content-Type, Authorization
                    Access-Control-Max-Age: 86400
```

## CORS Headers

| Header | Purpose |
|--------|---------|
| `Access-Control-Allow-Origin` | Which origins are allowed (`*` for any) |
| `Access-Control-Allow-Methods` | Which HTTP methods are allowed |
| `Access-Control-Allow-Headers` | Which custom headers are allowed |
| `Access-Control-Allow-Credentials` | Allow cookies/auth headers |
| `Access-Control-Expose-Headers` | Which headers JS can access |
| `Access-Control-Max-Age` | Cache preflight response (seconds) |

## Simple vs Preflight Requests

**Simple request** (no preflight needed):
- Method: GET, HEAD, or POST
- Only simple headers: Accept, Accept-Language, Content-Language, Content-Type
- Content-Type: application/x-www-form-urlencoded, multipart/form-data, or text/plain

**Preflight required**:
- Method: PUT, DELETE, PATCH
- Custom headers: Authorization, X-Custom-Header
- Content-Type: application/json, application/xml

## Credentials (Cookies, Auth)

```javascript
// To send cookies/auth with cross-origin request:
fetch("https://api.example.com/data", {
    credentials: "include"   // Send cookies
});

// Server must respond with:
// Access-Control-Allow-Credentials: true
// Access-Control-Allow-Origin: https://myapp.com (NOT "*")
```

## CORS Errors

```
Access to fetch at 'https://api.example.com/data' from origin
'https://myapp.com' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present
```

## Debugging CORS

```javascript
// Check DevTools Console for CORS errors
// Check Network tab → Response Headers for CORS headers

// Check if CORS is the issue:
fetch("https://api.example.com/data", {
    mode: "no-cors"  // Bypasses CORS (but response is opaque, cannot read)
});
```

## Server-Side CORS Configuration (Express Example)

```javascript
const express = require("express");
const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://myapp.com");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);  // Respond to preflight
    }

    next();
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why is this request blocked? | CORS error in console — missing `Access-Control-Allow-Origin` header. |
| Is CORS configured correctly? | Check server response headers for `Access-Control-Allow-Origin`. |
| Is it a simple or preflight request? | Check for OPTIONS request before the actual request. |
| Are credentials being sent? | Check if `credentials: "include"` is used. |
| How to fix CORS in development? | Use a proxy (Vite proxy, webpack-dev-server proxy) or CORS extension. |
## Next Steps

[Back to Chapter 39](39-web-components.md): Web Components
[Proceed to Chapter 41](41-indexeddb.md): IndexedDB to learn about indexeddb.
