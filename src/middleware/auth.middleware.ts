import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JTW_SECRET || "secret-dev-key";

export interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or mispelled Token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
    return;
  }
};
