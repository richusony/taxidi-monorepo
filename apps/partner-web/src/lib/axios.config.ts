import { createApiClient } from '@taxidi/api-client';
import { useAuthStore } from '@/store/store';

export const api = createApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  authMode: 'cookie',
  activeRole: 'PARTNER',
  getAccessToken: () => {
    if (typeof window === 'undefined') return null;
    return useAuthStore.getState().accessToken;
  },

  onUnauthorized: () => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      useAuthStore.getState().logout();
      window.location.href = import.meta.env.VITE_AUTH_WEB_URL;
    }
  },
});
