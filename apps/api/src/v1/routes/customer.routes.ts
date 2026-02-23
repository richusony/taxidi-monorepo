import { Router } from 'express';
import { CustomerController } from '../handlers/customer.controller';

const router = Router();
const customerController = new CustomerController();

router.get('/sigin', customerController.sigInWithEmailAndPassword);

export default router;
