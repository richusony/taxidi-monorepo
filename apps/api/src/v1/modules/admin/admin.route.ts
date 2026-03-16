import { Router } from 'express';
import { AdminHandler } from '@/v1/modules/admin/admin.handler';
import { validationMiddleware } from '@/v1/middlewares/validate.middleware';
import { partnerSchema } from '@taxidi/shared-logic';
import { authorizeRole } from '@/v1/middlewares/role.middleware';
import { RoleName } from '@taxidi/database';
import { authMiddleware } from '@/v1/modules/auth/auth.middleware';

const router = Router();
const adminHandler = new AdminHandler();

router.use(authMiddleware);
router.use(authorizeRole(RoleName.ADMIN));

router.get('/', (_, res) => res.status(200).json({ message: 'admin api' }));

router
  .route('/partners')
  .get(adminHandler.handleGetAllPartners)
  .post(
    validationMiddleware(partnerSchema),
    adminHandler.handlePartnerAccountCreation,
  );

router
  .route('/partners/:id')
  .get(adminHandler.handleGetPartnerDetails)
  .patch(validationMiddleware(partnerSchema), adminHandler.handleUpdatePartner);

export default router;
