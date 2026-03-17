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
import {
  AppError,
  BadRequestError,
  ForbiddenError,
} from '@/utils/errorHandler';
import { SignInInputDto, SignUpInputDto } from './auth.dto';
import { RoleName } from '@taxidi/database';

const authRepo = new AuthRepository();

export class AuthService {
  async signUp(user: SignUpInputDto) {
    const userExists = await authRepo.findUserWithEmail(user.email);
    if (userExists)
      throw new BadRequestError('Account with this email already exist');

    if (user.password) {
      const hashedPassword = await generatePasswordHash(user.password);
      if (!hashedPassword)
        throw new AppError('Error while generating password');
      user.password = hashedPassword;
    }

    const customerRole = await authRepo.findCustomerRole();
    if (!customerRole) throw new AppError('Customer role does not exist');

    return await authRepo.createCustomer({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      password: user.password,

      roles: {
        create: {
          role: {
            connect: {
              id: customerRole.id,
            },
          },
        },
      },
    });
  }

  async signIn(data: SignInInputDto) {
    const userExists = await authRepo.findUserWithEmail(data.email);
    if (!userExists) throw new BadRequestError('Invalid credentials');

    const isPasswordValid = await verifyPassword(
      userExists.password,
      data.password,
    );
    if (!isPasswordValid) throw new BadRequestError('Invalid credentials');

    const userRoles = await authRepo.fetchUserRoles(userExists.id);
    if (!userRoles)
      throw new AppError(`Could not fetch roles for user: ${userExists.email}`);

    const accessToken = generateAccessToken(userExists.id, userRoles, null);
    if (!accessToken) {
      throw new AppError('error while creating access token');
    }

    const refreshToken = generateRefreshToken(userExists.id, userRoles);
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
      hashedToken,
      REFRESH_TOKEN_EXPIRY,
    );
    if (!isRefreshTokenAddedToDB) {
      throw new AppError('error while storing refresh token to database');
    }

    return { accessToken, refreshToken, roles: userRoles };
  }

  async googleAuth(profile: any) {
    const email = profile.emails?.[0]?.value;

    let user = await authRepo.findUserWithEmail(email);

    if (!user) {
      const customerRole = await authRepo.findCustomerRole();
      if (!customerRole)
        throw new AppError('Customer role is not set on database');

      user = await authRepo.createCustomer({
        email,
        firstname: profile.name?.givenName,
        lastname: profile.name?.familyName,
        googleId: profile.id,

        roles: {
          create: {
            role: {
              connect: { id: customerRole.id },
            },
          },
        },
        password: '',
      });
    }

    const userRoles = await authRepo.fetchUserRoles(user.id);
    return { user, roles: userRoles };
  }

  async googleSignIn(userId: string, roles: RoleName[]) {
    const accessToken = generateAccessToken(userId, roles, null);
    if (!accessToken) {
      throw new AppError('error while creating access token');
    }

    const refreshToken = generateRefreshToken(userId, roles);
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
      hashedToken,
      REFRESH_TOKEN_EXPIRY,
    );
    if (!isRefreshTokenAddedToDB) {
      throw new AppError('error while storing refresh token to database');
    }

    return { refreshToken, accessToken };
  }

  async refreshToken(token: string, activeRole: RoleName) {
    const hashed = hashToken(token);
    if (!hashed || hashed == '') {
      throw new AppError('error while hashing refresh token');
    }

    const storedToken = await authRepo.findRefreshToken(hashed);
    if (!storedToken) {
      throw new AppError('Invalid refresh token');
    }

    if (process.env.NODE_ENV === 'production') {
      if (storedToken.revoked) {
        await authRepo.revokeAllRefreshTokens(storedToken.userId);
        throw new AppError('Refresh token reuse detected');
      }
    }

    const isTokenExpired = isRefreshTokenExpired(storedToken.expiresAt);
    if (isTokenExpired) {
      throw new AppError('Refresh Token expired');
    }

    const userExists = await authRepo.findUserWithUserId(storedToken.userId);
    if (!userExists) {
      throw new BadRequestError('User not found');
    }

    await authRepo.revokeRefreshToken(storedToken.id);

    const userRoles = await authRepo.fetchUserRoles(userExists.id);
    if (!userRoles)
      throw new AppError(`Could not fetch roles for user: ${userExists.email}`);

    if (!userRoles.includes(activeRole)) {
      throw new ForbiddenError('You are not allowed to access this');
    }

    const newAccessToken = generateAccessToken(
      userExists.id,
      userRoles,
      activeRole,
    );
    if (!newAccessToken) {
      throw new AppError('error while creating access token');
    }

    const newRefreshToken = generateRefreshToken(userExists.id, userRoles);
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
      hashedToken,
      REFRESH_TOKEN_EXPIRY,
    );
    if (!isRefreshTokenAddedToDB) {
      throw new AppError('error while adding refresh token to database');
    }

    return { newAccessToken, newRefreshToken, roles: userRoles };
  }
}
