import { FormPayment, Title, ProductsCards } from './components';
import { routesPath } from '@/routes/routes-path';
import { IoClose } from 'react-icons/io5';
import { useRedirect } from '@/hooks';
import { TitleContent, TitleRoot } from '@/components';
import { appUseSelector } from '@/redux/hook';
import styles from './index.module.css';

export const CheckedPage = () => {
  const { handleTogglePage } = useRedirect();
  const { userDatas } = appUseSelector((state) => state.user);

  const handleCloseCheckoutPage = () => {
    handleTogglePage({ pathName: routesPath.CAR });
  };

  return (
    <div className={styles.checkout_container}>
      <TitleRoot>
        <TitleContent>Verificar compra</TitleContent>
        <i
          className={styles.checkout__icon_close_container}
          onClick={handleCloseCheckoutPage}
          aria-label="Voltar"
          title="Voltar">
          <IoClose />
        </i>
      </TitleRoot>

      <div className={styles.checkout__content}>
        <div className={styles.checkout__content__info_user}>
          <Title>Informações do usuário</Title>
          <div>
            <p className={styles.checkout__content__info_user__items}>
              <strong>Nome:</strong>
              {userDatas?.name || 'desconhecido...'}
            </p>
            <p className={styles.checkout__content__info_user__items}>
              <strong>E-Mail:</strong>
              {userDatas?.email || 'desconhecido...'}
            </p>
            <p className={styles.checkout__content__info_user__items}>
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
