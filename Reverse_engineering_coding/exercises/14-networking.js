import { test, assert } from './runner.js';
import crypto from 'crypto';

// Module 14 — Networking, HTTP, REST, Security

test('URL: parsing query parameters', () => {
  const url = new URL('http://api.example.com/users?page=2&limit=10');
  assert.equal(url.searchParams.get('page'), '2');
  assert.equal(url.searchParams.get('limit'), '10');
});

test('URL: building URL with search params', () => {
  const url = new URL('http://api.example.com/search');
  url.searchParams.set('q', 'nodejs');
  url.searchParams.set('sort', 'desc');
  assert.equal(url.href, 'http://api.example.com/search?q=nodejs&sort=desc');
});

test('HTTP: status code classification', () => {
  const classify = (code) => {
    if (code < 200) return 'informational';
    if (code < 300) return 'success';
    if (code < 400) return 'redirect';
    if (code < 500) return 'client error';
    return 'server error';
  };
  assert.equal(classify(200), 'success');
  assert.equal(classify(301), 'redirect');
  assert.equal(classify(404), 'client error');
  assert.equal(classify(500), 'server error');
});

test('HTTP: common status code meanings', () => {
  const meanings = {
    200: 'OK', 201: 'Created', 204: 'No Content',
    301: 'Moved Permanently', 304: 'Not Modified',
    400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden',
    404: 'Not Found', 409: 'Conflict', 429: 'Too Many Requests',
    500: 'Internal Server Error', 502: 'Bad Gateway', 503: 'Service Unavailable'
  };
  assert.equal(meanings[200], 'OK');
  assert.equal(meanings[404], 'Not Found');
  assert.equal(meanings[429], 'Too Many Requests');
  assert.equal(meanings[503], 'Service Unavailable');
});

test('Base64: encoding and decoding (JWT-like)', () => {
  const payload = { sub: '123', name: 'Alice' };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const decoded = JSON.parse(Buffer.from(encoded, 'base64url').toString());
  assert.deepEqual(decoded, payload);
});

test('CORS: origin matching — same origin', () => {
  const isSameOrigin = (a, b) => {
    const ua = new URL(a);
    const ub = new URL(b);
    return ua.origin === ub.origin;
  };
  assert.ok(isSameOrigin('https://example.com/page1', 'https://example.com/page2'));
  assert.ok(!isSameOrigin('https://example.com', 'https://evil.com'));
});

test('Rate limiting: fixed window algorithm', () => {
  class FixedWindowRateLimiter {
    constructor(max, windowMs) {
      this.max = max;
      this.windowMs = windowMs;
      this.windows = new Map();
    }
    check(key) {
      const now = Date.now();
      const entry = this.windows.get(key);
      if (!entry || now - entry.start > this.windowMs) {
        this.windows.set(key, { start: now, count: 1 });
        return true;
      }
      if (entry.count >= this.max) return false;
      entry.count++;
      return true;
    }
  }
  const limiter = new FixedWindowRateLimiter(3, 1000);
  assert.ok(limiter.check('a'));
  assert.ok(limiter.check('a'));
  assert.ok(limiter.check('a'));
  assert.ok(!limiter.check('a'));
  assert.ok(limiter.check('b')); // different key
});

test('CSRF: token generation and validation', () => {
  const token = crypto.randomUUID();
  const validToken = (received, expected) => received === expected;
  assert.ok(validToken(token, token));
  assert.ok(!validToken(token, 'fake-token'));
});

test('Pagination: offset calculation', () => {
  const paginate = (page, limit) => ({
    offset: (page - 1) * limit,
    limit
  });
  assert.deepEqual(paginate(1, 20), { offset: 0, limit: 20 });
  assert.deepEqual(paginate(3, 10), { offset: 20, limit: 10 });
});

test('Pagination: cursor-based — decode next cursor', () => {
  const encodeCursor = (id) => Buffer.from(JSON.stringify({ id })).toString('base64url');
  const decodeCursor = (cursor) => JSON.parse(Buffer.from(cursor, 'base64url').toString());
  const cursor = encodeCursor(100);
  assert.deepEqual(decodeCursor(cursor), { id: 100 });
});

test('Cookie: parsing from header string', () => {
  const parseCookies = (header) => {
    const cookies = {};
    header.split(';').forEach(pair => {
      const [key, ...rest] = pair.trim().split('=');
      cookies[key] = rest.join('=');
    });
    return cookies;
  };
  const cookies = parseCookies('session=abc123; theme=dark');
  assert.equal(cookies.session, 'abc123');
  assert.equal(cookies.theme, 'dark');
});

test('Cookie: serialization with attributes', () => {
  const serialize = (name, val, opts = {}) => {
    let cookie = `${name}=${val}`;
    if (opts.httpOnly) cookie += '; HttpOnly';
    if (opts.secure) cookie += '; Secure';
    if (opts.sameSite) cookie += `; SameSite=${opts.sameSite}`;
    if (opts.maxAge) cookie += `; Max-Age=${opts.maxAge}`;
    return cookie;
  };
  const c = serialize('session', 'abc', { httpOnly: true, secure: true, sameSite: 'Lax' });
  assert.ok(c.includes('HttpOnly'));
  assert.ok(c.includes('Secure'));
  assert.ok(c.includes('SameSite=Lax'));
});

test('Security: input sanitization prevents XSS', () => {
  const escapeHtml = (str) => {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };
  assert.equal(escapeHtml('<script>alert(1)</script>'),
    '&lt;script&gt;alert(1)&lt;/script&gt;');
  assert.equal(escapeHtml('hello & welcome'), 'hello &amp; welcome');
});

test('Security: password hashing with scrypt', async () => {
  const password = 'mypassword';
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  const verify = (input) => {
    const h = crypto.scryptSync(input, salt, 64).toString('hex');
    return h === hash;
  };
  assert.ok(verify('mypassword'));
  assert.ok(!verify('wrong'));
});

test('JSON: serialization handles edge cases', () => {
  assert.equal(JSON.stringify({ a: undefined }), '{}');
  assert.equal(JSON.stringify([1, undefined, 2]), '[1,null,2]');
  assert.equal(JSON.stringify({ a: NaN }), '{"a":null}');
  assert.equal(JSON.stringify({ a: Infinity }), '{"a":null}');
});

test('Cache key: building from request parameters', () => {
  const cacheKey = (method, url, body) => {
    const key = `${method}:${url}`;
    return body ? `${key}:${JSON.stringify(body)}` : key;
  };
  assert.equal(cacheKey('GET', '/api/users'), 'GET:/api/users');
  assert.equal(cacheKey('POST', '/api/users', { name: 'Alice' }),
    'POST:/api/users:{"name":"Alice"}');
});
