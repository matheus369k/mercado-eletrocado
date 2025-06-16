import { useSelectProduct } from '@/hooks';
import { FavoriteButton, PriceStockInfo } from '@/components';
import { appUseSelector } from '@/redux/hook';
import { Empty } from '@/components/Empty';
import styles from './index.module.css';

export const FavoriteProducts = () => {
  const { favoriteProducts } = appUseSelector((state) => state.favorite);
  const { handleAddStoreProduct } = useSelectProduct();

  return (
    <div className={styles.favorite_container}>
      {favoriteProducts.length === 0 && <Empty message="Adicione mais produtos aos favoritos..." />}

      {favoriteProducts.length > 0 && (
        <div className={styles.favorite__products}>
          {favoriteProducts.map((product) => {
            return (
              <div key={product.id} className={`${styles.favorite__product__cards}`}>
                <FavoriteButton customClass="user_profiler" {...product} />
                <img
                  onClick={() => handleAddStoreProduct(product)}
                  src={product.img}
                  alt={product.model}
                />
                <div>
                  <PriceStockInfo
                    id={product.id}
                    price={product.price}
                    customClass="product_user"
                  />
                  <h3>{product.model}</h3>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
