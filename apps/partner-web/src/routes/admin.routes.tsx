import Dashboard from '@/pages/dashboard/Dashboard';
import PartnerListPage from '@/pages/partners-list/PartnerListPage';
import AdminLayout from '@/components/layouts/AdminLayout';
import AnalyticsPage from '@/pages/analytics/AnalyticsPage';
import PartnerRequestDetailsPage from '@/pages/partner-details/PartnerDetailsPage';
import type { RouteObject } from 'react-router-dom';

export const adminRoutes: RouteObject = {
  path: '/',
  element: <AdminLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: 'manage-partners', element: <PartnerListPage /> },
    { path: 'partners/:partnerId', element: <PartnerRequestDetailsPage /> },
    { path: 'analytics', element: <AnalyticsPage /> },
  ],
};
