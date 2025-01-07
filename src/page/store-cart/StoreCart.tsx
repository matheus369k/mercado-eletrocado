import { useRedirectionPage, useGetProducts } from '@/hooks';
import { FaCartShopping } from 'react-icons/fa6';
import { appUseSelector } from '@/redux/hook';
import { ProductsCard } from './components';
import styles from './index.module.css';
import { Title } from '@/components';
import '@/styles/card-Products.css';

export const StoreCart = () => {
  const { cartProducts, totalPrice } = appUseSelector((state) => state.cart);
  const { handleRedirectToCheckedBuy } = useRedirectionPage();
  const { dataProducts } = useGetProducts().handleEnvoyAndCartDatas(cartProducts);

  const hasProductDatas = cartProducts.length > 0;

  return (
    <div className={styles.cart_container}>
      <Title>
        <FaCartShopping />
        Carrinho
      </Title>

      <div className={styles.cart_checkout_price}>
        <button disabled={!hasProductDatas} onClick={handleRedirectToCheckedBuy} type="button">
          Checkout
        </button>
        <p>Total: R${totalPrice.toFixed(2)}</p>
      </div>

      {hasProductDatas && <ProductsCard dataProducts={dataProducts} />}

      {!hasProductDatas && (
        <div className="is_empty_container">
          <p>Não há produtos Aqui!!</p>
        </div>
      )}
    </div>
  );
};
