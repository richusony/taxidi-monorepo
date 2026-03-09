import { lazy } from "react";

const AdminLoginPage = lazy(() => import("../pages/auth/AdminLoginPage"));

export const authRoutes = {
    path: "/login",
    element: <AdminLoginPage />
};