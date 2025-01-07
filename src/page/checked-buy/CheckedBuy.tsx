import { PaymentSection, ProductsCart, InfoAndConfirmBuyDisplay, UserSection } from './components';
import { PaymentTypeProvider } from './contexts/payment-type';
import { routesPath } from '@/routes/routes-path';
import { IoArrowBack } from 'react-icons/io5';
import styles from './index.module.css';
import { useRedirect } from '@/hooks';

export const CheckedBuy = () => {
  const { handleTogglePage } = useRedirect();

  const handleCloseCheckoutBuy = () => {
    handleTogglePage({ pathName: routesPath.CAR });
  };

  return (
    <PaymentTypeProvider>
      <div className={styles.checkout_buy_page}>
        <i onClick={handleCloseCheckoutBuy}>
          <IoArrowBack />
        </i>
        <UserSection />
        <ProductsCart />
        <PaymentSection />
        <InfoAndConfirmBuyDisplay />
      </div>
    </PaymentTypeProvider>
  );
};
