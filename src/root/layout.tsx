import { Outlet } from 'react-router-dom';
import { Footer, AlertMessage, Header, ErrorBoundary, RequestError } from '@/components';

type StatusFetchApi = 'Loading' | 'complete' | 'error';

export function Layout() {
  const statusRequestFetch: StatusFetchApi | undefined = localStorage.statusFetchApi;

  return (
    <ErrorBoundary>
      <AlertMessage />

      <Header />
      {statusRequestFetch === 'error' ? (
        <RequestError />
      ) : (
        <ErrorBoundary>
          <main className="main">
            <Outlet />
          </main>
        </ErrorBoundary>
      )}
      <Footer />
    </ErrorBoundary>
  );
}
