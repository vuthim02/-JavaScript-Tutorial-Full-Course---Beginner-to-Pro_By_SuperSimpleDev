# 9. Authentication, Authorization, and Password Security

## Authentication — Who are you?

```javascript
function authenticate(req, res, next) {
    // Verify credentials (password, token, biometric)
    // If valid → set req.user
    // If invalid → 401 Unauthorized
}
```

**Methods**: Password, OTP, OAuth (Google, GitHub), JWT, Session cookie, API key, Biometric

## Authorization — What are you allowed to do?

```javascript
function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
}

app.delete('/users/:id', authenticate, authorize('admin'), (req, res) => {
    // Only admin can delete users
});
```

### Role-Based Access Control (RBAC)

```javascript
const roles = {
    admin: ['read:users', 'create:users', 'delete:users', 'read:reports'],
    editor: ['read:users', 'create:users'],
    viewer: ['read:users']
};

function authorizePermission(permission) {
    return (req, res, next) => {
        const userPermissions = roles[req.user.role];
        if (!userPermissions?.includes(permission)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        next();
    };
}

app.delete('/users/:id', authenticate, authorizePermission('delete:users'), handler);
```

## Password Security

### Never Do This

```javascript
// BAD: Plain text
db.users.insert({ username: 'alice', password: 'password123' });
```

### Hash + Salt with bcrypt

```javascript
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

async function hashPassword(password) {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return hash;
}

async function verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
}

app.post('/register', async (req, res) => {
    const hash = await hashPassword(req.body.password);
    await db.users.insert({ username: req.body.username, passwordHash: hash });
    res.status(201).json({ message: 'User created' });
});

app.post('/login', async (req, res) => {
    const user = await db.users.findOne({ username: req.body.username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await verifyPassword(req.body.password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    // Create session/JWT
});
```

### Password Hashing Algorithms

| Algorithm | Recommended? |
|-----------|--------------|
| **bcrypt** | ✅ Yes (slow by design) |
| **argon2** | ✅ Yes (winner of PHC, most secure) |
| **scrypt** | ✅ Yes (memory-hard) |
| **PBKDF2** | ⚠️ Okay but weaker |
| **SHA-256** | ❌ No (too fast) |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Session or JWT? | Session: server state. JWT: client state |
| Cookie or Authorization header? | Cookie: automatic. Authorization: explicit |
| Is password reversible? | No — hashes are one-way |
| Is salt used? | Prevents rainbow table attacks |
## Next Steps

[Back to Chapter 8](08-jwt.md): 8. JWT — JSON Web Tokens
[Proceed to Chapter 10](10-oauth.md): 10. OAuth 2.0 — Delegated Authorization to learn about 10. oauth 2.0 — delegated authorization.
