import { config } from "../config.js";
import { AppError } from "../utils/AppError.js";

const buckets = new Map();

export function rateLimiter(configOverride) {
    const { windowMs, max } = configOverride || config.rateLimit;
    return (req, res, next) => {
        const key = req.ip;
        const now = Date.now();
        const bucket = buckets.get(key) || { count: 0, resetAt: now + windowMs };
        if (bucket.resetAt <= now) {
            bucket.count = 0;
            bucket.resetAt = now + windowMs;
        }
        bucket.count += 1;
        buckets.set(key, bucket);
        res.setHeader("X-RateLimit-Limit", String(max));
        res.setHeader("X-RateLimit-Remaining", String(Math.max(0, max - bucket.count)));
        if (bucket.count > max) {
            res.setHeader("Retry-After", String(Math.ceil((bucket.resetAt - now) / 1000)));
            return next(AppError.tooManyRequests("Too many requests, slow down"));
        }
        next();
    };
}

setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
        if (bucket.resetAt <= now) buckets.delete(key);
    }
}, 60_000);

export const apiRateLimiter = rateLimiter();