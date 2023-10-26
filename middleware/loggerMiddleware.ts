import { Request, Response, NextFunction } from 'express';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
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

export default loggerMiddleware;
