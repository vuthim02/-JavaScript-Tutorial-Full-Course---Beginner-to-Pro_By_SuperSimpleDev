# 10. OAuth 2.0 — Delegated Authorization

## What OAuth Solves

Before OAuth: You give your Google password to third-party apps. If the app is compromised, your Google account is compromised.

With OAuth: You authorize the app to access specific data without sharing your password.

## OAuth Roles

| Role | Example |
|------|---------|
| **Resource Owner** | You (the user) |
| **Client** | Third-party app (e.g., "My Notes App") |
| **Authorization Server** | Google's OAuth server |
| **Resource Server** | Google's API (e.g., Google Drive) |

## OAuth Flow (Authorization Code)

```
1. User clicks "Login with Google"
2. App redirects to Google:
   https://accounts.google.com/o/oauth2/auth?
     client_id=APP_ID&
     redirect_uri=https://myapp.com/callback&
     response_type=code&
     scope=email%20profile

3. User logs into Google, grants permissions
4. Google redirects back to app with code:
   https://myapp.com/callback?code=AUTH_CODE

5. App sends code to Google's token endpoint:
   POST https://oauth2.googleapis.com/token
   { code: AUTH_CODE, client_id, client_secret, redirect_uri }

6. Google returns:
   { access_token: "...", refresh_token: "...", expires_in: 3600 }

7. App uses access_token to call Google APIs:
   GET https://www.googleapis.com/oauth2/v2/userinfo
   Authorization: Bearer ACCESS_TOKEN
```

## OAuth in Node with Passport

```javascript
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return done(err, user);
    });
}));

// Routes
app.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));
```

## OpenID Connect

OpenID Connect (OIDC) is an identity layer built on top of OAuth 2.0. While OAuth 2.0 is about **authorization** (accessing resources), OIDC adds **authentication** (verifying identity). It adds an `id_token` (a JWT) that contains user identity information.

```
OAuth 2.0: "App can access my Google Drive files"
OIDC:      "App knows I am user@example.com"
```

## OAuth Grant Types

| Grant Type | Use Case |
|-----------|----------|
| **Authorization Code** | Server-side web apps (most secure) |
| **Implicit** (deprecated) | Single-page apps (use PKCE instead) |
| **Client Credentials** | Server-to-server communication |
| **Resource Owner Password** | Legacy apps (avoid) |
| **Device Code** | Smart TVs, CLI tools |

## OAuth with PKCE (Proof Key for Code Exchange)

For mobile and single-page apps, PKCE adds extra security:

```
1. Client generates `code_verifier` (random string) and `code_challenge` (SHA-256 hash)
2. Authorization request includes `code_challenge`
3. Token request includes `code_verifier`
4. Server verifies the verifier matches the challenge
```

This prevents authorization code interception attacks.

## Token Types

| Token | Purpose | Lifetime |
|-------|---------|----------|
| `access_token` | Call resource server APIs | Short (15-60 min) |
| `refresh_token` | Get new access tokens | Long (days/weeks) |
| `id_token` (OIDC) | User identity (JWT) | Short |

## OAuth Scopes

Scopes define what the application can do:

```
scope=email            → Read email address
scope=profile          → Read name, picture
scope=openid           → Required for OIDC
scope=https://www.googleapis.com/auth/drive.file → Access specific Drive files
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this app storing passwords? | If it uses OAuth, no — Google handles auth |
| Which scopes are requested? | Determines what data the app can access |
| OAuth or OIDC? | OAuth: delegated access. OIDC: identity verification |
| Is the token stored securely? | Should be HttpOnly cookie or encrypted |
| Which grant type? | Auth Code for server apps, PKCE for SPAs, Client Credentials for APIs |
## Next Steps

[Back to Chapter 9](09-authentication-authorization.md): 9. Authentication, Authorization, and Password Security
[Proceed to Chapter 11](11-cors-tls.md): 11. CORS and HTTPS/TLS to learn about 11. cors and https/tls.
