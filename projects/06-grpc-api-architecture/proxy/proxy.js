const net = require("net");
const http = require("http");

const LB_PORT = 50050;

const BACKENDS = [
  { id: "S1", host: "localhost", port: 50051 },
  { id: "S2", host: "localhost", port: 50052 },
  { id: "S3", host: "localhost", port: 50053 },
];

const healthy = BACKENDS.map(() => true);
let current = 0;

function checkHealth(index) {
  const b = BACKENDS[index];
  const socket = new net.Socket();
  socket.setTimeout(2000);

  socket.on("connect", () => {
    healthy[index] = true;
    socket.destroy();
  });

  socket.on("error", () => {
    healthy[index] = false;
  });

  socket.on("timeout", () => {
    healthy[index] = false;
    socket.destroy();
  });

  socket.connect(b.port, b.host);
}

setInterval(() => {
  BACKENDS.forEach((_, i) => checkHealth(i));
}, 5000);

BACKENDS.forEach((_, i) => checkHealth(i));

function nextTarget() {
  const start = current;
  do {
    if (healthy[current]) {
      const target = BACKENDS[current];
      current = (current + 1) % BACKENDS.length;
      return target;
    }
    current = (current + 1) % BACKENDS.length;
  } while (current !== start);

  return null;
}

const healthServer = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/health") {
    res.end(
      JSON.stringify({
        status: "healthy",
        strategy: "round-robin",
        backends: BACKENDS.map((b, i) => ({
          id: b.id,
          address: `${b.host}:${b.port}`,
          healthy: healthy[i],
        })),
        lb_address: `0.0.0.0:${LB_PORT}`,
      })
    );
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

const HEALTH_PORT = 5049;
healthServer.listen(HEALTH_PORT, () => {
  console.log(`Health endpoint: http://localhost:${HEALTH_PORT}/health`);
});

const lb = net.createServer((clientConn) => {
  const target = nextTarget();

  if (!target) {
    console.log("[LB] No healthy backends, rejecting connection");
    clientConn.end();
    return;
  }

  console.log(`[LB] New connection -> ${target.id} (${target.host}:${target.port})`);

  const backendConn = net.createConnection(
    { host: target.host, port: target.port },
    () => {
      clientConn.pipe(backendConn);
      backendConn.pipe(clientConn);
    }
  );

  backendConn.on("error", (err) => {
    console.log(`[LB] Backend ${target.id} error: ${err.message}`);
    clientConn.end();
  });

  clientConn.on("error", () => {
    backendConn.destroy();
  });
});

lb.listen(LB_PORT, () => {
  console.log(`\n  gRPC Load Balancer running on 0.0.0.0:${LB_PORT}`);
  console.log(`  Strategy: Round-Robin (TCP-level)`);
  console.log(`  Backends:`);
  BACKENDS.forEach((b, i) => {
    console.log(`    ${b.id}: ${b.host}:${b.port} [${healthy[i] ? "UP" : "?"}]`);
  });
  console.log(`  Health checks every 5s\n`);
});
