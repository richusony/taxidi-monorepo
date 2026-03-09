import Dashboard from "@/pages/dashboard/Dashboard";
import HostListPage from "@/pages/host-list/HostListPage";
import AdminLayout from "@/components/layouts/AdminLayout";
import AnalyticsPage from "@/pages/analytics/AnalyticsPage";
import HostRequestDetailsPage from "@/pages/host-request-details/HostRequestDetailsPage";

export const adminRoutes = {
    path: "/",
    element: <AdminLayout />,
    children: [
        { index: "/", element: <Dashboard /> },
        { path: "/host-applications", element: <HostListPage/> },
        { path: "/host-request-details", element: <HostRequestDetailsPage /> },
        { path: "/analytics", element: <AnalyticsPage /> },
    ]
};