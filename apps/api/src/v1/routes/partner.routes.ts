import { Router } from 'express';
import { PartnerController } from '../handlers/partner.controller';

const router = Router();
const partnerController = new PartnerController();

router.get('/add-vehicle', partnerController.addVehicle);

export default router;
