/**
 * PART 14 — HTTP Server with routing (no Express, using http module)
 * Run with: node part14-http-server.js
 * Test: curl http://localhost:3000/
 *       curl http://localhost:3000/api/users
 *       curl http://localhost:3000/api/users/1
 */

const http = require('http');

// ---------------------------------------------------------------
// Simple router — maps method+url patterns to handlers
// ---------------------------------------------------------------

const routes = {
  // GET /
  'GET /': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Welcome to the HTTP Server API',
      version: '1.0.0',
      endpoints: ['/', '/api/users', '/api/users/:id'],
    }));
  },

  // GET /api/users — list all users
  'GET /api/users': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  },

  // GET /api/users/:id — get single user
  'GET /api/users/:id': (req, res, params) => {
    const id = parseInt(params.id, 10);
    const user = users.find(u => u.id === id);
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'User not found' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  },

  // POST /api/users — create a user
  'POST /api/users': (req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const newUser = JSON.parse(body);
        newUser.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        users.push(newUser);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  },

  // 404 — fallback
  notFound: (req, res) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Not Found',
      path: req.url,
      method: req.method,
    }));
  },
};

// ---------------------------------------------------------------
// In-memory data store
// ---------------------------------------------------------------

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

// ---------------------------------------------------------------
// URL pattern matching (simple parameter extraction)
// ---------------------------------------------------------------

function matchRoute(method, url, routePattern) {
  const patternParts = routePattern.split('/');
  const urlParts = url.split('/');

  if (patternParts.length !== urlParts.length) return null;

  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      // Extract parameter value
      const paramName = patternParts[i].slice(1);
      params[paramName] = urlParts[i];
    } else if (patternParts[i] !== urlParts[i]) {
      return null; // Mismatch
    }
  }
  return params;
}

// ---------------------------------------------------------------
// Request handler — parses URL, matches route, delegates
// ---------------------------------------------------------------

function handleRequest(req, res) {
  const method = req.method;
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // Try to match a route
  const routeKey = `${method} ${pathname}`;
  const exactRoute = routes[routeKey];

  if (exactRoute) {
    exactRoute(req, res);
    return;
  }

  // Try parameterized routes
  for (const key of Object.keys(routes)) {
    const [routeMethod, routePath] = key.split(' ');
    if (routeMethod !== method) continue;

    const params = matchRoute(method, pathname, routePath);
    if (params) {
      routes[key](req, res, params);
      return;
    }
  }

  // No match — 404
  routes.notFound(req, res);
}

// ---------------------------------------------------------------
// Create and start the server
// ---------------------------------------------------------------

const PORT = 3000;

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`HTTP Server running at http://localhost:${PORT}/`);
  console.log('Available routes:');
  console.log('  GET  /');
  console.log('  GET  /api/users');
  console.log('  GET  /api/users/:id');
  console.log('  POST /api/users');
});
