import { AdminService } from '@/v1/modules/admin/admin.service';
import { Users } from '@taxidi/database';
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
      throw error;
    }
  }

  async handleGetAllPartners(req: Request, res: Response) {
    try {
      const partners = await adminService.getAllPartners();
      return res.status(200).json(partners);
    } catch (error: any) {
      throw error;
    }
  }

  async handleUpdatePartner(req: Request, res: Response) {
    const partnerId = req.params.id as string;
    const partnerDetails = req.body as Users;

    try {
      await adminService.updatePartner(partnerId, partnerDetails);
      return res.status(200).json({ message: 'Partner details has been updated' });
    } catch (error: any) {
      throw error;
    }
  }
}
