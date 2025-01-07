import { useProductBuy } from '../../hooks/use-product-boy';
import { appUseSelector } from '@/redux/hook';
import { BsBank2 } from 'react-icons/bs';
import styles from './index.module.css';
import { FaBox } from 'react-icons/fa';

export const InfoAndConfirmBuyDisplay = () => {
  const { cartProducts, totalPrice } = appUseSelector((state) => state.cart);
  const { handleConfirmBuy } = useProductBuy();

  return (
    <section className={styles.confirm_buy_info_display}>
      <p className={styles.info_buy}>
        <span className="productPcD">
          <strong>
            <FaBox />
            PcD Total:
          </strong>{' '}
          X{cartProducts.length}
        </span>
        <span className="price">
          <strong>
            <BsBank2 />
            Preço Total:
          </strong>{' '}
          R${totalPrice.toFixed(2)}
        </span>
      </p>
      <button title="confirmar compra" onClick={handleConfirmBuy} type="button">
        Confirmar
      </button>
    </section>
  );
};
