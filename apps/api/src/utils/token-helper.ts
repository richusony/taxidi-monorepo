import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '@/v1/modules/auth/auth.middleware';
import dayjs from 'dayjs';
import { randomUUID } from 'crypto';
import { RoleName } from '@taxidi/database';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export function generateAccessToken(
  userId: string,
  roles: RoleName[],
  activeRole: RoleName | null,
) {
  return jwt.sign(
    { userId, roles, activeRole, jti: randomUUID() },
    ACCESS_TOKEN_SECRET!,
    {
      expiresIn: '5m',
    },
  );
}

export function generateRefreshToken(userId: string, roles: RoleName[]) {
  return jwt.sign({ userId, roles, jti: randomUUID() }, REFRESH_TOKEN_SECRET!, {
    expiresIn: '1h',
  });
}

export function accessTokenVerfier(token: string) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET!) as JwtPayload;
}

export function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function generateRefreshTokenExpiry() {
  return dayjs().add(1, 'hours').toDate();
}

export function isRefreshTokenExpired(tokenDate: Date) {
  return dayjs().isAfter(tokenDate);
}
