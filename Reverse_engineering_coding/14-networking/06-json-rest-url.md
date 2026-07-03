# 6. JSON, REST API Design, and URL Structure

## JSON in APIs

### Why JSON Dominates

- **Language-agnostic**: every language can parse it.
- **Human-readable**: unlike binary formats.
- **Lightweight**: less verbose than XML.
- **Native to JavaScript**: `JSON.parse()` and `JSON.stringify()`.

### Serialization

```javascript
const user = { name: 'Alice', age: 30, role: 'admin' };
const json = JSON.stringify(user);
// '{"name":"Alice","age":30,"role":"admin"}'

const parsed = JSON.parse(json);
// { name: 'Alice', age: 30, role: 'admin' }
```

### What JSON Cannot Represent

| JS Type | JSON Behavior |
|---------|---------------|
| `undefined` | Omitted in objects, becomes `null` in arrays |
| `function` | Omitted |
| `Symbol` | Omitted |
| `Date` | Converted to string (must parse manually) |
| `Map`, `Set` | No native representation |
| `BigInt` | Throws (must serialize as string) |

### Custom Serialization and Reviver

```javascript
const user = {
    name: 'Alice',
    password: 'secret',
    toJSON() {
        return { name: this.name };
    }
};

JSON.parse(json, (key, value) => {
    if (key === 'birth') return new Date(value);
    return value;
});
```

## REST Architecture

### Resources

```
GET    /users          → List users (READ)
GET    /users/5        → Get user 5 (READ)
POST   /users          → Create user (CREATE)
PUT    /users/5        → Replace user 5 (UPDATE)
PATCH  /users/5        → Partially update user 5 (UPDATE)
DELETE /users/5        → Delete user 5 (DELETE)
```

### REST Constraints

| Constraint | Description |
|------------|-------------|
| **Stateless** | Each request contains all necessary information |
| **Cacheable** | Responses must define cacheability |
| **Uniform Interface** | Resources identified in URLs, manipulated via representations |
| **Layered System** | Client cannot tell if talking directly to server or proxy |

### Naming Conventions

| ✅ Good | ❌ Bad |
|---------|--------|
| `GET /users` | `GET /getUsers` |
| `GET /users/5` | `GET /getUser?id=5` |
| `POST /users` | `POST /createUser` |

## Anatomy of a URL

```
https://admin:secret@api.example.com:443/users?id=10&active=true#profile
  │      │      │      │                  │   │                 │
  │      │      │      │                  │   │                 └── Fragment
  │      │      │      │                  │   └──── Query string
  │      │      │      │                  └──────── Port
  │      │      │      └───────────────────────────── Host
  │      │      └──────────────────────────────────── Password
  │      └─────────────────────────────────────────── Username
  └────────────────────────────────────────────────── Scheme
```

### URL Parsing in Node

```javascript
const url = new URL('https://api.example.com:443/users?id=10&active=true');

console.log(url.protocol);    // 'https:'
console.log(url.hostname);    // 'api.example.com'
console.log(url.pathname);    // '/users'
console.log(url.searchParams.get('id')); // '10'

// Encoding
const encoded = encodeURIComponent('hello world & more');
// 'hello%20world%20%26%20more'
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which resource is being accessed? | The URL path identifies the resource |
| Which operation? | HTTP method specifies the action |
| RESTful naming? | Plural nouns, no verbs in URLs |
## Next Steps

[Back to Chapter 5](05-http-status-headers-body.md): 5. HTTP Status Codes, Headers, and Request Body
[Proceed to Chapter 7](07-cookies-sessions.md): 7. HTTP Cookies and Server-Side Sessions to learn about 7. http cookies and server-side sessions.
