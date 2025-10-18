import { FormPayment, Title, ProductsCards } from './components';
import { IoClose } from 'react-icons/io5';
import { useRedirect } from '@/hooks';
import { TitleContent, TitleRoot } from '@/components';
import { appUseSelector } from '@/redux/hook';
import styles from './index.module.css';
import { ROUTES_PATHNAMES } from '@/util/const';

export const CheckedPage = () => {
  const { handleTogglePage } = useRedirect();
  const { userDatas } = appUseSelector((state) => state.user);

  const handleCloseCheckoutPage = () => {
    handleTogglePage({ pathName: ROUTES_PATHNAMES.CAR });
  };

  return (
    <div className={styles.checkout_container}>
      <TitleRoot>
        <TitleContent>Verificar compra</TitleContent>
        <i
          className={styles.icon_close_container}
          onClick={handleCloseCheckoutPage}
          aria-label="Voltar"
          title="Voltar">
          <IoClose />
        </i>
      </TitleRoot>

      <div className={styles.checkout_content}>
        <div className={styles.info_user}>
          <Title>Informações do usuário</Title>
          <div>
            <p className={styles.info_user_items}>
              <strong>Nome:</strong>
              {userDatas?.full_name || 'desconhecido...'}
            </p>
            <p className={styles.info_user_items}>
              <strong>E-Mail:</strong>
              {userDatas?.email || 'desconhecido...'}
            </p>
            <p className={styles.info_user_items}>
              <strong>CEP:</strong>
              {userDatas?.cep || 'desconhecido...'}
            </p>
          </div>
        </div>

        <FormPayment />

        <ProductsCards />
      </div>
    </div>
  );
};
