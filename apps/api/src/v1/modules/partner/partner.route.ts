import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { authorizeRole } from '@/v1/middlewares/role.middleware';
import { RoleName } from '@taxidi/database';

const router = Router();

router.use(authMiddleware);
router.use(authorizeRole(RoleName.PARTNER));

router.get('/', (req, res) => res.status(200).json({ message: 'partner api' }));

// router.route('/vehicles')
// .get()

export default router;
