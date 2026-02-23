import { createApiClient } from '@taxidi/api-client';
import { useAuthStore } from '../store/auth.store';

export const api = createApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  authMode: 'cookie',
  getAccessToken: () => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.error('NEXT_PUBLIC_API_URL is undefined');
      return null;
    }

    if (typeof window === 'undefined') return null;
    return useAuthStore.getState().accessToken;
  },

  onUnauthorized: () => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      const AUTH_WEB_URL = process.env.NEXT_PUBLIC_AUTH_WEB_URL;
      if (!AUTH_WEB_URL)
        return console.error('NEXT_PUBLIC_AUTH_WEB_URL is undefined');

      useAuthStore.getState().logout();
      window.location.href = AUTH_WEB_URL;
    }
  },
});
