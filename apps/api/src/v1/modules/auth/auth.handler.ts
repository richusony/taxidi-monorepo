import { Request, Response } from 'express';
import { AuthService } from '@/v1/modules/auth/auth.service';
import { SignInInputDto, SignUpInputDto } from './auth.dto';
import { UnAuthorizedError } from '@/utils/errorHandler';
import { RoleName } from '@taxidi/database';
import { ROLE_REDIRECT } from '@/config/role-redirect';

const authService = new AuthService();

export class AuthHandler {
  async signUpWithEmailAndPassword(req: Request, res: Response) {
    const data: SignUpInputDto = req.body;
    const newUser = await authService.signUp(data);

    return res.status(200).json({
      message: 'User created successfully',
      user: { id: newUser.id, email: newUser.email },
    });
  }

  async signInWithEmailAndPassword(req: Request, res: Response) {
    const data: SignInInputDto = req.body;
    const { accessToken, refreshToken, roles } = await authService.signIn(data);

    const authMode = req.headers['x-auth-mode'];

    if (authMode === 'cookie') {
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      return res.status(200).json({
        message: 'User logged in',
        accessToken,
        roles,
      });
    }

    return res.status(200).json({
      message: 'User logged in',
      accessToken,
      refreshToken,
    });
  }

  async googleCallback(req: Request, res: Response) {
    const { userId, roles } = req.user as { userId: string; roles: RoleName[] };
    const state = req.query.state as string;

    try {
      const { refreshToken, accessToken } = await authService.googleSignIn(
        userId,
        roles,
      );

      if (state === 'taxidi-mobile') {
        return res.status(200).json({
          message: 'User logged in',
          accessToken,
          refreshToken,
        });
      }

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      // user has multiple roles
      if (roles.length > 1) {
        return res.redirect(`${ROLE_REDIRECT['AUTH']}/login-as`)
      }

      return res.redirect(ROLE_REDIRECT[roles[0]]);
      // return res.status(200).json({
      //   message: 'User logged in',
      //   accessToken,
      //   roles,
      // });
    } catch (error: any) {
      throw error;
    }
  }

  async refreshSession(req: Request, res: Response) {
    const refreshToken = req.body?.refreshToken || req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnAuthorizedError('Missing token');
    }

    const { newAccessToken, newRefreshToken, roles } =
      await authService.refreshToken(refreshToken);

    const authMode = req.headers['x-auth-mode'];

    if (authMode === 'cookie') {
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      return res.json({
        accessToken: newAccessToken,
        roles,
      });
    }

    return res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  }
}
