import { Address, RentalCompany, Role, Users } from '@taxidi/database';
import { cacheWrapper } from '@taxidi/redis-cache';
import { AdminRepository } from '@/v1/modules/admin/admin.repo';
import {
  generatePasswordHash,
  generateStrongPassword,
} from '@/utils/passwordGenerator';
import { AppError, BadRequestError, NotFoundError } from '@/utils/errorHandler';
import { createCompanyDto } from './admin.dto';
import { SignUpInputDto } from '../auth/auth.dto';

const adminRepo = new AdminRepository();
export class AdminService {
  async createPartner(partner: SignUpInputDto) {
    const partnerExistsWithEmail = await adminRepo.findPartnerByEmail(
      partner.email,
    );
    console.log(partner);
    if (partnerExistsWithEmail)
      throw new BadRequestError('Partner with this email already exist');

    const generatedPassword = generateStrongPassword();
    if (!generatedPassword)
      throw new AppError('Error while generating password for partner account');

    const hashedPassword = await generatePasswordHash(generatedPassword);
    if (!hashedPassword)
      throw new AppError('Error while hashing password for partner account');

    partner.password = hashedPassword;
    const adminDetails = await adminRepo.addPartnerToDB(partner);
    if (!adminDetails) throw new AppError('Error while creating partner');
    return adminDetails;
  }

  async getPartner(id: string) {
    const cacheKey = `partner:id:${id}`;

    /* redis-cache-wrapper will check cache exists,
       if true return cache, else evoke and return
       value from adminRepo.getPartner and cache
      for 60 sec
    */
    const partner = await cacheWrapper(cacheKey, 60, () => adminRepo.findPartnerById(id));
    if (!partner) throw new AppError('Error while fetching partner details');

    return partner;
  }

  async getAllPartners() {
    const cacheKey = 'partners:list';

    /* redis-cache-wrapper will check cache exists,
       if true return cache, else evoke and return
       value from adminRepo.getAllPartners and cache
      for 60 sec
    */
    const partners = await cacheWrapper(cacheKey, 60, () => adminRepo.getAllPartners());
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
      if (phoneExists)
        throw new BadRequestError('This phone number is already taken');
    }

    return await adminRepo.updatePartner(partnerExists.id, partner);
  }

  async addCompany(data: createCompanyDto) {
    if (!data.company_name) throw new BadRequestError("Company name is required");
    if (!data.owner) throw new BadRequestError("Please select owner of the company");

    const ownerExists = await adminRepo.findPartnerById(data.owner);
    if(!ownerExists) throw new NotFoundError("This partner doesn't exist");


    return await adminRepo.addCompany(data.company_name, data.owner);
  }

  async addCompanyAddress(address: Address) {
    return await adminRepo.addCompanyAddress(address);
  }
}
