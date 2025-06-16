import { ROUTES_PATHNAMES } from '@/util/const';
import styles from './index.module.css';
import { useRedirect } from '@/hooks';

export const ErrorRoute = () => {
  const { handleReplacePage } = useRedirect();

  const handleResetPage = () => {
    sessionStorage.removeItem('statusFetchApi');
    localStorage.setItem('autLogin', 'false');

    handleReplacePage({ pathName: ROUTES_PATHNAMES.HOME });
  };

  return (
    <div className={styles.error_container}>
      <div>
        <h1>A pagina não foi encontrada...</h1>
        <p>Deseja voltar para a pagina principal?</p>
      </div>
      <button type="button" onClick={handleResetPage}>
        voltar
      </button>
    </div>
  );
};
