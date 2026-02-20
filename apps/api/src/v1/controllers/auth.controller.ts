import dayjs from "dayjs";
import argon2 from "argon2";
import { prisma } from "@/lib/prisma";
import { Request, Response } from "express";
import { signInSchema, signUpSchema } from "@taxidi/shared-logic";
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from "@/utils/token-helper";

export class AuthController {
  testController(req: Request, res: Response) {
    return res.status(200).json({ message: 'it worked'});
  }

  async signUpWithEmailAndPassword(req: Request, res: Response) {
    const validation = signUpSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        error: validation.error,
      });
    }

    const { email, firstname, password, phone, lastname } = validation.data;

    try {
      const hashedPassword = await argon2.hash(password);

      const newUser = await prisma.users.create({
        data: {
          email,
          firstname,
          lastname,
          password: hashedPassword,
          role: { set: ["CUSTOMER"] },
          phone,
        },
      });

      return res.status(200).json({
        message: "User created successfully",
        user: { id: newUser.id, email: newUser.email },
      });
    } catch (error) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  async signInWithEmailAndPassword(req: Request, res: Response) {
    const validation = signInSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        error: validation.error,
      });
    }

    const { email, password } = validation.data;

    try {
      const userExists = await prisma.users.findUnique({
        where: { email },
      });

      if (!userExists) {
        return res.status(403).json({
          error: "Invalid credentials",
        });
      }

      const passwordVerified = await argon2.verify(
        userExists.password,
        password,
      );

      if (!passwordVerified) {
        return res.status(403).json({
          error: "Invalid credentials",
        });
      }

      const accessToken = generateAccessToken(
        userExists.id,
        userExists.role[0],
      );

      const refreshToken = generateRefreshToken(
        userExists.id,
        userExists.role[0],
      );

      // Optional: Limit active sessions
      // await prisma.refreshToken.deleteMany({
      //   where: { userId: userExists.id },
      // });

      await prisma.refreshToken.create({
        data: {
          tokenHash: hashToken(refreshToken),
          userId: userExists.id,
          expiresAt: dayjs().add(7, "day").toDate(),
        },
      });

      const authMode = req.headers["x-auth-mode"];

      if (authMode === "cookie") {
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });

        return res.status(200).json({
          message: "User logged in",
          accessToken,
        });
      }

      return res.status(200).json({
        message: "User logged in",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  async refreshSession(req: Request, res: Response) {
    try {
      const refreshToken = req.body?.refreshToken || req.cookies?.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          error: "Missing refresh token",
        });
      }

      const hashed = hashToken(refreshToken);

      const storedToken = await prisma.refreshToken.findUnique({
        where: { tokenHash: hashed },
      });

      if (!storedToken) {
        return res.status(403).json({
          error: "Invalid refresh token",
        });
      }

      if (storedToken.revoked) {
        // 🚨 Reuse attack → revoke ALL sessions
        await prisma.refreshToken.updateMany({
          where: { userId: storedToken.userId },
          data: { revoked: true },
        });

        return res.status(403).json({
          error: "Refresh token reuse detected",
        });
      }

      if (dayjs().isAfter(storedToken.expiresAt)) {
        return res.status(403).json({
          error: "Refresh token expired",
        });
      }

      const user = await prisma.users.findUnique({
        where: { id: storedToken.userId },
      });

      if (!user) {
        return res.status(403).json({
          error: "User not found",
        });
      }
      // 🔥 ROTATION
      await prisma.refreshToken.update({
        where: { id: storedToken.id },
        data: { revoked: true },
      });

      const newAccessToken = generateAccessToken(user.id, user.role[0]);

      const newRefreshToken = generateRefreshToken(user.id, user.role[0]);

      await prisma.refreshToken.create({
        data: {
          tokenHash: hashToken(newRefreshToken),
          userId: user.id,
          expiresAt: dayjs().add(7, "day").toDate(),
        },
      });

      const authMode = req.headers["x-auth-mode"];

      if (authMode === "cookie") {
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });

        return res.json({
          accessToken: newAccessToken,
        });
      }

      return res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }
}
