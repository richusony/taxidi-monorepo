import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import express from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import passport from '@/lib/passport';
import session from 'express-session';

import authRouter from '@/v1/modules/auth/auth.route';
import adminRouter from '@/v1/modules/admin/admin.route';
import partnerRouter from '@/v1/modules/partner/partner.route';
import customerRouter from '@/v1/modules/customer/customer.route';
import bookinRouter from '@/v1/modules/booking/booking.route';

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    const req = this as express.Request;

    // ✅ DEV MODE → allow everything
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    // ✅ PRODUCTION RULES

    if (!origin) {
      if (req.headers['user-agent']?.includes('TaxidiMobile')) {
        return callback(null, true);
      }

      return callback(new Error('Origin required'));
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('CORS not allowed'));
  },

  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'taxidi-secret',
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

app.listen(PORT, () => {
  console.log(`✅ Server running on port: ${PORT}`);
});
