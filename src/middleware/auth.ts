import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.AUTH_TOKEN;

  if (!expectedToken) {
    return res.status(500).json({
      error: "Server configuration error",
    });
  }

  if (!authHeader) {
    return res.status(401).json({
      error: "Authorization header required, Bearer <token>",
    });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  if (token !== expectedToken) {
    return res.status(401).json({
      error: "Invalid authorization token",
    });
  }

  next();
};
