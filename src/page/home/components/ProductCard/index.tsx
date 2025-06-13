import { FavoriteButton, PriceStockInfo } from '@/components';
import { ProductType } from '@/@types/product';
import { useSelectProduct } from '@/hooks';
import styles from './index.module.css';

export const ProductCard = (product: ProductType) => {
  const { handleAddStoreProduct } = useSelectProduct();

  return (
    <div className={styles.home__product_card}>
      <FavoriteButton {...product} />
      <img
        onClick={() => handleAddStoreProduct(product)}
        loading="lazy"
        src={product.img}
        alt={product.model}
      />
      <div className={styles.home__card_content}>
        <PriceStockInfo id={product.id} price={product.price} />
        <h3>{product.model}</h3>
      </div>
    </div>
  );
};
