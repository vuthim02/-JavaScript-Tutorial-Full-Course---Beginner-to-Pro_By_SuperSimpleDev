# Networking — HTTP, TCP (net), TLS

<img src="https://media.giphy.com/media/UcK7JalnjCz0k/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## HTTP Server

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // req: IncomingMessage (Readable Stream)
    // res: ServerResponse (Writable Stream)
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
```

### Request Object (IncomingMessage)

```javascript
http.createServer((req, res) => {
    console.log(req.method);       // 'GET', 'POST', etc.
    console.log(req.url);          // '/api/users?id=123'
    console.log(req.headers);      // { 'content-type': 'application/json', ... }
    console.log(req.httpVersion);  // '1.1'

    // Read request body (stream)
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
        console.log('Body:', body);
        res.end('OK');
    });
});
```

### Response Object (ServerResponse)

```javascript
http.createServer((req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Custom-Header', 'value');

    // Write header (alternative)
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'value'
    });

    res.write(JSON.stringify({ message: 'Hello' }));
    res.end();
});
```

### Routing (Manual)

```javascript
http.createServer((req, res) => {
    const { method, url } = req;

    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Home</h1>');
    } else if (url === '/api/users' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify([{ id: 1, name: 'Alice' }]));
    } else if (url === '/api/users' && method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const user = JSON.parse(body);
            res.writeHead(201);
            res.end(JSON.stringify({ id: 2, ...user }));
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});
```

### Request Flow

```
Browser
  │
  ▼  TCP connection (3-way handshake)
  ▼  HTTP request sent
  ▼  libuv receives TCP data
  ▼  Event loop: poll phase picks up
  ▼  http parser parses request
  ▼  Request handler callback invoked
  ▼  Response sent back
  ▼  TCP connection closed (or kept alive)
```

---

## TCP Server (net module)

```javascript
const net = require('net');

const server = net.createServer((socket) => {
    // socket is a Duplex stream
    console.log('Client connected');
    socket.write('Welcome to TCP server!\n');

    socket.on('data', (data) => {
        console.log('Received:', data.toString());
        if (data.toString().trim() === 'quit') {
            socket.end('Goodbye!\n');
        }
    });

    socket.on('end', () => console.log('Client disconnected'));
    socket.on('error', (err) => console.error('Socket error:', err));
});

server.listen(9000, () => console.log('TCP server on port 9000'));
```

### TCP Client

```javascript
const net = require('net');

const client = net.createConnection({ port: 9000 }, () => {
    console.log('Connected to server');
    client.write('Hello from client!\n');
});

client.on('data', (data) => console.log('Server says:', data.toString()));
client.on('end', () => console.log('Disconnected from server'));
```

### Applications

- **Redis**: uses TCP (custom protocol).
- **MySQL/PostgreSQL**: uses TCP.
- **IRC**: chat protocol over TCP.
- **Custom protocol servers**: game servers, real-time data feeds.

---

## TLS

```javascript
const tls = require('tls');
const fs = require('fs');

const options = {
    key: fs.readFileSync('server-key.pem'),
    cert: fs.readFileSync('server-cert.pem'),
    ca: fs.readFileSync('ca-cert.pem')
};

const server = tls.createServer(options, (socket) => {
    console.log('Client connected (encrypted)');
    socket.write('Secure connection established!\n');
    socket.end();
});

server.listen(4433, () => console.log('TLS server on port 4433'));
```

HTTPS uses TLS under the hood:

```javascript
const https = require('https');
const fs = require('fs');

https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, (req, res) => {
    res.end('Secure Hello!');
}).listen(443);
```

---

## Q&A

| Question | Answer |
|----------|--------|
| Which route received request? | Check `req.url` and `req.method` |
| Is request body a stream? | Yes — `req` is a Readable stream |
| Is response a stream? | Yes — `res` is a Writable stream |
| What if response is large? | Stream it with `res.write()` in chunks |
| Is this TCP? | Yes — `net` module |
| Is socket a stream? | Yes — Duplex (readable + writable) |
| What protocol runs over TCP? | HTTP, FTP, SMTP, custom protocols |
## Next Steps

[Back to Chapter 8](08-process-globals.md): Global Objects and Process
[Proceed to Chapter 10](10-child-process.md): Child Process — Spawning External Programs to learn about child process — spawning external programs.
