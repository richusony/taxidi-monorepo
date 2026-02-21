import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from '@/lib/prisma';
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from '@/utils/token-helper';
import dayjs from 'dayjs';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;

        if (!email) {
          return done(null, false);
        }

        let user = await prisma.users.findUnique({
          where: { email },
        });

        if (!user) {
          user = await prisma.users.create({
            data: {
              email,
              firstname: profile.name?.givenName || '',
              lastname: profile.name?.familyName || '',
              password: '',
              role: { set: ['CUSTOMER'] },
            },
          });
        }

        const accessToken = generateAccessToken(user.id, user.role[0]);

        const refreshToken = generateRefreshToken(user.id, user.role[0]);

        await prisma.refreshToken.create({
          data: {
            tokenHash: hashToken(refreshToken),
            userId: user.id,
            expiresAt: dayjs().add(7, 'day').toDate(),
          },
        });

        return done(null, {
          accessToken,
          refreshToken,
          role: user.role[0],
        });
      } catch (err) {
        return done(err as any, undefined);
      }
    },
  ),
);

export default passport;
