'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (!accessToken) {
      window.location.replace(import.meta.env.VITE_AUTH_WEB_URL);
    }
  }, [accessToken]);

  if (!accessToken) return null;

  return children;
};

export default ProtectedRoute;
