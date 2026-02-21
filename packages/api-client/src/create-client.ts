import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const createApiClient = (config?: {
  baseURL?: string;
  authMode?: string;
  getAccessToken?: () => string | null;
  onUnauthorized?: () => void;
}) => {
  const api = axios.create({
    baseURL: config?.baseURL,
    withCredentials: true,
  });

  api.interceptors.request.use((req: InternalAxiosRequestConfig) => {
    const token = config?.getAccessToken?.();

    if (config?.authMode) {
      req.headers.set('x-auth-mode', config.authMode);
    }

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  });

  api.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        config?.onUnauthorized?.();
      }

      return Promise.reject(error);
    },
  );

  return api;
};
