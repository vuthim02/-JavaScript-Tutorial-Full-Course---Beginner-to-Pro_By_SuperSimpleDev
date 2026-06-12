/**
 * PART 16 — Express.js server with middleware, routes, error handling
 * Run with: npm install express && node part16-express-server.js
 * Test: curl http://localhost:3000/
 *       curl http://localhost:3000/api/users
 *       curl http://localhost:4000/ (404 test)
 */

const express = require('express');

// ---------------------------------------------------------------
// 1. Create Express app
// ---------------------------------------------------------------

const app = express();
const PORT = 3000;

// ---------------------------------------------------------------
// 2. Application-level middleware
// ---------------------------------------------------------------

// Built-in JSON body parser
app.use(express.json());

// Custom logger middleware — logs every request
app.use((req, res, next) => {
  const start = Date.now();
  // After the response finishes, log the details
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// CORS middleware — allow all origins (for development)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

// ---------------------------------------------------------------
// 3. In-memory data store
// ---------------------------------------------------------------

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

let nextId = 4;

// ---------------------------------------------------------------
// 4. Route handlers
// ---------------------------------------------------------------

// GET / — root
app.get('/', (req, res) => {
  res.json({
    message: 'Express.js Server',
    version: '1.0.0',
    routes: ['GET /', 'GET /api/users', 'GET /api/users/:id', 'POST /api/users', 'PUT /api/users/:id', 'DELETE /api/users/:id'],
  });
});

// GET /api/users — list all users
app.get('/api/users', (req, res) => {
  // Support query parameter filtering
  const { name, email } = req.query;
  let result = users;

  if (name) {
    result = result.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (email) {
    result = result.filter(u => u.email.toLowerCase().includes(email.toLowerCase()));
  }

  res.json(result);
});

// GET /api/users/:id — get single user
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

// POST /api/users — create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  // Validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  if (typeof name !== 'string' || typeof email !== 'string') {
    return res.status(400).json({ error: 'Name and email must be strings' });
  }

  const newUser = { id: nextId++, name, email };
  users.push(newUser);

  res.status(201).json(newUser);
});

// PUT /api/users/:id — update user
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { name, email } = req.body;
  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;

  res.json(user);
});

// DELETE /api/users/:id — delete user
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1);
  res.status(204).send();
});

// ---------------------------------------------------------------
// 5. Error handling middleware (must have 4 parameters)
// ---------------------------------------------------------------

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);

  // Log error details (in production, send to error tracking service)
  console.error(err.stack);

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ---------------------------------------------------------------
// 6. 404 handler for unmatched routes (must be after all routes)
// ---------------------------------------------------------------

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    method: req.method,
    path: req.originalUrl,
  });
});

// ---------------------------------------------------------------
// 7. Start server
// ---------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
  console.log('Try:');
  console.log('  curl http://localhost:3000/');
  console.log('  curl http://localhost:3000/api/users');
  console.log('  curl -X POST -H "Content-Type: application/json" -d \'{"name":"Diana","email":"diana@example.com"}\' http://localhost:3000/api/users');
});
