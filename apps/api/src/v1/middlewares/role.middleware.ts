import { Request, Response, NextFunction } from 'express';
import { Role } from '@taxidi/database';

export function authorizeRoles(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
      });
    }

    if (!allowedRoles.includes(req.user.role as Role)) {
      return res.status(403).json({
        error: 'Forbidden: Insufficient permissions',
      });
    }

    next();
  };
}
