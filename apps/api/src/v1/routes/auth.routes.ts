import { Router } from 'express';
import { Role } from '@taxidi/database';
import passport from '@/lib/passport';
import { AuthController } from '../handlers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

const router = Router();
const authController = new AuthController();

router.post('/signup', authController.signUpWithEmailAndPassword);

router.post('/signin', authController.signInWithEmailAndPassword);

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
  authController.googleCallback,
);

router.get(
  '/dashboard',
  authMiddleware,
  authorizeRoles(Role.ADMIN),
  authController.testController,
);

router.post('/refresh', authController.refreshSession);

export default router;
