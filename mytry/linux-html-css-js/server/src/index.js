import http from "node:http";
import path from "node:path";
import express from "express";
import { config } from "./config.js";
import { corsMiddleware } from "./middleware/cors.js";
import { requestLogger } from "./middleware/logger.js";
import { apiRateLimiter } from "./middleware/rateLimiter.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";
import { systemRouter } from "./routes/system.js";
import { notesRouter } from "./routes/notes.js";
import { authRouter } from "./routes/auth.js";
import { wsHub } from "./ws/hub.js";

async function bootstrap() {
    const app = express();

    app.disable("x-powered-by");
    app.use(requestLogger);
    app.use(corsMiddleware);
    app.use(express.json({ limit: "100kb" }));
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
        res.sendFile(path.join(config.staticRoot, "index.html"));
    });

    app.use("/assets", express.static(path.join(config.staticRoot, "assets"), { maxAge: "1d" }));
    app.use("/pages", express.static(path.join(config.staticRoot, "pages")));
    app.use(express.static(config.staticRoot));

    app.use(`${config.apiPrefix}/system`, apiRateLimiter, systemRouter);
    app.use(`${config.apiPrefix}/notes`, apiRateLimiter, notesRouter);
    app.use(`${config.apiPrefix}/auth`, apiRateLimiter, authRouter);

    app.use(notFoundHandler);
    app.use(errorHandler);

    const server = http.createServer(app);
    wsHub.attach(server);

    server.listen(config.port, config.host, () => {
        console.log(`\n  Linux Lib server running:`);
        console.log(`  → http://localhost:${config.port}`);
        console.log(`  → API:  http://localhost:${config.port}${config.apiPrefix}/system/status`);
        console.log(`  → WS:   ws://localhost:${config.port}/ws\n`);
    });

    const shutdown = () => {
        console.log("\nShutting down…");
        try {
            wsHub.broadcast({ type: "server:shutdown" });
            wsHub.wss?.close();
        } catch {}
        server.close(() => process.exit(0));
        setTimeout(() => process.exit(1), 3000).unref();
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

    return server;
}

bootstrap().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});