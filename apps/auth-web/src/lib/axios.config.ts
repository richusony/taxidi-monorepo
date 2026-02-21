import { createApiClient } from "@taxidi/api-client";
import { useAuthStore } from "src/store/auth.store";

export const api = createApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  authMode: 'cookie',
  getAccessToken: () => {
    if (typeof window === "undefined") return null;
    return useAuthStore.getState().accessToken;
  },

 onUnauthorized: () => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    useAuthStore.getState().logout();
    window.location.href = "/";
  }
}
});