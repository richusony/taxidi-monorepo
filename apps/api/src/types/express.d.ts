import { JwtPayload } from '@/v1/middlewares/auth.middleware';

declare global {
  namespace Express {
    interface User extends JwtPayload {}

  }
}
