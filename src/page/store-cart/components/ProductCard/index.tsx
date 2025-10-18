import { ProductsLessProvider } from '../../contexts/products-less';
import { SliceProductCartType } from '@/@types/product';
import { useProduct } from '../../hooks/use-less-product';
import { LessProductDisplay } from '..';
import styles from './index.module.css';
import { PriceStockInfo } from '@/components';

export const ProductCard = ({ data, quantity }: SliceProductCartType) => {
  const { handleAddStoreProduct } = useProduct();

  return (
    <ProductsLessProvider>
      <div className={styles.cart_product_card}>
        {quantity > 1 && <span className={styles.card_quantity}>{quantity}X</span>}
        <img onClick={() => handleAddStoreProduct({ ...data })} src={data.img} alt={data.model} />
        <div className={styles.card_content}>
          <PriceStockInfo _id={data._id} price={data.price} customClass="product_store_cart" />
          <h3>{data.model}</h3>
          <LessProductDisplay _id={data._id} />
        </div>
      </div>
    </ProductsLessProvider>
  );
};
