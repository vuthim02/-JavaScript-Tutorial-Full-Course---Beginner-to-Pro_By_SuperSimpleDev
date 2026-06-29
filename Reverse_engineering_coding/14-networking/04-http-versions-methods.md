# 4. HTTP Protocol Versions and Methods

<img src="https://media.giphy.com/media/UcK7JalnjCz0k/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What is HTTP?

**HyperText Transfer Protocol**. Runs on top of TCP (usually port 80) or TLS (port 443).

```
Request:
GET /users HTTP/1.1
Host: api.example.com
Accept: application/json

Response:
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 42

{"users":[{"id":1,"name":"Alice"}]}
```

## HTTP Versions

| Version | Year | Key Feature |
|---------|------|-------------|
| HTTP/1.0 | 1996 | One request per TCP connection |
| HTTP/1.1 | 1997 | Persistent connections, pipelining, chunked transfer |
| HTTP/2 | 2015 | Multiplexing, header compression, server push |
| HTTP/3 | 2022 | Uses QUIC (UDP-based), faster connection setup |

## HTTP/1.1 vs HTTP/2

```
HTTP/1.1: One at a time (or pipelining, limited)
┌────────┐
│ Req 1  │────► Resp 1
│ Req 2  │────► Resp 2   (waiting for 1)
│ Req 3  │────► Resp 3   (waiting for 2)
└────────┘

HTTP/2: Multiplexed
┌────────┐
│ Req 1  │─┐
│ Req 2  │─┤────► Resp 1, Resp 2, Resp 3 simultaneously
│ Req 3  │─┘
└────────┘
```

## HTTP Methods

| Method | CRUD | Idempotent? | Safe? | Has Body? |
|--------|------|-------------|-------|-----------|
| `GET` | Read | ✅ Yes | ✅ Yes | ❌ No |
| `POST` | Create | ❌ No | ❌ No | ✅ Yes |
| `PUT` | Replace | ✅ Yes | ❌ No | ✅ Yes |
| `PATCH` | Partial update | ❌ No | ❌ No | ✅ Yes |
| `DELETE` | Delete | ✅ Yes | ❌ No | ❌ Maybe |
| `HEAD` | Headers only | ✅ Yes | ✅ Yes | ❌ No |
| `OPTIONS` | Capabilities | ✅ Yes | ✅ Yes | ❌ No |

## Idempotence Explained

```javascript
// Idempotent: calling N times = same as calling once
PUT /users/5
DELETE /users/5

// Not idempotent: each call creates a new resource
POST /users
```

## Safe Methods

Safe methods should not change server state:

```javascript
// Safe: only reads data
app.get('/users', handler);

// Unsafe: changes state
app.post('/users', handler);
```

## HTTP/2 Binary Framing

HTTP/2 breaks messages into binary frames, allowing multiplexing:

```
HTTP/1.1:                   HTTP/2:
GET /index.html             HEADERS frame (stream 1)
GET /style.css              HEADERS frame (stream 3)
GET /script.js              HEADERS frame (stream 5)
                            DATA frame (stream 5)
                            DATA frame (stream 1)
                            DATA frame (stream 3)
```

All streams share one TCP connection, eliminating head-of-line blocking.

## HTTP/3 and QUIC

HTTP/3 uses QUIC, which runs over UDP instead of TCP:

| Feature | HTTP/2 (TCP) | HTTP/3 (QUIC) |
|---------|-------------|---------------|
| Transport | TCP | UDP |
| Connection setup | 2-3 RTT (TCP + TLS) | 0-1 RTT |
| Head-of-line blocking | TCP-level (packet loss blocks all streams) | Per-stream only |
| Connection migration | No (breaks on IP change) | Yes (connection ID) |

## HTTP Method Safety and Idempotence Quick Reference

```
GET     → Safe + Idempotent
HEAD    → Safe + Idempotent
OPTIONS → Safe + Idempotent
PUT     → Idempotent
DELETE  → Idempotent
POST    → Neither safe nor idempotent
PATCH   → Neither safe nor idempotent
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which HTTP version? | Check request line. HTTP/2 is binary, HTTP/1.1 is text |
| Which method? | GET = read, POST = create, PUT = replace, PATCH = partial, DELETE = remove |
| Idempotent? | PUT/DELETE are idempotent. POST is not |
| Safe? | GET/HEAD/OPTIONS are safe (no side effects) |
| Connection reuse? | HTTP/1.1+ allows persistent connections |
## Next Steps

[Back to Chapter 3](03-tcp-udp.md): 3. Transmission Control Protocol (TCP) and UDP
[Proceed to Chapter 5](05-http-status-headers-body.md): 5. HTTP Status Codes, Headers, and Request Body to learn about 5. http status codes, headers, and request body.
