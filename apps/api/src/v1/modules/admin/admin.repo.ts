import { prisma } from '@/lib/prisma';
import { Users } from '@taxidi/database';

export class AdminRepository {
  async addPartnerToDB(partner: Users) {
    return await prisma.users.create({ data: partner });
  }

  async findPartnerById(id: string) {
    return await prisma.users.findUnique({ where: { id } });
  }

  async findPartnerByEmail(email: string) {
    return await prisma.users.findUnique({ where: { email } });
  }
}
