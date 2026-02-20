import { Request, Response } from 'express';

export class PartnerController {
  addVehicle(req: Request, res: Response) {
    return res.json({ message: 'reached partner controller!!' });
  }
}
