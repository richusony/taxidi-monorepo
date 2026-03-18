import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnAuthorizedError } from '@/utils/errorHandler';
import { RoleName } from '@taxidi/database';

export function authorizeRole(allowedRole: RoleName) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new UnAuthorizedError('Unauthorized');
      }

      const userRole: RoleName = req.user.activeRole;
      // const isAllowedRole = userRoles.some((role) =>
      //   allowedRoles.includes(role),
      // );

      if (allowedRole !== userRole) {
        throw new ForbiddenError(
          'Forbidden: You are not allowed to access this',
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
