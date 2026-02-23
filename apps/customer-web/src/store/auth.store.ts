import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  isInitialized: boolean;
  AUTH_WEB_URL: string;
  setAccessToken: (token: string | null) => void;
  setInitialized: (value: boolean) => void;
  logout: () => void;
}

const authUrl = process.env.NEXT_PUBLIC_AUTH_WEB_URL;
if (!authUrl) console.error("NEXT_PUBLIC_AUTH_WEB_URL is undefined");

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isInitialized: false,
  AUTH_WEB_URL: authUrl!,

  setAccessToken: (token) =>
    set({
      accessToken: token,
    }),

  setInitialized: (value) =>
    set({
      isInitialized: value,
    }),

  logout: () =>
    set({
      accessToken: null,
    }),
}));
