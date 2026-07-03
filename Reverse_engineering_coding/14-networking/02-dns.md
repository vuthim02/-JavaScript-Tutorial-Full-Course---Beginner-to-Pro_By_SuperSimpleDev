# 2. Domain Name System (DNS)

## Why DNS Exists

Humans remember names. Computers need numbers.

```
Human: google.com
         ↓
DNS resolves
         ↓
Computer: 142.250.80.46
```

## DNS Resolution Flow

```
Browser enters google.com
       ↓
1. Check browser cache
2. Check OS cache (hosts file)
3. Check router cache
4. Query ISP's recursive DNS resolver
       ↓
5. Root DNS server → points to .com TLD server
6. .com TLD server → points to google.com nameserver
7. google.com nameserver → returns IP address
       ↓
Browser connects to 142.250.80.46
```

## DNS Record Types

| Type | Purpose | Example |
|------|---------|---------|
| `A` | IPv4 address | `google.com → 142.250.80.46` |
| `AAAA` | IPv6 address | `google.com → 2607:f8b0::...` |
| `CNAME` | Canonical name (alias) | `www.example.com → example.com` |
| `MX` | Mail exchange | `@ → mail.google.com` |
| `TXT` | Text data (verification) | `SPF`, `DKIM` records |
| `NS` | Nameserver | `ns1.google.com` |

## DNS in Node.js

```javascript
const dns = require('dns');

// Uses libuv thread pool (system getaddrinfo)
dns.lookup('google.com', (err, address, family) => {
    console.log(address); // '142.250.80.46'
    console.log(family);  // 4
});

// Uses Node's own DNS resolver (bypasses thread pool)
dns.resolve('google.com', 'A', (err, records) => {
    console.log(records); // ['142.250.80.46', ...]
});
```

## DNS Caching

```javascript
const dns = require('dns');

// Custom cache
const cache = new Map();

function cachedLookup(hostname) {
    if (cache.has(hostname)) {
        return Promise.resolve(cache.get(hostname));
    }

    return new Promise((resolve, reject) => {
        dns.lookup(hostname, (err, address) => {
            if (err) return reject(err);
            cache.set(hostname, address);
            resolve(address);
        });
    });
}
```

## DNS Resolution in Node.js — Different Methods

```javascript
const dns = require('dns/promises');

// dns.lookup uses system's getaddrinfo (libuv thread pool)
const { address, family } = await dns.lookup('example.com');

// dns.resolve uses Node's internal DNS resolver (no thread pool)
const records = await dns.resolve('example.com', 'A');

// Multiple record types at once
const result = await dns.resolveAny('example.com');
console.log(result);

// Reverse lookup (IP → hostname)
const hostnames = await dns.reverse('8.8.8.8');
console.log(hostnames); // ['dns.google']
```

## DNS in the OSI Model

DNS operates at the **Application Layer** (Layer 7) even though it provides a fundamental network service. It uses UDP on port 53 for standard queries (with TCP fallback for large responses).

```
Application Layer (DNS)
Transport Layer (UDP/TCP port 53)
Network Layer (IP)
```

## DNS Caching in Node.js

```javascript
const dns = require('dns');

// Enable DNS result caching
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Custom TTL-based cache
const cache = new Map();
const TTL = 60000; // 1 minute

async function cachedResolve(hostname) {
    const cached = cache.get(hostname);
    if (cached && Date.now() - cached.timestamp < TTL) {
        return cached.address;
    }
    const { address } = await dns.promises.lookup(hostname);
    cache.set(hostname, { address, timestamp: Date.now() });
    return address;
}
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What happens when DNS fails? | Browser shows DNS error — cannot resolve host |
| Is DNS cached? | Multiple levels: browser, OS, router, ISP |
| Resolve hostname to IP? | Use `dns.lookup()` or system `nslookup`/`dig` |
| Which record type? | A for IPv4, AAAA for IPv6, CNAME for aliases |
| UDP or TCP for DNS? | UDP by default, TCP for large responses (>512 bytes) |
## Next Steps

[Back to Chapter 1](01-osi-model.md): 1. OSI Model, Client-Server, and IP Addressing
[Proceed to Chapter 3](03-tcp-udp.md): 3. Transmission Control Protocol (TCP) and UDP to learn about 3. transmission control protocol (tcp) and udp.
