import { FavoriteButton, PriceStockInfo } from '@/components';
import { ProductType } from '@/@types/product';
import { useFocusProduct } from '@/hooks';
import styles from './index.module.css';

export const ProductsCards = ({ ProductDataCards }: { ProductDataCards: ProductType[] }) => {
  const { handleAddStoreProduct } = useFocusProduct();

  return (
    <>
      {ProductDataCards.map((product) => {
        return (
          <li key={product.id} className={`card-product ${styles.home_product_card}`}>
            <img
              onClick={() => handleAddStoreProduct(product)}
              src={product.img}
              alt={product.model}
            />
            <PriceStockInfo id={product.id} price={product.price} stock={product.stock} />
            <FavoriteButton id={product.id} />
            <h3>{product.model}</h3>
          </li>
        );
      })}
    </>
  );
};
