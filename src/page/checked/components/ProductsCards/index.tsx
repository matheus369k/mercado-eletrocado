import { appUseSelector } from '@/redux/hook';
import { Swiper, SwiperSlide, type SwiperProps } from 'swiper/react';
import { Title } from '../Title';
import { Controls } from './Controls';
import styles from './index.module.css';
import 'swiper/css';
import { PriceStockInfo } from '@/components';

export const ProductsCards = () => {
  const { cartProducts } = appUseSelector((state) => state.cart);
  const SliderSetting: SwiperProps = {
    slidesPerView: 5,
    className: styles.checkout__products_cards__container,
    height: 580,
    direction: 'vertical',
    breakpoints: {
      849: {
        slidesPerView: 5,
        height: 550,
      },
      300: {
        slidesPerView: 3,
        height: 330,
      },
    },
  };

  return (
    <div className={styles.checkout__products_cards_sections}>
      <Title>Produtos no Carrinho</Title>

      <Swiper data-product-quantity={cartProducts.length} {...SliderSetting}>
        <Controls />
        {cartProducts.map((product) => {
          return (
            <SwiperSlide className={styles.checkout__products_cards__items} key={product.data.id}>
              <img src={product.data.img} alt="" />
              {product.quantity > 0 && (
                <span className={styles.checkout__products_cards__quantity}>
                  {product.quantity}X
                </span>
              )}
              <div className={styles.checkout__products_cards__info}>
                <PriceStockInfo
                  id={product.data.id}
                  price={product.data.price}
                  customClass="product_checkout"
                />
                <h3>{product.data.model}</h3>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
