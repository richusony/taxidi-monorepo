import crypto from "crypto";
import jwt from "jsonwebtoken";
import { JwtPayload } from "@/v1/middlewares/auth.middleware";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export function generateAccessToken(userId: string, role: string) {
  return jwt.sign(
    { userId, role },
    ACCESS_TOKEN_SECRET!,
    { expiresIn: "1m" }
  );
}

export function generateRefreshToken(userId: string, role: string) {
  return jwt.sign(
    { userId, role },
    REFRESH_TOKEN_SECRET!,
    { expiresIn: "2m" }
  );
}

export function accessTokenVerfier(token: string) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET!) as JwtPayload
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}