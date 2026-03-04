import { Role, Users } from '@taxidi/database';
import { AdminRepository } from '@/v1/modules/admin/admin.repo';
import {
  generatePasswordHash,
  generateStrongPassword,
} from '@/utils/passwordGenerator';

const adminRepo = new AdminRepository();
export class AdminService {
  async createPartner(partner: Users) {
    const partnerExistsWithEmail = await adminRepo.findPartnerByEmail(
      partner.email,
    );
    if (partnerExistsWithEmail)
      throw new Error('Partner with this email already exist');

    const generatedPassword = generateStrongPassword();
    if (!generatedPassword)
      throw new Error('Error while generating password for partner account');

    const hashedPassword = await generatePasswordHash(generatedPassword);
    if (!hashedPassword)
      throw new Error('Error while hashing password for partner account');

    partner.password = hashedPassword;
    partner.role = [Role.PARTNER];
    return await adminRepo.addPartnerToDB(partner);
  }

  async getAllPartners() {
    const partners = await adminRepo.getAllPartners();
    if (!partners) throw new Error('Error while fetching all partners');

    return partners;
  }
}
