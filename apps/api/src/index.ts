import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from "express";
import cookieParser from 'cookie-parser';
import authRouter from "@/v1/routes/auth.routes";
import adminRouter from "@/v1/routes/admin.routes";
import partnerRouter from "@/v1/routes/partner.routes";
import customerRouter from "@/v1/routes/customer.routes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', customerRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/partner', partnerRouter);

app.listen(PORT, ()=>{
    console.log(`✅ Server running on port: ${PORT}`);
});