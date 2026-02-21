import { JwtPayload } from '@/middleware/authMiddleware';

declare global {
  namespace Express {
    interface User extends JwtPayload {}
  }
}
