"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const path = req.path;
    // Log the incoming request
    console.log(`[${timestamp}] ${method} ${path}`);
    // Capture the response finish event to log the response status and completion time
    res.on('finish', () => {
        const responseTime = Date.now() - new Date(timestamp).getTime();
        console.log(`[${timestamp}] ${method} ${path} => ${res.statusCode} (${responseTime}ms)`);
    });
    // Continue processing the request
    next();
};
exports.default = loggerMiddleware;
