import { Router } from 'express';
import passport from '@/lib/passport/index';
import { AuthHandler } from '@/v1/modules/auth/auth.handler';
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

router.get('/google', (req, res, next) => {
  const state =
    typeof req.query.state === 'string' ? req.query.state : 'taxidi-web';

  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state,
    session: false,
  })(req, res, next);
});

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: process.env.AUTH_WEB_URL,
  }),
  authHandler.googleCallback,
);

router.post('/refresh', authHandler.refreshSession);

export default router;
