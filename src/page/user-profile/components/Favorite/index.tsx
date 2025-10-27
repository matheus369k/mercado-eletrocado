import { useRedirect, useSelectProduct } from '@/hooks';
import { FavoriteButton, PriceStockInfo } from '@/components';
import { Empty } from '@/components/Empty';
import styles from './index.module.css';
import { useGetAllFavoriteProduct } from '@/http/use-get-all-favorite-products';
import { ROUTES_PATHNAMES } from '@/util/const';

export const FavoriteProducts = () => {
  const { data: favoritesProducts, isFetching, isFetched } = useGetAllFavoriteProduct();
  const { handleRedirectionToProduct } = useRedirect();

  const notHaveFavoriteProducts = favoritesProducts?.length === 0 && isFetching;
  const haveFavoriteProducts = favoritesProducts?.length > 0 && isFetched;

  return (
    <div className={styles.favorite_container}>
      {notHaveFavoriteProducts && <Empty message="Adicione mais produtos aos favoritos..." />}

      {haveFavoriteProducts && (
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
