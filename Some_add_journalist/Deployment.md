# Deployment — Putting Your App on a Real Server

---

## 1. What Is Deployment?

**Deployment** = making your app accessible to other people over the internet.

```
Development:          http://localhost:3000  (only you)
Production:           https://myapp.com      (everyone)
```

To deploy, you need:
- A **server** (someone else's computer running 24/7)
- Your **code** on that server
- **Environment variables** configured
- A **domain** (optional but recommended)

---

## 2. Deployment Platforms (No Ops)

These handle servers, SSL, and domains for you. Best for beginners.

| Platform     | Free Tier?  | Node.js? | Database?       | Deploy Method          |
|--------------|-------------|----------|-----------------|------------------------|
| **Render**   | ✅ Yes      | ✅       | ✅ PostgreSQL   | Connect GitHub repo    |
| **Railway**  | ✅ Yes      | ✅       | ✅ PostgreSQL   | Connect GitHub repo    |
| **Fly.io**   | ✅ Limited  | ✅       | ✅ LiteFS/SQLite| `flyctl launch` CLI    |
| **Vercel**   | ✅ Yes      | ✅       | ❌ (serverless) | Connect GitHub repo    |
| **Netlify**  | ✅ Yes      | ✅       | ❌ (functions)  | Connect GitHub repo    |
| **Heroku**   | ❌ Paid     | ✅       | ✅ PostgreSQL   | Git push               |

**Recommendation for Express apps:** Render or Railway. Both have free tiers, support Node.js, and include databases.

---

## 3. Preparing Your App for Deployment

### server.js changes

```js
const PORT = process.env.PORT || 3000;  // ← Critical: use env PORT

app.listen(PORT, '0.0.0.0', () => {    // ← Bind to 0.0.0.0 (all interfaces)
  console.log(`Server running on port ${PORT}`);
});
```

**Why `0.0.0.0`?** In development, `localhost` works. In production, the host platform assigns a network interface — binding to `0.0.0.0` ensures your app accepts connections from outside.

### package.json

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

Most platforms run `npm start` automatically.

### .gitignore

```bash
node_modules/
.env
```

Never commit `node_modules` or `.env`. The platform installs dependencies and sets env vars separately.

---

## 4. Step-by-Step — Deploy to Render

**1. Push your code to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourname/your-repo.git
git push -u origin main
```

**2. Create a Render account** at [render.com](https://render.com)

**3. New Web Service**
- Connect your GitHub repo
- Name: `my-todo-app`
- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`
- Plan: Free

**4. Add Environment Variables**
```
KEY: PORT           VALUE: 10000
KEY: NODE_ENV       VALUE: production
KEY: JWT_SECRET     VALUE: (generate a random string)
```

**5. Deploy** — Render pulls code, installs deps, starts server.

**6. Your URL:** `https://my-todo-app.onrender.com`

---

## 5. Adding a Database in Production

**Local** → SQLite or local PostgreSQL
**Production** → Managed PostgreSQL (Render, Railway, Neon, Supabase)

```js
// Use environment variable for database URL
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === 'production' && {
    ssl: { rejectUnauthorized: false },  // Render/Neon require SSL
  }),
});
```

**On Render:** Create a PostgreSQL database from the dashboard. Copy the "Internal Database URL" into your Web Service's environment variables.

---

## 6. Process Manager (PM2) — Keep Your App Alive

In production, use **PM2** to auto-restart if the app crashes:

```bash
npm install -g pm2

pm2 start server.js --name my-app
pm2 save
pm2 startup  # Auto-start on server reboot

# Commands
pm2 list          # Show all processes
pm2 logs my-app   # View logs
pm2 restart my-app
pm2 stop my-app
```

**Note:** Most cloud platforms (Render, Railway) already handle process management — you only need PM2 if managing your own VPS (DigitalOcean, Linode, AWS EC2).

---

## 7. Domain + Reverse Proxy (Nginx)

For a custom domain like `myapp.com`:

```
User → myapp.com:443 (HTTPS)
           ↓
       Nginx (port 443, SSL termination)
           ↓
       Express (port 3000, internal HTTP)
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name myapp.com;
    return 301 https://$server_name$request_uri;  # Redirect HTTP → HTTPS
}

server {
    listen 443 ssl;
    server_name myapp.com;

    ssl_certificate /etc/letsencrypt/live/myapp.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/myapp.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 8. Environment Variables in Production

**NEVER hardcode production secrets.** Set them on your hosting platform:

```
# Render dashboard → Environment tab
PORT=10000
NODE_ENV=production
DATABASE_URL=postgres://user:pass@host:5432/db
JWT_SECRET=generated-secret-string
CORS_ORIGIN=https://myapp.com
```

```js
// server.js
const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  isProduction: process.env.NODE_ENV === 'production',
};
```

---

## 9. CI/CD — Automatic Deploys

Most platforms connect to your GitHub repo and auto-deploy on every push:

```
git push origin main
    → GitHub triggers webhook
    → Platform pulls code
    → npm install
    → Restarts server
    → New version live in 1-2 minutes
```

---

## 10. Deployment Checklist

| Item                          | Check |
|-------------------------------|-------|
| PORT from environment variable| ☐     |
| Bind to `0.0.0.0`            | ☐     |
| `.gitignore` has `node_modules/` and `.env` | ☐ |
| All secrets in env vars       | ☐     |
| Database uses SSL in prod     | ☐     |
| `npm start` works locally     | ☐     |
| `npm install` installs everything | ☐ |
| CORS configured for prod domain | ☐  |
| Error messages hidden in prod | ☐     |
| HTTPS enabled                 | ☐     |

---

## 11. Quick Reference

| Concept                | Key Point                                    |
|------------------------|----------------------------------------------|
| Deployment             | Making your app accessible online            |
| PORT                   | Always use `process.env.PORT`               |
| 0.0.0.0               | Bind to all network interfaces               |
| Render/Railway         | Best free platforms for Node.js              |
| PM2                    | Process manager for VPS (not needed on Render/Railway) |
| Nginx                  | Reverse proxy for custom domain + SSL        |
| Environment variables  | Set on platform dashboard, never in code     |
| CI/CD                  | Auto-deploy on git push                      |
| SSL/HTTPS              | Required for production (free with Let's Encrypt) |

---

*Last updated: June 2026*
