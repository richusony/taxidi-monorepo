'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '../store/store';
import { api } from '../lib/axios.config';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const hasInitialized = useRef(false);
  const { setAccessToken, setInitialized, isInitialized } = useAuthStore();

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const restoreSession = async () => {
      try {
        const { data } = await api.post('/auth/refresh');
        setAccessToken(data.accessToken);
      } catch {
        setAccessToken(null);
      }

      setInitialized(true);
    };

    restoreSession();
  }, []);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return children;
}
