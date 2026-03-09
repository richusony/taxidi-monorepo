import ProtectedRoute from "./protected";
import { authRoutes } from "./auth.routes";
import { adminRoutes } from "./admin.routes";
import { useRoutes } from "react-router-dom";

export default function AppRoutes() {
    return useRoutes([
        authRoutes,
        {
            element: <ProtectedRoute />,
            children: [adminRoutes]
        }
    ]);
};