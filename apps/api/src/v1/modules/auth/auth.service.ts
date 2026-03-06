import { Users } from '@taxidi/database';
import { AuthRepository } from '@/v1/modules/auth/auth.repo';
import {
  generatePasswordHash,
  verifyPassword,
} from '@/utils/passwordGenerator';
import {
  generateAccessToken,
  generateRefreshToken,
  generateRefreshTokenExpiry,
  hashToken,
  isRefreshTokenExpired,
} from '@/utils/token-helper';
import { AppError, BadRequestError } from '@/utils/errorHandler';

const authRepo = new AuthRepository();

export class AuthService {
  async signUp(user: Users) {
    const userExists = await authRepo.findUserWithEmail(user.email);
    if (userExists)
      throw new BadRequestError('Account with this email already exist');

    if (user.password) {
      const hashedPassword = await generatePasswordHash(user.password);
      if (!hashedPassword)
        throw new AppError('Error while generating password');
      user.password = hashedPassword;
    }

    return await authRepo.createCustomer(user);
  }

  async signIn(email: string, password: string) {
    const userExists = await authRepo.findUserWithEmail(email);
    if (!userExists) throw new BadRequestError('Invalid credentials');

    const isPasswordValid = await verifyPassword(userExists.password, password);
    if (!isPasswordValid) throw new BadRequestError('Invalid credentials');

    const accessToken = generateAccessToken(userExists.id, userExists.role[0]);
    if (!accessToken) {
      throw new AppError('error while creating access token');
    }

    const refreshToken = generateRefreshToken(
      userExists.id,
      userExists.role[0],
    );
    if (!refreshToken) {
      throw new AppError('error while creating refresh token');
    }

    const REFRESH_TOKEN_EXPIRY = generateRefreshTokenExpiry();
    if (!REFRESH_TOKEN_EXPIRY)
      throw new AppError('Error while generating refresh token expiry');

    const hashedToken = hashToken(refreshToken);
    if (!hashedToken) throw new AppError('Error while hashing refresh token');

    const isRefreshTokenAddedToDB = await authRepo.addRefreshTokenToDB(
      userExists.id,
      REFRESH_TOKEN_EXPIRY,
      hashedToken,
    );
    if (!isRefreshTokenAddedToDB) {
      throw new AppError('error while storing refresh token to database');
    }

    return { accessToken, refreshToken, role: userExists.role[0] };
  }

  async googleSignIn(userId: string, role: string) {
    const refreshToken = generateRefreshToken(userId, role);
    if (!refreshToken) {
      throw new AppError('error while creating refresh token');
    }

    const REFRESH_TOKEN_EXPIRY = generateRefreshTokenExpiry();
    if (!REFRESH_TOKEN_EXPIRY)
      throw new AppError('Error while generating refresh token expiry');

    const hashedToken = hashToken(refreshToken);
    if (!hashedToken) throw new AppError('Error while hashing refresh token');

    const isRefreshTokenAddedToDB = await authRepo.addRefreshTokenToDB(
      userId,
      REFRESH_TOKEN_EXPIRY,
      hashedToken,
    );
    if (!isRefreshTokenAddedToDB) {
      throw new AppError('error while storing refresh token to database');
    }

    return { refreshToken };
  }

  async refreshToken(token: string) {
    const hashed = hashToken(token);
    if (!hashed || hashed == '') {
      throw new AppError('error while hashing refresh token');
    }

    const storedToken = await authRepo.findRefreshToken(hashed);
    if (!storedToken) {
      throw new AppError('Invalid refresh token');
    }

    if (storedToken.revoked) {
      await authRepo.revokeAllRefreshTokens(storedToken.userId);
      throw new AppError('Refresh token reuse detected');
    }

    const isTokenExpired = isRefreshTokenExpired(storedToken.expiresAt);
    if (isTokenExpired) {
      throw new AppError('Refresh Token expired');
    }

    const userExists = await authRepo.findUserWithUserId(storedToken.userId);
    if (!userExists) {
      throw new BadRequestError('User not found');
    }

    await authRepo.rotateRefreshToken(storedToken.id);

    const newAccessToken = generateAccessToken(
      userExists.id,
      userExists.role[0],
    );
    if (!newAccessToken) {
      throw new AppError('error while creating access token');
    }

    const newRefreshToken = generateRefreshToken(
      userExists.id,
      userExists.role[0],
    );
    if (!newRefreshToken) {
      throw new AppError('error while creating refresh token');
    }

    const REFRESH_TOKEN_EXPIRY = generateRefreshTokenExpiry();
    if (!REFRESH_TOKEN_EXPIRY)
      throw new AppError('Error while generating refresh token expiry');

    const hashedToken = hashToken(newRefreshToken);
    if (!hashedToken) throw new AppError('Error while hashing refresh token');

    const isRefreshTokenAddedToDB = await authRepo.addRefreshTokenToDB(
      userExists.id,
      REFRESH_TOKEN_EXPIRY,
      hashedToken,
    );
    if (!isRefreshTokenAddedToDB) {
      throw new AppError('error while adding refresh token to database');
    }

    return { newAccessToken, newRefreshToken, role: userExists.role[0] };
  }
}
