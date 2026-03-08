import { prisma } from '@/lib/prisma';
import { Role, Users } from '@taxidi/database';

export class AdminRepository {
  async addPartnerToDB(partner: Users) {
    return await prisma.users.create({ data: partner });
  }

  async findPartnerById(id: string) {
    return await prisma.users.findUnique({
      where: { id },
      omit: { password: true },
    });
  }

  async findPartnerByEmail(email: string) {
    return await prisma.users.findUnique({
      where: { email },
      omit: { password: true },
    });
  }

  async findPartnerByPhone(phone: string) {
    return await prisma.users.findUnique({
      where: { phone },
      omit: { password: true },
    });
  }

  async getAllPartners() {
    return await prisma.users.findMany({
      where: { role: { has: Role.PARTNER } },
      omit: { password: true },
    });
  }

  async updatePartner(id:string, partner: Users) {
    return await prisma.users.update({ where: { id }, data: partner });
  }
}
