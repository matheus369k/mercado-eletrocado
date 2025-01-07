import { ProductsLessProvider } from '../../contexts/products-less';
import { ProductCartAndEnvoyType } from '@/@types/product';
import { useProduct } from '../../hooks/use-less-product';
import { LessProductDisplay } from '..';
import styles from './index.module.css';

export const ProductsCard = ({ dataProducts }: { dataProducts: ProductCartAndEnvoyType[] }) => {
  const { handleAddStoreProduct } = useProduct();

  return (
    <ul className={styles.cart_product_container}>
      {dataProducts.map((product) => {
        return (
          <ProductsLessProvider key={product.id}>
            <li className={`card-product ${styles.cart_product_card}`}>
              {product.quantity > 1 && <span>X{product.quantity}</span>}
              <img
                onClick={() => handleAddStoreProduct({...product.data, id: product.id})}
                src={product.data.img}
                alt={product.data.model}
              />
              <h3>{product.data.model}</h3>
              <LessProductDisplay id={product.id} />
            </li>
          </ProductsLessProvider>
        );
      })}
    </ul>
  );
};
