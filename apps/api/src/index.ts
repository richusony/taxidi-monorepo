import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import passport from '@/lib/passport/index';
import session from 'express-session';

import authRouter from '@v1/modules/auth/auth.route';
import adminRouter from '@v1/modules/admin/admin.route';
import partnerRouter from '@/v1/modules/partner/partner.route';
import customerRouter from '@v1/modules/customer/customer.route';
import bookinRouter from '@v1/modules/booking/booking.route';
import { logger } from '@lib/pino';

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];

const corsOptionsDelegate = (req: Request): CorsOptions => {
  const origin = req.header('origin');

  // ✅ DEV MODE
  if (process.env.NODE_ENV !== 'production') {
    return {
      origin: true,
      credentials: true,
    };
  }

  // ✅ PRODUCTION RULES

  if (!origin) {
    const userAgent = req.header('user-agent');

    if (userAgent?.includes('TaxidiMobile')) {
      return { origin: true, credentials: true };
    }

    return { origin: false };
  }

  if (allowedOrigins.includes(origin)) {
    return { origin: true, credentials: true };
  }

  return { origin: false };
};

app.use((req, res, next) => {
  cors(corsOptionsDelegate(req))(req, res, next);
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', customerRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/partner', partnerRouter);
app.use('/api/v1/booking', bookinRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(error?.message);
  console.error(error?.message);
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    error:
      statusCode === 500
        ? 'Something went wrong. Please try again later!'
        : error?.message,
  });
});

app.listen(PORT, () => {
  logger.info(`Server running on port: ${PORT}`);
});
