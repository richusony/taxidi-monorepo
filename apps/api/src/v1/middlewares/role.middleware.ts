import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnAuthorizedError } from '@/utils/errorHandler';
import { RoleName } from '@taxidi/database';

export function authorizeRoles(...allowedRoles: RoleName[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new UnAuthorizedError('Unauthorized');
      }

      const userRoles: RoleName[] = req.user.roles;
      const isAllowedRole = userRoles.some(role =>
        allowedRoles.includes(role)
      );

      if (!isAllowedRole) {
        throw new ForbiddenError('Forbidden: You are not allowed to do this');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}