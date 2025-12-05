import { appUseSelector } from '@/redux/hook';
import { Swiper, SwiperSlide, type SwiperProps } from 'swiper/react';
import { Title } from '../Title';
import { Controls } from './components/Controls';
import styles from './index.module.css';
import 'swiper/css';
import { PriceStockInfo } from '@/components';
import { useRedirect } from '@/hooks';

export const SliderSetting: SwiperProps = {
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

export const ProductsCards = () => {
  const { cartProducts } = appUseSelector((state) => state.cart);
  const { handleRedirectionToProduct } = useRedirect();

  return (
    <div className={styles.products_cards_sections}>
      <Title>Produtos no Carrinho</Title>

      <Swiper data-product-quantity={cartProducts.length} {...SliderSetting}>
        <Controls />
        {cartProducts.map((product) => {
          return (
            <SwiperSlide
              aria-label={`product cart - id ${product.data._id}`}
              className={styles.products_cards_items}
              key={product.data._id}>
              <img
                aria-label={`product cart of picture - id ${product.data._id}`}
                onClick={() => handleRedirectionToProduct(product.data._id)}
                src={product.data.img}
                alt=""
              />
              {product.quantity > 0 && (
                <span aria-label="quantity of products" className={styles.cards_quantity}>
                  {product.quantity}X
                </span>
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
