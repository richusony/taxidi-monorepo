import { Request, Response } from 'express';
import { ROLE_REDIRECT } from '@/config/role-redirect';
import { AuthService } from '@/v1/modules/auth/auth.service';

const authService = new AuthService();

export class AuthHandler {
  test(res: Response) {
    return res.status(200).json({ message: 'it worked' });
  }

  async signUpWithEmailAndPassword(req: Request, res: Response) {
    try {
      const newUser = await authService.signUp(req.body);
      return res.status(200).json({
        message: 'User created successfully',
        user: { id: newUser.id, email: newUser.email },
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error?.message || 'Internal server error',
      });
    }
  }

  async signInWithEmailAndPassword(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const { accessToken, refreshToken, role } = await authService.signIn(
        email,
        password,
      );

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
          role,
        });
      }

      return res.status(200).json({
        message: 'User logged in',
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error?.message || 'Internal server error',
      });
    }
  }

  async googleCallback(req: Request, res: Response) {
    const { userId, role } = req.user as any;

    try {
      const { refreshToken } = await authService.googleSignIn(userId, role);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return res.redirect(ROLE_REDIRECT[role]);
    } catch (error:any) {
      return res.status(500).json({
        error: error?.message || 'Internal server error',
      });
    }
  }

  async refreshSession(req: Request, res: Response) {
    try {
      const refreshToken = req.body?.refreshToken || req.cookies?.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          error: 'Missing refresh token',
        });
      }

      const {newAccessToken, newRefreshToken, role} = await authService.refreshToken(refreshToken);

      const authMode = req.headers['x-auth-mode'];

      if (authMode === 'cookie') {
        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });

        return res.json({
          accessToken: newAccessToken,
          role,
        });
      }

      return res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error:any) {
      return res.status(500).json({
        error: error?.message || 'Internal server error',
      });
    }
  }
}
