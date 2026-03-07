import { Request, Response, NextFunction } from 'express';
import { Role } from '@taxidi/database';
import { ForbiddenError, UnAuthorizedError } from '@/utils/errorHandler';

export function authorizeRoles(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new UnAuthorizedError('Unauthorized');
      }

      if (!allowedRoles.includes(req.user.role as Role)) {
        throw new ForbiddenError('Forbidden: Insufficient permissions');
      }

      next();
    } catch (error: any) {
      next(error);
    }
  };
}
