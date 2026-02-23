'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/auth.store';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const AUTH_REDIRECT_URL = useAuthStore((s) => s.AUTH_WEB_URL);

  useEffect(() => {
    if (!accessToken) {
      window.location.href = AUTH_REDIRECT_URL;
    }
  }, [accessToken, router]);

  if (!accessToken) return null;

  return <>{children}</>;
}
