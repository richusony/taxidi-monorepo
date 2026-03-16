// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { prisma } from '@/lib/prisma';

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
//     },
//     async (_accessToken, _refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0].value;

//         if (!email) {
//           return done(null, false);
//         }

//         const user = await prisma.users.upsert({
//           where: { email },
//           update: {},
//           create: {
//             email,
//             firstname: profile.name?.givenName || '',
//             lastname: profile.name?.familyName || '',
//             password: '',
//             roles: { create: { role: { connect: { id: '' } } } },
//           },
//         });

//         return done(null, {
//           userId: user.id,
//           role: user.role[0],
//         });
//       } catch (err) {
//         return done(err as any, undefined);
//       }
//     },
//   ),
// );

// export default passport;

// ========================= Testing Google Auth =====================================
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { AuthService } from '@/v1/modules/auth/auth.service';
import { AppError } from '@/utils/errorHandler';

const authService = new AuthService();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.API_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { user, roles } = await authService.googleAuth(profile);
        done(null, { userId: user.id, roles: roles });
      } catch (error) {
        done(error as Error, undefined);
      }
    },
  ),
);
