import { FavoriteButton, PriceStockInfo } from '@/components';
import { ProductType } from '@/@types/product';
import { useRedirect } from '@/hooks';
import styles from './index.module.css';

export const ProductCard = (product: ProductType) => {
  const { handleRedirectionToProduct } = useRedirect();

  return (
    <div className={styles.product_card}>
      <FavoriteButton {...product} />
      <img
        onClick={() => handleRedirectionToProduct(product._id)}
        loading="lazy"
        src={product.img}
        alt={product.model}
      />
      <div className={styles.card_content}>
        <PriceStockInfo _id={product._id} price={product.price} />
        <h3>{product.model}</h3>
      </div>
    </div>
  );
};
