import { AdminService } from '@/v1/modules/admin/admin.service';
import { Request, Response } from 'express';

const adminService = new AdminService();

export class AdminHandler {
  async handlePartnerAccountCreation(req: Request, res: Response) {
    try {
      const newPartner = await adminService.createPartner(req.body);
      return res.status(201).json({
        message: 'Partner Account created successfully',
        partner: { id: newPartner.id, email: newPartner.email },
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: error?.message || 'Internal server error' });
    }
  }

  async handleGetAllPartners(req: Request, res: Response) {
    try {
      const partners = await adminService.getAllPartners();
      return res.status(200).json(partners);
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: error?.message || 'Internal server error' });
    }
  }
}
