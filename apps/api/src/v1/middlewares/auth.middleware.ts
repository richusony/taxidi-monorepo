import { Request, Response, NextFunction } from 'express';
import { accessTokenVerfier } from '@/utils/token-helper';

export interface JwtPayload {
  userId: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({
      error: 'Missing access token',
    });
  }

  try {
    const validated = accessTokenVerfier(token);

    if (!validated) {
      return res.status(401).json({
        error: 'Invalid or expired access token',
      });
    }

    req.user = validated;

    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid or expired access token',
    });
  }
}
