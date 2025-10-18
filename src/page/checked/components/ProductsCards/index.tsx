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
    slidesPerView: 4,
    className: styles.products_cards_container,
    direction: 'vertical',
    breakpoints: {
      1024: {
        slidesPerView: 4,
      },
      300: {
        slidesPerView: 3,
      },
    },
  };

  return (
    <div className={styles.products_cards_sections}>
      <Title>Produtos no Carrinho</Title>

      <Swiper data-product-quantity={cartProducts.length} {...SliderSetting}>
        <Controls />
        {cartProducts.map((product) => {
          return (
            <SwiperSlide className={styles.products_cards_items} key={product.data._id}>
              <img src={product.data.img} alt="" />
              {product.quantity > 0 && (
                <span className={styles.cards_quantity}>{product.quantity}X</span>
              )}
              <div className={styles.cards_info}>
                <PriceStockInfo
                  _id={product.data._id}
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
