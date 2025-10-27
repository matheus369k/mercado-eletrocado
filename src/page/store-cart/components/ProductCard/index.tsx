import { ProductsLessProvider } from '../../contexts/products-less';
import { SliceProductCartType } from '@/@types/product';
import { LessProductDisplay } from '..';
import styles from './index.module.css';
import { PriceStockInfo } from '@/components';
import { useRedirect } from '@/hooks';

export const ProductCard = ({ data, quantity }: SliceProductCartType) => {
  const { handleRedirectionToProduct } = useRedirect();

  return (
    <ProductsLessProvider>
      <div className={styles.cart_product_card}>
        {quantity > 1 && <span className={styles.card_quantity}>{quantity}X</span>}
        <img onClick={() => handleRedirectionToProduct(data._id)} src={data.img} alt={data.model} />
        <div className={styles.card_content}>
          <PriceStockInfo _id={data._id} price={data.price} customClass="product_store_cart" />
          <h3>{data.model}</h3>
          <LessProductDisplay _id={data._id} />
        </div>
      </div>
    </ProductsLessProvider>
  );
};
