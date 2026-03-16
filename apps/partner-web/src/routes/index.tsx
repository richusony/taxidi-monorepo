import { partnerRoutes } from './partner.routes';
import { useRoutes } from 'react-router-dom';

export default function AppRoutes() {
  return useRoutes([
    {
      children: [partnerRoutes],
    },
  ]);
}
