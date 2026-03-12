import { Suspense } from 'react';
import AppRoutes from './routes';
import ProtectedRoute from './protected/protectedRoute';
import { AuthInitializer } from './provider/AuthProvider';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthInitializer>
        <ProtectedRoute>
          <AppRoutes />
        </ProtectedRoute>
      </AuthInitializer>
    </Suspense>
  );
}

export default App;
