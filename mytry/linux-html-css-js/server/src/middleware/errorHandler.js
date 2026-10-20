import { AppError, isOperational } from "../utils/AppError.js";

export function notFoundHandler(req, res, next) {
    next(AppError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(err, req, res, next) {
    if (res.headersSent) return next(err);

    const operational = isOperational(err);
    const status =
        err.statusCode && err.statusCode >= 400 && err.statusCode < 600
            ? err.statusCode
            : 500;
    const code = operational ? err.code : "INTERNAL_ERROR";
    const message = operational ? err.message : "Something went wrong on the server";

    if (!operational) {
        console.error("\n[unhandled error]", err.name, err.message, err.stack);
    }

    res.status(status).json({
        error: { code, message, details: err.details },
        success: false,
    });
}