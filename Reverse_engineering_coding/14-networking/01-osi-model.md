# 1. OSI Model, Client-Server, and IP Addressing

## OSI Model

```
Application Layer  ← HTTP, WebSocket, gRPC
↓
Transport Layer    ← TCP, UDP
↓
Network Layer      ← IP
↓
Link Layer         ← Ethernet, WiFi
↓
Physical Layer     ← Cables, Radio
```

| Layer | Example Protocols | Responsibility |
|-------|------------------|----------------|
| Application | HTTP, WebSocket, DNS, gRPC | Data format and semantics |
| Transport | TCP, UDP | Reliability, ordering, ports |
| Network | IPv4, IPv6 | Addressing, routing |
| Link | Ethernet, WiFi | Physical transmission |

## Client and Server

| Role | Initiates connection? | Examples |
|------|----------------------|----------|
| **Client** | Yes (sends request) | Browser, mobile app, curl, Postman |
| **Server** | No (listens) | Node.js http server, Nginx, Apache |

### Request-Response Cycle

```
Client                         Server
  │                               │
  │────── HTTP Request ──────────►│
  │                               │  Process request
  │◄───── HTTP Response ──────────│
  │                               │
```

A single request-response cycle is the basic unit of web communication.

## IP Address

### IPv4

32-bit address. 4 octets. ~4.3 billion addresses.

```
192 . 168 .  1  . 10
11000000 10101000 00000001 00001010
```

### IPv6

128-bit address. 8 groups of 4 hex digits. ~340 undecillion addresses.

```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

Common shorthand (omit leading zeros):

```
2001:db8:85a3::8a2e:370:7334
```

### Special Addresses

| Address | Purpose |
|---------|---------|
| `127.0.0.1` (localhost) | Loopback — your own machine |
| `0.0.0.0` | All interfaces (bind to all IPs) |
| `192.168.x.x` | Private network |
| `10.x.x.x` | Private network |
| `::1` | IPv6 localhost |

## Network Tools

```bash
# Check IP configuration
ip addr show           # Linux
ifconfig               # macOS/Linux
ipconfig               # Windows

# Ping test
ping google.com        # Check connectivity

# Trace route
traceroute google.com  # See network path

# Check port
ss -tlnp              # Linux: listening TCP ports
netstat -an            # All connections
```

## IP Subnetting Quick Reference

| CIDR | Subnet Mask | Usable IPs |
|------|-------------|------------|
| `/24` | 255.255.255.0 | 254 |
| `/16` | 255.255.0.0 | 65,534 |
| `/8` | 255.0.0.0 | 16,777,214 |
| `/32` | 255.255.255.255 | 1 (single host) |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which layer does this problem belong to? | Application? Transport? Network? |
| Is it a protocol issue or data issue? | Protocol → lower layers. Data → application layer |
| Which machine is being contacted? | Resolve hostname → IP |
| Is it local or remote? | `127.0.0.1` = local. Public IP = remote |
| Can't connect? | Check IP, port, firewall, DNS resolution |
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-dns.md): 2. Domain Name System (DNS) to learn about 2. domain name system (dns).
