import { Outlet } from 'react-router-dom';
import { Footer, AlertMessage, Header, ErrorBoundary } from '@/components';

export function Layout() {
  return (
    <ErrorBoundary>
      <AlertMessage />

      <Header />
      <ErrorBoundary>
        <main className="main">
          <Outlet />
        </main>
      </ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  );
}
