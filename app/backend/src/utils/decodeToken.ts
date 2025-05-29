import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default function tokenValidate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  try {
    jwt.verify(authorization, process.env.JWT_SECRET || 'jwt_secret');
  } catch {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
}
