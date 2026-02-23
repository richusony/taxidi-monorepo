import { Router } from 'express';
import { Role } from '@taxidi/database';
import passport from '@/lib/passport';
import { AuthHandler } from '@/v1/modules/auth/auth.handler';
import { authMiddleware } from '@/v1/modules/auth/auth.middleware';
import { authorizeRoles } from '@/v1/middlewares/role.middleware';
import { signInSchema, signUpSchema } from '@taxidi/shared-logic';
import { validationMiddleware } from '@/v1/middlewares/validate.middleware';

const router = Router();
const authHandler = new AuthHandler();

router.post(
  '/signup',
  validationMiddleware(signUpSchema),
  authHandler.signUpWithEmailAndPassword,
);

router.post(
  '/signin',
  validationMiddleware(signInSchema),
  authHandler.signInWithEmailAndPassword,
);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: process.env.AUTH_WEB_URL,
  }),
  authHandler.googleCallback,
);

router.get(
  '/dashboard',
  authMiddleware,
  authorizeRoles(Role.ADMIN),
  authHandler.test,
);

router.post('/refresh', authHandler.refreshSession);

export default router;
