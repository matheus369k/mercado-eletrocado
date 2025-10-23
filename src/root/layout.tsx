import { Outlet } from 'react-router-dom';
import { Footer, AlertMessage, Header, ErrorBoundary } from '@/components';
import { useProfileAccount } from '@/http/use-profile-account';

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
