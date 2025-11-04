import styles from './index.module.css';
import { Empty } from '@/components/Empty';
import { PriceStockInfo } from '@/components';
import { useRedirect } from '@/hooks';
import { useGetAllDeliveriesProduct } from '../../http/use-get-all-deliveries';

export const DeliveriesProducts = () => {
  const { data: deliveriesProducts, isFetched, isFetching, isError } = useGetAllDeliveriesProduct();
  const { handleRedirectionToProduct } = useRedirect();

  const notHaveFavoriteProducts = (deliveriesProducts?.length === 0 && isFetching) || isError;
  const haveFavoriteProducts = deliveriesProducts?.length > 0 && isFetched;

  return (
    <div className={styles.delivery_container}>
      {notHaveFavoriteProducts && <Empty message="Compre mais produtos..." />}

      {haveFavoriteProducts && (
        <div className={styles.delivery_cards}>
          {deliveriesProducts.map((product) => {
            return (
              <div key={product.id} className={styles.cards_item}>
                <img
                  onClick={() => handleRedirectionToProduct(product.productId)}
                  src={product.image}
                  alt={product.name}
                />
                <div>
                  <PriceStockInfo
                    _id={product.id}
                    price={product.price}
                    customClass="product_user"
                  />
                  <h3>{product.name}</h3>
                  <span className={styles.delivery_info}>
                    Expectativa de entrega{' '}
                    {new Intl.DateTimeFormat('pt-br', { dateStyle: 'medium' }).format(
                      new Date(product.deliveryDate),
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
