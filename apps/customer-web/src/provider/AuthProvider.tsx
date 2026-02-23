'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';
import { api } from '../lib/axios.config';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setInitialized = useAuthStore((s) => s.setInitialized);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data } = await api.post('/auth/refresh');
        setAccessToken(data.accessToken);
      } catch {
        setAccessToken(null);
      } finally {
        setInitialized(true);
      }
    };

    restoreSession();
  }, []);

  const isInitialized = useAuthStore((s) => s.isInitialized);

  if (!isInitialized) {
    return null; // or loading spinner
  }

  return <>{children}</>;
}
