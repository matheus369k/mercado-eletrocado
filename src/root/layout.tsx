import { Outlet, useLocation } from 'react-router-dom';
import { routesPath } from '@/routes/routes-path';
import {
  Footer,
  Advertisements,
  AlertMessage,
  Header,
  ErrorBoundary,
  RequestError,
} from '@/components';

type StatusFetchApi = 'Loading' | 'complete' | 'error';

export function Layout() {
  const statusRequestFetch: StatusFetchApi | undefined = localStorage.statusFetchApi;
  const { pathname } = useLocation();

  return (
    <ErrorBoundary>
      <AlertMessage />

      <Header />
      {statusRequestFetch === 'error' ? (
        <RequestError />
      ) : (
        <ErrorBoundary>
          {pathname === routesPath.HOME && <Advertisements />}
          <main className="main">
            <Outlet />
          </main>
        </ErrorBoundary>
      )}
      <Footer />
    </ErrorBoundary>
  );
}
