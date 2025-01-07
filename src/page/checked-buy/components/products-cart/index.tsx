import { PiShoppingCartFill } from 'react-icons/pi';
import { ProductsSlider } from '@/components';
import styles from './index.module.css';
import { Title } from '../Title';

export const ProductsCart = () => {
  return (
    <section className={styles.cart_products}>
      <Title customClass="cart_title">
        Produtos no <PiShoppingCartFill />
        Carrinho
      </Title>

      <ProductsSlider customClass="checked_buy" showSlider={3} storeType="cart" />
    </section>
  );
};
