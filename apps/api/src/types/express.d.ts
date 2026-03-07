import { JwtPayload } from '@/v1/modules/auth/auth.middleware';

declare global {
  namespace Express {
    interface User extends JwtPayload {}
  }
}
