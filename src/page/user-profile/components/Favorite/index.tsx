import { useRedirect } from '@/hooks';
import { FavoriteButton, PriceStockInfo } from '@/components';
import { Empty } from '@/components/Empty';
import styles from './index.module.css';
import { useGetAllFavoriteProduct } from '@/http/use-get-all-favorite-products';

export const FavoriteProducts = () => {
  const { data: favoritesProducts, isSuccess, isPending, isError } = useGetAllFavoriteProduct();
  const { handleRedirectionToProduct } = useRedirect();

  return (
    <div className={styles.favorite_container}>
      {isError && <Empty message="Adicione mais produtos aos favoritos..." />}

      {isPending && (
        <div className={styles.favorite_cards}>
          {Array.from({ length: 8 }).map((_, index) => {
            return <div key={index + '_id'} className={styles.loader_card} />;
          })}
        </div>
      )}

      {isSuccess && (
        <div className={styles.favorite_cards}>
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
                  <PriceStockInfo
                    _id={product.id}
                    price={product.price}
                    customClass="product_user"
                  />
                  <h3>{product.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
