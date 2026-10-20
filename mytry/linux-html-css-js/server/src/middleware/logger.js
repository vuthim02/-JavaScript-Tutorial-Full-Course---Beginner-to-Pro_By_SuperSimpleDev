export function requestLogger(req, res, next) {
    const start = process.hrtime.bigint();
    res.on("finish", () => {
        const ms = Number(process.hrtime.bigint() - start) / 1e6;
        const line =
            `${new Date().toISOString()} ${req.method} ${req.originalUrl} ` +
            `${res.statusCode} ${ms.toFixed(1)}ms`;
        console.log(line);
    });
    next();
}