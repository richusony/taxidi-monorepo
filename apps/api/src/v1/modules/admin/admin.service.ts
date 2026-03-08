import { Role, Users } from '@taxidi/database';
import { cacheWrapper } from '@taxidi/redis-cache';
import { AdminRepository } from '@/v1/modules/admin/admin.repo';
import {
  generatePasswordHash,
  generateStrongPassword,
} from '@/utils/passwordGenerator';
import { AppError, BadRequestError, NotFoundError } from '@/utils/errorHandler';

const adminRepo = new AdminRepository();
export class AdminService {
  async createPartner(partner: Users) {
    const partnerExistsWithEmail = await adminRepo.findPartnerByEmail(
      partner.email,
    );
    if (partnerExistsWithEmail)
      throw new BadRequestError('Partner with this email already exist');

    const generatedPassword = generateStrongPassword();
    if (!generatedPassword)
      throw new AppError('Error while generating password for partner account');

    const hashedPassword = await generatePasswordHash(generatedPassword);
    if (!hashedPassword)
      throw new AppError('Error while hashing password for partner account');

    partner.password = hashedPassword;
    partner.role = [Role.PARTNER];
    return await adminRepo.addPartnerToDB(partner);
  }

  async getAllPartners() {
    const cacheKey = "partners:list";

    // const partners = await adminRepo.getAllPartners();
    const partners = await cacheWrapper(cacheKey, 60, adminRepo.getAllPartners);
    if (!partners) throw new AppError('Error while fetching partners');
    
    return partners;
  }

  async updatePartner(id: string, partner: Users) {
    if (id == '' || id == undefined)
      throw new BadRequestError('Missing required fields');

    const partnerExists = await adminRepo.findPartnerById(id.trim());
    if (!partnerExists) throw new NotFoundError('Partner does not exist');

    if (partnerExists.email !== partner.email) {
      const emailExists = await adminRepo.findPartnerByEmail(partner.email);
      if (emailExists) throw new BadRequestError('This email is already taken');
    }

    if (partner.phone && partnerExists.phone !== partner.phone) {
      const phoneExists = await adminRepo.findPartnerByPhone(partner.phone);
      if (phoneExists) throw new BadRequestError('This phone number is already taken');
    }

    return await adminRepo.updatePartner(partnerExists.id, partner);
  }
}
