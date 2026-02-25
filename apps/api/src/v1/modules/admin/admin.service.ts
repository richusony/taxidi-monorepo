import { Role, Users } from '@taxidi/database';
import { AdminRepository } from './admin.repo';
import { generateStrongPassword } from '@/utils/passwordGenerator';

const adminRepo = new AdminRepository();
export class AdminService {
  async createPartner(partner: Users) {
    const hashedPassword = generateStrongPassword();
    if (!hashedPassword)
      throw new Error('Error while generating password for partner account');

    partner.password = hashedPassword;
    partner.role = [Role.PARTNER];
    return await adminRepo.addPartnerToDB(partner);
  }
}
