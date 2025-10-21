import styles from './index.module.css';
import { appUseSelector } from '@/redux/hook';
import { useSelectProduct } from '@/hooks';
import { Empty } from '@/components/Empty';
import { formatter } from '@/util/formatter';
import { PriceStockInfo } from '@/components';

export const EnvoyProducts = () => {
  const { envoyProducts } = appUseSelector((state) => state.envoy);
  const { handleAddStoreProduct } = useSelectProduct();

  return (
    <div className={styles.envoy_container}>
      {envoyProducts.length === 0 && <Empty message="Compre mais produtos..." />}

      {envoyProducts.length > 0 && (
        <div className={styles.envoy_cards}>
          {envoyProducts.map((datas) => {
            return datas.products.map((product) => {
              return Array.from({ length: product.quantity }).map((_, index) => {
                return (
                  <div key={product.data._id + index} className={styles.cards_item}>
                    <img
                      onClick={() => handleAddStoreProduct(product.data)}
                      src={product.data.img}
                      alt={product.data.model}
                    />
                    <div>
                      <PriceStockInfo
                        _id={product.data._id}
                        price={product.data.price}
                        customClass="product_user"
                      />
                      <h3>{product.data.model}</h3>
                      <span className={styles.delivery_info}>
                        Expectativa de entrega{' '}
                        {new Intl.DateTimeFormat('pt-br', { dateStyle: 'medium' }).format(
                          new Date(datas.arrival_at),
                        )}
                      </span>
                    </div>
                  </div>
                );
              });
            });
          })}
        </div>
      )}
    </div>
  );
};
