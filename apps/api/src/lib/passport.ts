import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from '@/lib/prisma';

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

        return done(null, {
          userId: user.id,
          role: user.role[0],
        });
      } catch (err) {
        return done(err as any, undefined);
      }
    },
  ),
);

export default passport;
