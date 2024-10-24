import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable must be defined");
}

interface DecodedToken {
  id: number;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.log("NO HEADER")
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    console.log("NO TOKEN")
    return res.status(401).json({ error: 'Unauthorized: Invalid token format' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("ERROR VERIFYING TOKEN")
      return res.status(401).json({ error: 'Unauthorized: Token verification failed' });
    }
    req.body.user = decoded as DecodedToken;
    next();
  });
};