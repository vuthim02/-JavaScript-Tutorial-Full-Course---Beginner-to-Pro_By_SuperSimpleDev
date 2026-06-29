# WH5H2 — Port in Web Development

## What

A **port** is a virtual door on a computer that identifies a specific process or service on a network. Combined with an IP address, it forms a **socket**: `192.168.1.10:3000`.

```
IP:      192.168.1.10  (identifies the machine)
Port:    3000           (identifies the app on that machine)
Socket:  192.168.1.10:3000  (full address)
```

**Analogy:**
- IP address = building address
- Port = apartment number
- `IP:Port` = "Building 123, Apt 456"

---

## Why

Ports exist because one machine runs **many services at once**, and the OS needs to know which service gets incoming data.

Without ports, a server could only run one application. With ports:

```
One Machine (IP: 192.168.1.10)
  ├── Port 80   →  Nginx (web server)
  ├── Port 3000 →  Express (your API)
  ├── Port 443  →  HTTPS web server
  ├── Port 5432 →  PostgreSQL
  ├── Port 6379 →  Redis
  └── Port 22   →  SSH (remote access)
```

When a packet arrives, the OS reads the port number and forwards data to the correct process.

---

## When

You specify a port whenever you **start a network service**:

**Your Express server:**
```js
app.listen(3000);  // server listens on port 3000
```

**Database:**
```bash
psql -h localhost -p 5432  # connect to PostgreSQL on port 5432
```

**In production:**
- Your server runs on port 3000 (or any random high port)
- A reverse proxy (Nginx) runs on port 80/443 and forwards to your server
- Databases run on their default ports

**Common scenario:**
```
Browser → port 80 (HTTP) → Nginx → port 3000 → Express → port 5432 → PostgreSQL
```

---

## Where

### Port Ranges (0–65535)

| Range        | Category       | Description                          |
|--------------|----------------|--------------------------------------|
| 0–1023       | Well-Known     | System services (require root/admin) |
| 1024–49151   | Registered     | User applications, registered with IANA |
| 49152–65535  | Dynamic/Private| Temporary (ephemeral), client-side   |

### Well-Known Ports (Memorize These)

| Port | Protocol | Service          |
|------|----------|------------------|
| 20   | TCP      | FTP data         |
| 21   | TCP      | FTP control      |
| 22   | TCP      | SSH              |
| 25   | TCP      | SMTP (email send)|
| 53   | UDP/TCP  | DNS              |
| 80   | TCP      | HTTP             |
| 110  | TCP      | POP3 (email)     |
| 143  | TCP      | IMAP (email)     |
| 443  | TCP      | HTTPS            |
| 3306 | TCP      | MySQL            |
| 5432 | TCP      | PostgreSQL       |
| 6379 | TCP      | Redis            |
| 27017| TCP      | MongoDB          |

### Common Development Ports

| Port | Service                    |
|------|----------------------------|
| 3000 | Express / Node.js (common) |
| 5173 | Vite (React/Vue default)   |
| 8080 | Tomcat, Jenkins, fallback  |
| 5000 | Flask, Python              |
| 8000 | Django, Python             |
| 4000 | Phoenix (Elixir)           |

---

## How It Work — Step by Step

When you type `http://localhost:3000/api/items` in a browser:

```
1. Browser parses URL → host: "localhost", port: 3000, path: "/api/items"
2. DNS resolves "localhost" → 127.0.0.1 (loopback)
3. OS creates TCP connection to 127.0.0.1:3000
4. Server listens on port 3000 → OS delivers connection to Express process
5. Express receives request → routes to handler → sends response
6. Response goes back through port 3000 → OS → browser
```

**Server-side port lifecycle:**
```js
const server = app.listen(3000, () => {
  // 1. OS allocates port 3000 exclusively to this process
  // 2. Server starts accepting connections on that port
  // 3. No other app can use port 3000 while this runs
});

// Later:
server.close();  // 4. OS releases the port
```

---

## What If

### What if two apps try to use the same port?

```
Error: listen EADDRINUSE :::3000
```
The second app fails to start. Ports are exclusive — one at a time.

**Fixes:**
```bash
# Find what's using port 3000
lsof -i :3000
# or
netstat -tulpn | grep 3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 node server.js
```

### What if you don't specify a port?

Some systems assign a **random ephemeral port** (49152–65535). Express requires an explicit port — it won't start without one.

### What if you use port 80 without root?

On Linux, ports below 1024 require root:
```bash
# This needs sudo
sudo node server.js  # app.listen(80)

# Better: use a reverse proxy (Nginx on port 80 forwards to your app on 3000)
```

### What if you're behind NAT / Router?

Your app listens on a local port, but the router needs **port forwarding**:
```
Router (public IP: 203.0.113.5)
  └── Port 80 → forwarded to 192.168.1.10:3000

Internet → Router:80 → Your PC:3000
```

### What if you use HTTPS?

HTTPS goes through port 443, not 80. You need an SSL certificate. Most production setups use Nginx/Caddy on port 443 with SSL termination:
```
Browser ←→ Nginx (port 443, HTTPS) ←→ Express (port 3000, HTTP internal)
```

---

## How Many

### How many ports exist?

**65,535** total (port numbers 0–65535, 16-bit unsigned integer = 2^16).

### How many ports does one app use?

**Typically one** — your Express app listens on one port.

But one app can listen on **multiple** ports:
```js
// Express on port 3000 (public API)
app.listen(3000);

// Same app on port 3001 (metrics / admin)
app.listen(3001);
```

### How many ports does a machine need?

**One per service.** A typical web server:

| Service     | Ports Used |
|-------------|------------|
| Nginx       | 80, 443    |
| Express app | 3000       |
| PostgreSQL  | 5432       |
| Redis       | 6379       |
| SSH         | 22         |
| **Total**   | **6 ports**|

### How many connections can one port handle?

**Thousands to millions.** A port is a door, not a phone line. TCP connections are identified by the **tuple**:

```
(source_ip, source_port, dest_ip, dest_port)
```

So port 3000 can handle 10,000+ simultaneous connections from different clients — each has a unique source IP/port.

---

## Quick Reference

| Question       | Answer                                    |
|----------------|-------------------------------------------|
| What           | A virtual door for a specific process      |
| Why            | So many services share one machine         |
| When           | Every time you start a network service     |
| Where          | 0–1023 (system), 1024–49151 (user), 49152–65535 (ephemeral) |
| How it works   | OS maps port number → process via listening socket |
| What if EADDRINUSE | Kill the other process or change your port |
| How many       | 65,535 total, 1 per service, unlimited connections per port |

---

*Last updated: June 2026*
