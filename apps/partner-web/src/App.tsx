import { Suspense } from 'react';
import AppRoutes from './routes';
import ProtectedRoute from './protected/protectedRoute';
import { AuthInitializer } from './provider/AuthProvider';
import TaxidiLoader from './components/loaders';

function App() {
  return (
    <Suspense fallback={<TaxidiLoader />}>
      <AuthInitializer>
        <ProtectedRoute>
          <AppRoutes />
        </ProtectedRoute>
      </AuthInitializer>
    </Suspense>
  );
}

export default App;
