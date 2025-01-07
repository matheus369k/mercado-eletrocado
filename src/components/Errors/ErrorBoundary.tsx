import { ErrorBoundary as ErrorBoundaryProvider } from 'react-error-boundary';
import styles from './index.module.css';

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const handleResetPage = () => {
    sessionStorage.removeItem('statusFetchApi');
    localStorage.setItem('autLogin', 'false');

    window.location.reload();
  };

  return (
    <ErrorBoundaryProvider
      fallback={
        <div className={styles.error_container}>
          <div>
            <h1>Error ao tentar carregar...</h1>
            <p>Deseja recarregar a pagina?</p>
          </div>
          <button type="button" onClick={handleResetPage}>
            recarregar
          </button>
        </div>
      }>
      {children}
    </ErrorBoundaryProvider>
  );
};
