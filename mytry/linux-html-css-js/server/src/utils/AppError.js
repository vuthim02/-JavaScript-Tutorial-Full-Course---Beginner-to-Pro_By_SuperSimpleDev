export class AppError extends Error {
    constructor(statusCode, code, message, details) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message, details) {
        return new AppError(400, "BAD_REQUEST", message, details);
    }

    static unauthorized(message) {
        return new AppError(401, "UNAUTHORIZED", message);
    }

    static notFound(message) {
        return new AppError(404, "NOT_FOUND", message || "Resource not found");
    }

    static tooManyRequests(message) {
        return new AppError(429, "RATE_LIMITED", message || "Too many requests, slow down");
    }
}

export const notFoundError = () => AppError.notFound();

export const isOperational = (err) =>
    err instanceof AppError && err.isOperational === true;