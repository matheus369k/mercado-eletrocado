import { Outlet } from 'react-router-dom';
import { Footer, AlertMessage, Header, ErrorBoundary } from '@/components';
import { Suspense } from 'react';

export function Layout() {
  return (
    <ErrorBoundary>
      <AlertMessage />

      <Header />
      <ErrorBoundary>
        <main className="main">
          <Suspense>
            <Outlet />
          </Suspense>
        </main>
      </ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  );
}
