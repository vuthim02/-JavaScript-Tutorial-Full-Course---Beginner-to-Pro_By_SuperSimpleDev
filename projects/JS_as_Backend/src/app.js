import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  createUser,
  deleteUser,
  findUserByEmail,
  findUserById,
  getUsers,
  updateUser,
} from './store.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const jwtSecret = process.env.JWT_SECRET || 'change-this-secret';

app.use(cors());
app.use(express.json());

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    jwtSecret,
    { expiresIn: '7d' }
  );
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Missing bearer token' });
  }

  try {
    req.user = jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  const { password, ...safeUser } = user;
  return safeUser;
}

app.get('/', (_req, res) => {
  res.json({
    message: 'JavaScript-only backend is running',
    endpoints: [
      'GET /health',
      'POST /api/register',
      'POST /api/login',
      'GET /api/me',
      'GET /api/users',
      'GET /api/users/:id',
      'PATCH /api/users/:id',
      'DELETE /api/users/:id',
    ],
  });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email, and password are required' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await createUser({ username, email, passwordHash });
    const token = signToken(user);

    return res.status(201).json({
      message: 'Registration successful',
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    if (error.message === 'EMAIL_EXISTS') {
      return res.status(409).json({ message: 'Email already exists' });
    }

    return res.status(500).json({ message: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    return res.json({
      message: 'Login successful',
      token: signToken(user),
      user: sanitizeUser(user),
    });
  } catch {
    return res.status(500).json({ message: 'Login failed' });
  }
});

app.get('/api/me', requireAuth, async (req, res) => {
  const user = await findUserById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({ user: sanitizeUser(user) });
});

app.get('/api/users', requireAuth, async (_req, res) => {
  const users = await getUsers();
  return res.json({ users: users.map(sanitizeUser) });
});

app.get('/api/users/:id', requireAuth, async (req, res) => {
  const user = await findUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({ user: sanitizeUser(user) });
});

app.patch('/api/users/:id', requireAuth, async (req, res) => {
  const currentUserId = Number(req.user.id);
  const targetUserId = Number(req.params.id);

  if (currentUserId !== targetUserId) {
    return res.status(403).json({ message: 'You can only update your own account' });
  }

  const changes = {};
  if (typeof req.body.username === 'string' && req.body.username.trim()) {
    changes.username = req.body.username.trim();
  }

  if (typeof req.body.email === 'string' && req.body.email.trim()) {
    changes.email = req.body.email.trim().toLowerCase();
  }

  const updatedUser = await updateUser(req.params.id, changes);

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({ message: 'User updated', user: sanitizeUser(updatedUser) });
});

app.delete('/api/users/:id', requireAuth, async (req, res) => {
  const currentUserId = Number(req.user.id);
  const targetUserId = Number(req.params.id);

  if (currentUserId !== targetUserId) {
    return res.status(403).json({ message: 'You can only delete your own account' });
  }

  const deleted = await deleteUser(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({ message: 'User deleted' });
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
export { requireAuth, sanitizeUser, signToken };
export const startServer = () => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};
