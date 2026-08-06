# Module 29: Security Basics

**Duration:** ~35 minutes  
**Additional Content:** Not covered in original video

## Learning Objectives

- Understand common web security threats
- Prevent Cross-Site Scripting (XSS)
- Prevent Cross-Site Request Forgery (CSRF)
- Implement Content Security Policy
- Follow secure coding practices

## Common Security Threats

### 1. Cross-Site Scripting (XSS)

Attackers inject malicious scripts into web pages.

```javascript
// Dangerous: User input rendered as HTML
element.innerHTML = userInput;  // XSS vulnerability!

// Example attack
const maliciousInput = '<img src=x onerror="alert(\'Hacked!\')">';
element.innerHTML = maliciousInput;  // Executes malicious code!
```

### 2. Cross-Site Request Forgery (CSRF)

Attackers trick users into performing unwanted actions.

### 3. SQL Injection

Attackers manipulate database queries through input.

### 4. Clickjacking

Attackers overlay invisible elements to trick clicks.

## Preventing XSS

### Escape User Input

```javascript
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Use textContent instead of innerHTML
element.textContent = userInput;  // Safe
element.innerHTML = escapeHtml(userInput);  // Also safe
```

### Content Security Policy

```html
<!-- Add to HTML head -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' https://trusted.cdn.com">
```

### Sanitize HTML

```javascript
function sanitizeHTML(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  
  // Remove script tags
  doc.querySelectorAll('script').forEach(el => el.remove());
  
  // Remove event handlers
  doc.querySelectorAll('*').forEach(el => {
    Array.from(el.attributes).forEach(attr => {
      if (attr.name.startsWith('on')) {
        el.removeAttribute(attr.name);
      }
    });
  });
  
  return doc.body.innerHTML;
}
```

### Use Safe Methods

```javascript
// Safe: textContent
element.textContent = userInput;

// Safe: createElement
const el = document.createElement('div');
el.textContent = userInput;
document.body.appendChild(el);

// Unsafe: innerHTML
element.innerHTML = userInput;  // Don't do this!

// Unsafe: document.write
document.write(userInput);  // Don't do this!
```

## Preventing CSRF

### Use CSRF Tokens

```javascript
// Server generates token
const csrfToken = generateToken();

// Include in forms
form.innerHTML += `<input type="hidden" name="_csrf" value="${csrfToken}">`;

// Validate on server
if (req.body._csrf !== session.csrfToken) {
  return res.status(403).send('Invalid CSRF token');
}
```

### SameSite Cookies

```javascript
// Set cookie with SameSite attribute
document.cookie = "sessionId=abc123; SameSite=Strict; Secure; HttpOnly";
```

### Verify Origin Headers

```javascript
// Check origin on server
app.post('/api/transfer', (req, res) => {
  const origin = req.headers.origin;
  if (origin !== 'https://myapp.com') {
    return res.status(403).send('Invalid origin');
  }
  // Process request
});
```

## Secure Input Handling

### Validate All Input

```javascript
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateNumber(input) {
  return !isNaN(input) && isFinite(input);
}

// Always validate on server too!
```

### Parameterized Queries

```javascript
// Never do this (SQL injection risk)
const query = `SELECT * FROM users WHERE id = ${userId}`;

// Do this (parameterized)
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
```

### Rate Limiting

```javascript
const rateLimit = new Map();

function checkRateLimit(ip, limit = 100, windowMs = 60000) {
  const now = Date.now();
  const record = rateLimit.get(ip) || { count: 0, resetTime: now + windowMs };
  
  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }
  
  record.count++;
  rateLimit.set(ip, record);
  
  return record.count <= limit;
}

// Usage
app.use((req, res, next) => {
  if (!checkRateLimit(req.ip)) {
    return res.status(429).send('Too many requests');
  }
  next();
});
```

## Secure Authentication

### Password Hashing

```javascript
// Never store plain text passwords!
// Use bcrypt or argon2

const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
```

### JWT Security

```javascript
// Generate JWT
const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

// Verify JWT
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}
```

## HTTPS and Security Headers

### Always Use HTTPS

```javascript
// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});
```

### Security Headers

```javascript
const helmet = require('helmet');
app.use(helmet());

// Or manually set headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});
```

## Best Practices Checklist

```javascript
// ✅ DO
// - Validate all user input
// - Escape output
// - Use parameterized queries
// - Hash passwords
// - Use HTTPS
// - Set security headers
// - Implement rate limiting
// - Use CSRF tokens

// ❌ DON'T
// - Trust user input
// - Use innerHTML with user data
// - Store plain text passwords
// - Expose sensitive data in URLs
// - Skip input validation
// - Use weak passwords
// - Hardcode secrets in code
```

## Practice Exercises

### Exercise 29.1: Input Sanitizer
Create a function that sanitizes user input for HTML display.

### Exercise 29.2: Secure Form Handler
Build a form handler with CSRF protection and input validation.

### Exercise 29.3: Password Validator
Implement a password strength checker following security guidelines.

## Summary

- XSS: Never use innerHTML with user input
- CSRF: Use tokens and SameSite cookies
- Always validate and sanitize input
- Use parameterized queries for SQL
- Hash passwords with bcrypt
- Implement rate limiting
- Use HTTPS everywhere
- Set security headers

## Previous

[Proceed to Module 28](../28-performance-memory/README.md)

## Next Steps

[Proceed to Module 30](../30-web-apis/README.md): Web APIs to learn about modern browser APIs.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)
