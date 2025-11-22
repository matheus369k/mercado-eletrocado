import styles from './index.module.css';

export const RequestError = () => {
  const handleReloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={styles.error_container}>
      <div>
        <h1>Error ao tentar carregar os produtos</h1>
        <p>Deseja recarrega a pagina?</p>
      </div>
      <button type="button" onClick={handleReloadPage}>
        recarregar
      </button>
    </div>
  );
};
