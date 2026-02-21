import { Router } from 'express';
import { Role } from '@taxidi/database';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

const router = Router();
const authController = new AuthController();

router.post('/signup', authController.signUpWithEmailAndPassword);

router.post('/signin', authController.signInWithEmailAndPassword);

router.get(
  '/dashboard',
  authMiddleware,
  authorizeRoles(Role.ADMIN),
  authController.testController,
);

router.post('/refresh', authController.refreshSession);

export default router;
