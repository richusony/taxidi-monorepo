import { prisma } from '@/lib/prisma';
import { AppError } from '@/utils/errorHandler';
import { Prisma, Role, RoleName } from '@taxidi/database';

export class AdminRepository {
  async addPartnerToDB(data: Prisma.UsersCreateInput) {
    return await prisma.$transaction(async (tx) => {
      const partner = await tx.users.create({ data });

      const partnerRole = await tx.role.findUnique({
        where: { name: RoleName.PARTNER },
      });
      if (!partnerRole)
        throw new AppError('Partner role is not added to database');

      await tx.userRole.create({
        data: {
          userId: partner.id,
          roleId: partnerRole.id,
        },
      });

      return partner;
    });
  }

  async findPartnerById(id: string) {
    return prisma.users.findUnique({
      where: { id },
      omit: { password: true },
    });
  }

  async findPartnerByEmail(email: string) {
    return prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        phone: true,
        roles: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async findPartnerByPhone(phone: string) {
    return prisma.users.findUnique({
      where: { phone },
      omit: { password: true },
    });
  }

  async getAllPartners() {
    const partnerRole = await this.findPartnerRole();
    if (!partnerRole) throw new AppError('Partner role is not set on database');

    return prisma.users.findMany({
      where: {
        roles: {
          some: {
            role: { is: { name: RoleName.PARTNER } },
          },
        },
      },
      include: { roles: true, company: true },
    });
  }

  async updatePartner(id: string, data: Prisma.UsersUpdateInput) {
    return prisma.users.update({ where: { id }, data });
  }

  async addCompanyAddress(data: Prisma.AddressCreateInput) {
    return prisma.address.create({ data });
  }

  async addCompany(companyName: string, ownerId: string) {
    return prisma.rentalCompany.create({
      data: { company_name: companyName, owner_id: ownerId },
    });
  }

  async findPartnerRole() {
    return prisma.role.findUnique({ where: { name: RoleName.PARTNER } });
  }

  async assignRoleToUser(userId: string, roleName: RoleName) {
    const role = await prisma.role.findUnique({
      where: { name: roleName },
    });

    if (!role) throw new Error('Role not found');

    return prisma.userRole.create({
      data: {
        userId,
        roleId: role.id,
      },
    });
  }
}
