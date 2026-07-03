const express = require("express");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const httpProxy = require("http-proxy");
const http = require("http");
const path = require("path");

const app = express();
const PORT = 3000;

const BACKENDS = [
  { id: "S1", host: "localhost", port: 3001 },
  { id: "S2", host: "localhost", port: 3002 },
  { id: "S3", host: "localhost", port: 3003 },
];

const healthy = BACKENDS.map(() => true);
let current = 0;

function checkHealth(index) {
  const b = BACKENDS[index];
  const req = http.get(`http://${b.host}:${b.port}/api/health`, (res) => {
    res.resume();
    healthy[index] = res.statusCode === 200;
  });
  req.on("error", () => { healthy[index] = false; });
  req.setTimeout(2000, () => { req.destroy(); healthy[index] = false; });
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

const proxy = httpProxy.createProxy({
  ws: true,
  proxyTimeout: 5000,
  timeout: 5000,
});

proxy.on("error", (err, req, res) => {
  console.error(`[LB] Proxy error: ${err.message}`);
  if (res.writeHead) {
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Bad Gateway: no healthy backends" }));
  }
});

app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: "Too many requests" },
});
app.use(limiter);

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    backends: BACKENDS.map((b, i) => ({
      id: b.id,
      url: `http://${b.host}:${b.port}`,
      healthy: healthy[i],
    })),
    strategy: "round-robin",
  });
});

app.use("/api", (req, res) => {
  const target = nextTarget();

  if (!target) {
    return res.status(503).json({ error: "Service Unavailable: all backends are down" });
  }

  const targetUrl = `http://${target.host}:${target.port}/api${req.url}`;
  console.log(`[LB] ${req.method} ${req.url} -> ${target.id} ${targetUrl}`);

  proxy.web(req, res, {
    target: targetUrl,
    changeOrigin: true,
    ignorePath: true,
  });
});

app.use(express.static(path.join(__dirname, "..", "client")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, () => {
  console.log(`\n  Load Balancer running on http://localhost:${PORT}`);
  console.log(`  Strategy: Round-Robin`);
  console.log(`  Backends:`);
  BACKENDS.forEach((b, i) => {
    console.log(`    ${b.id}: http://${b.host}:${b.port} [${healthy[i] ? "UP" : "?"}]`);
  });
  console.log(`  Health checks every 5s\n`);
});
