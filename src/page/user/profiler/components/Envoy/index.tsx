import styles from './index.module.css';
import { appUseSelector } from '@/redux/hook';
import { useSelectProduct } from '@/hooks';
import { Empty } from '@/components/Empty';
import { formatter } from '@/util/formatter';
import Carousel from 'react-multi-carousel';
import { PriceStockInfo } from '@/components';
import { MultiCarouselHorizonResponsive } from '@/lib/mult-carousel';

export const EnvoyProducts = () => {
  const { envoyProducts } = appUseSelector((state) => state.envoy);
  const { handleAddStoreProduct } = useSelectProduct();

  return (
    <div className={styles.envoy_container}>
      {envoyProducts.length === 0 && <Empty message="Compre mais produtos..." />}

      {envoyProducts.length > 0 &&
        envoyProducts.map((datas) => {
          const arrivalDateFormatter = formatter.dateDefault(datas.arrival_at);
          const currentDateFormatter = formatter.dateDefault(new Date().toISOString());

          return (
            <div key={datas.products.toString()} className={styles.envoy__products_container}>
              <div
                className={styles.envoy__products__expect_arrive}
                {...(arrivalDateFormatter >= currentDateFormatter && { 'data-delivered': true })}>
                <p>Expectativa de entrega:</p>
                <span>{arrivalDateFormatter}</span>
              </div>

              <Carousel
                responsive={MultiCarouselHorizonResponsive}
                className={styles.envoy__product__carousel}>
                {datas.products.map((product) => {
                  return (
                    <div key={product.data.id} className={styles.envoy__product__card}>
                      <img
                        onClick={() => handleAddStoreProduct(product.data)}
                        src={product.data.img}
                        alt={product.data.model}
                      />
                      {product.quantity > 0 && (
                        <span className={styles.envoy__product__card__quantity}>
                          {product.quantity}X
                        </span>
                      )}
                      <div>
                        <PriceStockInfo
                          id={product.data.id}
                          price={product.data.price}
                          customClass="product_user"
                        />
                        <h3>{product.data.model}</h3>
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          );
        })}
    </div>
  );
};
