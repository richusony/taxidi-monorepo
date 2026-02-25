import { Router } from 'express';
import { AdminHandler } from './admin.handler';
import { validationMiddleware } from '@/v1/middlewares/validate.middleware';
import { partnerSchema } from '@taxidi/shared-logic';

const router = Router();
const adminHandler = new AdminHandler();

router.get('/', (req, res) => res.status(200).json({ message: 'admin api' }));

router.post(
  '/create-partner',
  validationMiddleware(partnerSchema),
  adminHandler.handlePartnerAccountCreation,
);

export default router;
