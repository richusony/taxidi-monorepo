import { Router } from 'express';
import { AdminController } from '@/v1/handlers/admin.controller';

const router = Router();
const adminController = new AdminController();

router.post('/login', adminController.login);

export default router;
