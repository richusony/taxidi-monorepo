import { prisma } from '@/lib/prisma';
import { Role, Users } from '@taxidi/database';

export class AuthRepository {
  async findUserWithUserId(userId: string) {
    return await prisma.users.findUnique({ where: { id: userId } });
  }

  async findUserWithEmail(email: string) {
    return await prisma.users.findUnique({ where: { email } });
  }

  async createCustomer(user: Users) {
    return await prisma.users.create({
      data: {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password,
        role: { set: [Role.CUSTOMER] },
      },
    });
  }

  async addRefreshTokenToDB(userId: string, expiry: Date, hashedToken: string) {
    // Optional: Limit active sessions
    // await prisma.refreshToken.deleteMany({
    //   where: { userId: userExists.id },
    // });

    return await prisma.refreshToken.create({
      data: {
        tokenHash: hashedToken,
        userId: userId,
        expiresAt: expiry,
      },
    });
  }

  async findRefreshToken(hashedToken: string) {
    return await prisma.refreshToken.findUnique({
      where: { tokenHash: hashedToken },
    });
  }

  async rotateRefreshToken(tokenId: string) {
    // 🔥 ROTATION
    return await prisma.refreshToken.update({
      where: { id: tokenId },
      data: { revoked: true },
    });
  }

  async revokeAllRefreshTokens(userId: string) {
    // 🚨 Reuse attack → revoke ALL sessions
    return await prisma.refreshToken.updateMany({
      where: { userId },
      data: { revoked: true },
    });
  }
}
