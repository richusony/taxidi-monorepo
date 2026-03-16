import { prisma } from '@/lib/prisma';
import { Prisma, RoleName } from '@taxidi/database';

export class AuthRepository {
  async findUserWithUserId(userId: string) {
    return prisma.users.findUnique({ where: { id: userId } });
  }

  async findUserWithEmail(email: string) {
    return prisma.users.findUnique({ where: { email } });
  }

  async createCustomer(data: Prisma.UsersCreateInput) {
    return prisma.users.create({ data });
  }

  async findCustomerRole() {
    return prisma.role.findUnique({ where: { name: RoleName.CUSTOMER } });
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

  async fetchUserRoles(userId: string) {
    const roles = await prisma.userRole.findMany({
      where: { userId },
      select: {
        role: {
          select: { name: true },
        },
      },
    });

    return roles.map((r) => r.role.name);
  }

  async addRefreshTokenToDB(
    userId: string,
    tokenHash: string,
    tokenExpiry: Date,
  ) {
    // Optional: Limit active sessions
    // prisma.refreshToken.deleteMany({
    //   where: { userId: userExists.id },
    // });

    return prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt: tokenExpiry,
      },
    });
  }

  async findRefreshToken(hashedToken: string) {
    return prisma.refreshToken.findUnique({
      where: { tokenHash: hashedToken },
    });
  }

  async revokeRefreshToken(tokenId: string) {
    return prisma.refreshToken.update({
      where: { id: tokenId },
      data: { revoked: true },
    });
  }

  async revokeAllRefreshTokens(userId: string) {
    // 🚨 Reuse attack → revoke ALL sessions
    return prisma.refreshToken.updateMany({
      where: { userId },
      data: { revoked: true },
    });
  }
}
