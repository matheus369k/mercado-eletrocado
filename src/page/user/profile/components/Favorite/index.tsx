import { useSelectProduct, useGetProducts } from '@/hooks';
import { FavoriteButton } from '@/components';
import { appUseSelector } from '@/redux/hook';
import { MdFavorite } from 'react-icons/md';
import styles from './index.module.css';
import '@/styles/card-Products.css';

export const FavoriteProducts = () => {
  const { favoriteProducts } = appUseSelector((state) => state.favorite);
  const { dataProducts } =
    useGetProducts().handleRandomOrderAndFavoriteProductDatas(favoriteProducts);
  const { handleAddStoreProduct } = useSelectProduct();

  return (
    <div className={styles.favorite_container}>
      <h2 className={styles.favorite_title}>
        <MdFavorite />
        Favoritos
      </h2>
      {favoriteProducts.length === 0 && (
        <div className="is_empty_container">
          <p>Não há produtos...</p>
        </div>
      )}
      {favoriteProducts.length > 0 && (
        <div className={styles.favorite_products_list}>
          {dataProducts.map((product) => {
            return (
              <div key={product.id} className={`card-product ${styles.favorite_product_card}`}>
                <img
                  onClick={() => handleAddStoreProduct(product)}
                  src={product.img}
                  alt={product.model}
                />
                <h3>{product.model}</h3>
                <FavoriteButton customClass="user_profiler" id={product.id} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
