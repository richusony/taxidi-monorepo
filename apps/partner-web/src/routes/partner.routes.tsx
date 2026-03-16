import Dashboard from '@/pages/dashboard/Dashboard';
import PartnerLayout from '@/components/layouts/PartnerLayout';
import AnalyticsPage from '@/pages/analytics/AnalyticsPage';
import type { RouteObject } from 'react-router-dom';

export const partnerRoutes: RouteObject = {
  path: '/',
  element: <PartnerLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: 'analytics', element: <AnalyticsPage /> },
  ],
};
