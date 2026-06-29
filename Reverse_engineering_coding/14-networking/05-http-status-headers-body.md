# 5. HTTP Status Codes, Headers, and Request Body

<img src="https://media.giphy.com/media/UcK7JalnjCz0k/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## 2xx Success

| Code | Name | When |
|------|------|------|
| `200 OK` | Success | GET, PUT, PATCH, DELETE succeeded |
| `201 Created` | Created | POST created a new resource |
| `204 No Content` | Success, no body | DELETE succeeded |

```javascript
res.status(200).json({ data: 'ok' });
res.status(201).json({ id: newId });
res.status(204).send();
```

## 3xx Redirection

| Code | Name | When |
|------|------|------|
| `301 Moved Permanently` | Permanent redirect | SEO, domain change |
| `302 Found` | Temporary redirect | After login, maintenance page |
| `304 Not Modified` | Use cache | Conditional GET (ETag/Last-Modified) |

## 4xx Client Errors

| Code | Name | When |
|------|------|------|
| `400 Bad Request` | Invalid input | Missing field, bad format |
| `401 Unauthorized` | Not authenticated | Missing/invalid token |
| `403 Forbidden` | Not authorized | Valid user, insufficient permissions |
| `404 Not Found` | Resource doesn't exist | Wrong URL |
| `409 Conflict` | Conflict | Duplicate resource, version conflict |
| `422 Unprocessable Entity` | Validation failed | Invalid email, too short password |
| `429 Too Many Requests` | Rate limited | Exceeded rate limit |

## 5xx Server Errors

| Code | Name | When |
|------|------|------|
| `500 Internal Server Error` | Generic server failure | Uncaught exception |
| `502 Bad Gateway` | Upstream invalid response | Proxy received bad response |
| `503 Service Unavailable` | Server overloaded | Maintenance, too many connections |
| `504 Gateway Timeout` | Upstream timeout | Upstream server didn't respond |

## Important HTTP Headers

| Header | Direction | Purpose |
|--------|-----------|---------|
| `Content-Type` | Both | Format of body |
| `Authorization` | Request | Credentials (`Bearer <token>`, `Basic <base64>`) |
| `Cookie` | Request | Stored cookies sent automatically |
| `Set-Cookie` | Response | Server instructs browser to store cookie |
| `Cache-Control` | Both | Caching policy |
| `Origin` | Request | Where request originated (for CORS) |
| `Access-Control-Allow-Origin` | Response | Which origins are allowed |
| `User-Agent` | Request | Client identification |
| `Accept` | Request | Which formats client accepts |
| `ETag` | Response | Version identifier for caching |
| `Location` | Response | Redirect URL (used with 3xx) |

## Request Body Formats

```javascript
// JSON
fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Alice', age: 30 })
});

// URL-encoded form
fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'username=alice&password=secret'
});

// Multipart form data (file uploads)
const formData = new FormData();
formData.append('avatar', fileInput.files[0]);
formData.append('name', 'Alice');
fetch('/api/users', { method: 'POST', body: formData });
```

## Response Headers Reference

```text
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 42
Set-Cookie: sessionId=xyz789; HttpOnly; Secure
Cache-Control: max-age=3600
ETag: "abc123"
Access-Control-Allow-Origin: https://myapp.com
X-Request-Id: req-12345
```

## Status Code Error Handling Example

```javascript
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

app.post('/users', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    if (req.body.password.length < 8) {
        return res.status(422).json({ error: 'Password too short' });
    }
});
```

## Binary and Streaming Body

```javascript
// Binary content types: image/png, video/mp4, audio/mpeg, application/octet-stream

// Server receiving binary data:
app.post('/upload', (req, res) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
        const buffer = Buffer.concat(chunks);
        console.log('Received', buffer.length, 'bytes');
    });
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Client problem (4xx) or server problem (5xx)? | 4xx: fix client. 5xx: fix server |
| Is authentication required (401/403)? | 401: login. 403: insufficient rights |
| What format is the body? | Check `Content-Type` header |
| Is resource missing (404)? | Wrong URL or deleted resource |
## Next Steps

[Back to Chapter 4](04-http-versions-methods.md): 4. HTTP Protocol Versions and Methods
[Proceed to Chapter 6](06-json-rest-url.md): 6. JSON, REST API Design, and URL Structure to learn about 6. json, rest api design, and url structure.
