import styles from './index.module.css';
import { Empty } from '@/components/Empty';
import { PriceStockInfo } from '@/components';
import { useRedirect } from '@/hooks';
import { useGetAllDeliveriesProduct } from '../../../http/use-get-all-deliveries';

export const DeliveriesProducts = () => {
  const { data: deliveriesProducts, isSuccess, isPending, isError } = useGetAllDeliveriesProduct();
  const { handleRedirectionToProduct } = useRedirect();

  const isErrorOrNotHaveProduct = isError || (deliveriesProducts?.length === 0 && isSuccess);
  const isSuccessAndHaveProduct = isSuccess && deliveriesProducts?.length > 0;

  if (isErrorOrNotHaveProduct) {
    return <Empty message="Compre mais produtos..." />;
  }

  if (isSuccessAndHaveProduct) {
    return (
      <div aria-label="delivery cards" className={styles.delivery_cards}>
        {deliveriesProducts.map((product) => {
          return (
            <div key={product.id} className={styles.cards_item}>
              <img
                onClick={() => handleRedirectionToProduct(product.productId)}
                src={product.image}
                alt={product.name}
              />
              <div>
                <PriceStockInfo _id={product.id} price={product.price} customClass="product_user" />
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
    );
  }

  return (
    <div aria-label="loading delivery cards" className={styles.delivery_cards}>
      {Array.from({ length: 8 }).map((_, index) => {
        return <div key={index + '_id'} className={styles.loader_card} />;
      })}
    </div>
  );
};
