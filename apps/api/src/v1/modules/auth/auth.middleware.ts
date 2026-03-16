import { Request, Response, NextFunction } from 'express';
import { accessTokenVerfier } from '@/utils/token-helper';
import { AppError, UnAuthorizedError } from '@/utils/errorHandler';
import { RoleName } from '@taxidi/database';

export interface JwtPayload {
  userId: string;
  roles: RoleName[];
  activeRole: RoleName;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : req.cookies?.accessToken;

  if (!token) {
    throw new UnAuthorizedError('Unauthorized Access Denied');
  }

  try {
    const validated = accessTokenVerfier(token);
    if (!validated) {
      throw new UnAuthorizedError('Invalid or expired access token');
    }

    req.user = validated;

    next();
  } catch (error: any) {
    next(new UnAuthorizedError('Unauthorized Access Denied'));
  }
}
