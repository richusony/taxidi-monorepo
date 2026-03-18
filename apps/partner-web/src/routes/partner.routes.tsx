import Dashboard from '@/pages/dashboard/Dashboard';
import PartnerLayout from '@/components/layouts/PartnerLayout';
import AnalyticsPage from '@/pages/analytics/AnalyticsPage';
import type { RouteObject } from 'react-router-dom';
import VehicleListPage from '@/pages/vehicles/VehicleListPage';
import AddVehiclePage from '@/pages/add-vehicle/page';

export const partnerRoutes: RouteObject = {
  path: '/',
  element: <PartnerLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: 'analytics', element: <AnalyticsPage /> },
    { path: 'manage-vehicles', element: <VehicleListPage /> },
    { path: 'add-vehicle', element: <AddVehiclePage />}
  ],
};
