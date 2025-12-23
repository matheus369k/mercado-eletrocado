import { useRedirect } from '@/hooks';
import { FavoriteButton, PriceStockInfo } from '@/components';
import { Empty } from '@/components/Empty';
import styles from './index.module.css';
import { useGetAllFavoriteProduct } from '@/http/use-get-all-favorite-products';

export const FavoriteProducts = () => {
  const { data: favoritesProducts, isSuccess, isError } = useGetAllFavoriteProduct();
  const { handleRedirectionToProduct } = useRedirect();

  const isErrorOrNotHaveProduct = isError || (favoritesProducts?.length === 0 && isSuccess);
  const isSuccessAndHaveProduct = isSuccess && favoritesProducts?.length > 0;

  if (isErrorOrNotHaveProduct) {
    return <Empty message="Adicione mais produtos aos favoritos..." />;
  }

  if (isSuccessAndHaveProduct) {
    return (
      <div aria-label="favorite cards" className={styles.favorite_cards}>
        {favoritesProducts.map((product) => {
          return (
            <div key={product.id} className={styles.cards_item}>
              <FavoriteButton
                customClass="user_profiler"
                _id={product.productId}
                model={product.name}
                price={product.price}
                img={product.image}
              />
              <img
                onClick={() => handleRedirectionToProduct(product.productId)}
                src={product.image}
                alt={product.name}
              />
              <div>
                <PriceStockInfo _id={product.id} price={product.price} customClass="product_user" />
                <h3>{product.name}</h3>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div aria-label="loading favorite cards" className={styles.favorite_cards}>
      {Array.from({ length: 8 }).map((_, index) => {
        return <div key={index + '_id'} className={styles.loader_card} />;
      })}
    </div>
  );
};
