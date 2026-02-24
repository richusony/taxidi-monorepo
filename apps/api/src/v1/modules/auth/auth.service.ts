import { Users } from '@taxidi/database';
import { AuthRepository } from '@/v1/modules/auth/auth.repo';
import { generatePassword, verifyPassword } from '@/utils/passwordGenerator';
import {
  generateAccessToken,
  generateRefreshToken,
  generateRefreshTokenExpiry,
  hashToken,
  isRefreshTokenExpired,
} from '@/utils/token-helper';

const authRepo = new AuthRepository();

export class AuthService {
  async signUp(user: Users) {
    const userExists = await authRepo.findUserWithEmail(user.email);
    if (userExists) throw new Error('Account with this email already exist');

    if (user.password) {
      const hashedPassword = await generatePassword(user.password);
      if (!hashedPassword) throw new Error('Error while generating password');
      user.password = hashedPassword;
    }

    return await authRepo.createCustomer(user);
  }

  async signIn(email: string, password: string) {
    const userExists = await authRepo.findUserWithEmail(email);
    if (!userExists) throw new Error('Invalid credentials');

    const isPasswordValid = await verifyPassword(userExists.password, password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const accessToken = generateAccessToken(userExists.id, userExists.role[0]);
    if (!accessToken) {
      console.log('error while creating access token');
      throw new Error('Internal server error');
    }

    const refreshToken = generateRefreshToken(
      userExists.id,
      userExists.role[0],
    );
    if (!refreshToken) {
      console.log('error while creating refresh token');
      throw new Error('Internal server error');
    }

    const REFRESH_TOKEN_EXPIRY = generateRefreshTokenExpiry();
    if (!REFRESH_TOKEN_EXPIRY)
      throw new Error('Error while generating refresh token expiry');

    const hashedToken = hashToken(refreshToken);
    if (!hashedToken) throw new Error('Error while hashing refresh token');

    const isRefreshTokenAddedToDB = await authRepo.addRefreshTokenToDB(
      userExists.id,
      REFRESH_TOKEN_EXPIRY,
      hashedToken,
    );
    if (!isRefreshTokenAddedToDB) {
      console.log('error while storing refresh token to database');
      throw new Error('Internal server error');
    }

    return { accessToken, refreshToken, role: userExists.role[0] };
  }

  async googleSignIn(userId: string, role: string) {
    const refreshToken = generateRefreshToken(userId, role);
    if (!refreshToken) {
      console.log('error while creating refresh token');
      throw new Error('Internal server error');
    }

    const REFRESH_TOKEN_EXPIRY = generateRefreshTokenExpiry();
    if (!REFRESH_TOKEN_EXPIRY)
      throw new Error('Error while generating refresh token expiry');

    const hashedToken = hashToken(refreshToken);
    if (!hashedToken) throw new Error('Error while hashing refresh token');

    const isRefreshTokenAddedToDB = await authRepo.addRefreshTokenToDB(
      userId,
      REFRESH_TOKEN_EXPIRY,
      hashedToken,
    );
    if (!isRefreshTokenAddedToDB) {
      console.log('error while storing refresh token to database');
      throw new Error('Internal server error');
    }

    return { refreshToken };
  }

  async refreshToken(token: string) {
    const hashed = hashToken(token);
    if (!hashed || hashed == '') {
      console.log('error while hashing refresh token');
      throw new Error('Internal server error');
    }

    const storedToken = await authRepo.findRefreshToken(hashed);
    if (!storedToken) {
      console.log('Invalid refresh token');
      throw new Error('Internal server error');
    }

    if (storedToken.revoked) {
      await authRepo.revokeAllRefreshTokens(storedToken.userId);
      console.log('Refresh token reuse detected');
      throw new Error('Internal server error');
    }

    const isTokenExpired = isRefreshTokenExpired(storedToken.expiresAt);
    if (isTokenExpired) {
      console.log('Refresh Token expired');
      throw new Error('Internal server error');
    }

    const userExists = await authRepo.findUserWithUserId(storedToken.userId);
    if (!userExists) {
      throw new Error('User not found');
    }

    await authRepo.rotateRefreshToken(storedToken.id);

    const newAccessToken = generateAccessToken(
      userExists.id,
      userExists.role[0],
    );
    if (!newAccessToken) {
      console.log('error while creating access token');
      throw new Error('Internal server error');
    }

    const newRefreshToken = generateRefreshToken(
      userExists.id,
      userExists.role[0],
    );
    if (!newRefreshToken) {
      console.log('error while creating refresh token');
      throw new Error('Internal server error');
    }

    const REFRESH_TOKEN_EXPIRY = generateRefreshTokenExpiry();
    if (!REFRESH_TOKEN_EXPIRY)
      throw new Error('Error while generating refresh token expiry');

    const hashedToken = hashToken(newRefreshToken);
    if (!hashedToken) throw new Error('Error while hashing refresh token');

    const isRefreshTokenAddedToDB = await authRepo.addRefreshTokenToDB(
      userExists.id,
      REFRESH_TOKEN_EXPIRY,
      hashedToken,
    );
    if (!isRefreshTokenAddedToDB) {
      console.log('error while adding refresh token to database');
      throw new Error('Internal server error');
    }

    return { newAccessToken, newRefreshToken, role: userExists.role[0] };
  }
}
