# Chapter 8 — Authentication

## JWT Authentication Middleware

```javascript
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
            error: { code: 'UNAUTHORIZED', message: 'Missing or invalid token' }
        });
    }

    const token = authHeader.slice(7);

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: { code: 'TOKEN_EXPIRED', message: 'Token has expired' }
            });
        }
        return res.status(401).json({
            error: { code: 'INVALID_TOKEN', message: 'Invalid token' }
        });
    }
}

module.exports = authenticate;
```

## Session Authentication Middleware

```javascript
const sessionStore = require('../services/sessionStore');

function authenticateSession(req, res, next) {
    const sessionId = req.cookies?.sessionId;

    if (!sessionId) {
        return res.status(401).json({
            error: { code: 'UNAUTHORIZED', message: 'Not logged in' }
        });
    }

    const session = sessionStore.get(sessionId);
    if (!session) {
        return res.status(401).json({
            error: { code: 'SESSION_EXPIRED', message: 'Session expired' }
        });
    }

    if (session.expiresAt < Date.now()) {
        sessionStore.delete(sessionId);
        return res.status(401).json({
            error: { code: 'SESSION_EXPIRED', message: 'Session expired' }
        });
    }

    req.user = session.user;
    next();
}
```

## API Key Authentication

```javascript
function authenticateApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({
            error: { code: 'MISSING_API_KEY', message: 'API key required' }
        });
    }

    const client = apiKeys.get(apiKey);

    if (!client) {
        return res.status(403).json({
            error: { code: 'INVALID_API_KEY', message: 'Invalid API key' }
        });
    }

    req.client = client;
    next();
}
```

## Authentication Flow

```
Login Request (POST /auth/login)
    ↓
Validate credentials (email + password)
    ↓
Create JWT (sign with secret)
    ↓
Return token to client
    ↓
Client stores token (HttpOnly cookie or memory)
    ↓
Subsequent requests include Authorization: Bearer <token>
    ↓
authenticate middleware verifies token
    ↓
Sets req.user
    ↓
Route handler uses req.user
```

## Password Security with bcrypt

```javascript
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

async function hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
}

// Registration
async function register(req, res) {
    const { email, password } = req.body;
    const existing = await User.findByEmail(email);
    if (existing) {
        throw new ValidationError('Email already registered');
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ data: { id: user.id, email: user.email } });
}

// Login
async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) {
        throw new UnauthorizedError('Invalid email or password');
    }
    const valid = await verifyPassword(password, user.password);
    if (!valid) {
        throw new UnauthorizedError('Invalid email or password');
    }
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.json({ data: { token } });
}
```

## Password Policy

```javascript
const passwordSchema = z.object({
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(128, 'Password is too long')
        .regex(/[A-Z]/, 'Must contain uppercase')
        .regex(/[a-z]/, 'Must contain lowercase')
        .regex(/[0-9]/, 'Must contain number')
        .regex(/[^A-Za-z0-9]/, 'Must contain special character')
});

const commonPasswords = new Set(['password', '12345678', 'qwerty123']);
if (commonPasswords.has(password.toLowerCase())) {
    throw new ValidationError('This password is too common');
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which auth method? | JWT: `Authorization: Bearer`, Session: cookies, API Key: `x-api-key` |
| Is authentication in place? | Check for `authenticate` middleware |
| How are passwords stored? | bcrypt hashed (never plaintext) |
| Is password policy enforced? | Check for min length, complexity requirements |
## Next Steps

[Back to Chapter 7](07-validation.md): Chapter 7 — Input Validation
[Proceed to Chapter 9](09-authorization.md): Chapter 9 — Authorization to learn about chapter 9 — authorization.
