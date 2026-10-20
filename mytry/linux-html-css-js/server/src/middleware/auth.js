import { verifyToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";

export function requireAuth(req, res, next) {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
        return next(AppError.unauthorized("Missing Bearer token"));
    }
    try {
        req.user = verifyToken(token);
        next();
    } catch (err) {
        next(AppError.unauthorized("Invalid or expired token"));
    }
}