import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const config = Object.freeze({
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || "0.0.0.0",
    apiPrefix: "/api/v1",
    staticRoot: path.resolve(__dirname, "..", ".."),
    dataFile: path.resolve(__dirname, "..", "data", "db.json"),
    jwtSecret: process.env.JWT_SECRET || "linux-lib-demo-secret",
    rateLimit: Object.freeze({
        windowMs: 60_000,
        max: 120,
    }),
});