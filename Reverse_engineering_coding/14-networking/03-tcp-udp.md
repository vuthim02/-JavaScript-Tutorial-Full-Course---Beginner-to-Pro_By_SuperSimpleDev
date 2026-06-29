# 3. Transmission Control Protocol (TCP) and UDP

<img src="https://media.giphy.com/media/UcK7JalnjCz0k/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Characteristics

| Property | TCP | UDP |
|----------|-----|-----|
| Connection | Connection-oriented (handshake) | Connectionless |
| Reliability | Guaranteed delivery, retransmission | Best-effort, no guarantee |
| Ordering | Preserves order | No ordering |
| Flow control | Yes (sender adjusts to receiver) | No |
| Use cases | HTTP, WebSocket, email, file transfer | DNS, VoIP, video streaming, gaming |

## TCP Three-Way Handshake

```
Client (SYN_SENT)          Server (LISTEN)
    │                          │
    │────── SYN (seq=100) ────►│  (SYN_RCVD)
    │                          │
    │◄───── SYN-ACK (seq=200, ack=101) ──│
    │                          │
    │────── ACK (seq=101, ack=201) ─────►│  (ESTABLISHED)
    │                          │
    │◄═════ Data Transfer ════►│
```

Total round trips before data: **1** (the third ACK can carry data).

## Ports

```
IP Address: Which machine?
Port:       Which application on that machine?
```

| Port Range | Category | Examples |
|------------|----------|----------|
| 0-1023 | Well-known (requires root) | HTTP(80), HTTPS(443), SSH(22) |
| 1024-49151 | Registered | MySQL(3306), PostgreSQL(5432), Redis(6379) |
| 49152-65535 | Dynamic/ephemeral | Temporary client ports |

## Connection Termination

```
Client                         Server
  │                              │
  │────── FIN ─────────────────►│
  │                              │
  │◄───── ACK ──────────────────│
  │                              │
  │◄───── FIN ──────────────────│
  │                              │
  │────── ACK ─────────────────►│
  │                              │
  │       (Connection closed)    │
```

## TCP in Node.js

```javascript
const net = require('net');

const server = net.createServer((socket) => {
    console.log('Client connected:', socket.remoteAddress);
    socket.write('Hello from TCP server!\n');
    socket.on('data', (data) => {
        console.log('Received:', data.toString());
    });
});

server.listen(9000, () => {
    console.log('TCP server on :9000');
});
```

## UDP Protocol

```javascript
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
    console.log(`Received ${msg} from ${rinfo.address}:${rinfo.port}`);
    server.send(msg, rinfo.port, rinfo.address);
});

server.bind(41234);
```

### UDP Characteristics

| Property | Value |
|----------|-------|
| Connection | Connectionless (no handshake) |
| Reliability | Best-effort, no retransmission |
| Ordering | No guaranteed ordering |
| Overhead | Minimal (8-byte header vs TCP's 20+) |
| Use cases | DNS, DHCP, VoIP, video streaming, gaming |

## TCP vs UDP Decision Guide

```
Need reliability?            → TCP (HTTP, WebSocket, file transfer)
Need low latency?            → UDP (gaming, VoIP, video)
Need ordered delivery?       → TCP
Can tolerate some loss?      → UDP
Need flow control?           → TCP
Broadcast/multicast needed?  → UDP
```

## TCP Flow Control and Congestion Avoidance

TCP uses **sliding window** flow control: the receiver advertises a window size, and the sender cannot send more than that amount until acknowledged.

```
Sender ──── Segment ────► Receiver
Sender ◄─── ACK (window=8192) ──── Receiver
Sender ──── 8192 bytes ──► Receiver
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is communication connection-based? | TCP is connection-oriented |
| Reliability important? | Use TCP. Real-time tolerance for loss? Use UDP |
| Which port? | Determines which application receives data |
| Connection persistence? | WebSocket stays open. HTTP closes after response |
| Lower latency needed? | UDP has no handshake overhead |
| Broadcast required? | UDP supports broadcast/multicast |
## Next Steps

[Back to Chapter 2](02-dns.md): 2. Domain Name System (DNS)
[Proceed to Chapter 4](04-http-versions-methods.md): 4. HTTP Protocol Versions and Methods to learn about 4. http protocol versions and methods.
