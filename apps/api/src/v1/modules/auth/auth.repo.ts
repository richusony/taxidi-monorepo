import { prisma } from '@/lib/prisma';
import { generatePassword } from '@/utils/passwordGenerator';
import { generateRefreshTokenExpiry, hashToken } from '@/utils/token-helper';
import { Role, Users } from '@taxidi/database';

export class AuthRepository {
  async findUserWithUserId(userId: string) {
    return await prisma.users.findUnique({ where: { id: userId } });
  }

  async findUserWithEmail(email: string) {
    return await prisma.users.findUnique({ where: { email } });
  }

  async createCustomer(user: Users) {
    let hashedPassword = '';
    if (user.password) {
      hashedPassword = await generatePassword(user.password);
      if (!hashedPassword) throw new Error('Error while generating password');
    }

    return await prisma.users.create({
      data: {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        password: hashedPassword,
        role: { set: [Role.CUSTOMER] },
      },
    });
  }

  async addRefreshTokenToDB(userId: string, refreshToken: string) {
    const REFRESH_TOKEN_EXPIRY = generateRefreshTokenExpiry();
    if (!REFRESH_TOKEN_EXPIRY)
      throw new Error('Error while generating refresh token expiry');

    // Optional: Limit active sessions
    // await prisma.refreshToken.deleteMany({
    //   where: { userId: userExists.id },
    // });

    return await prisma.refreshToken.create({
      data: {
        tokenHash: hashToken(refreshToken),
        userId: userId,
        expiresAt: REFRESH_TOKEN_EXPIRY,
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
