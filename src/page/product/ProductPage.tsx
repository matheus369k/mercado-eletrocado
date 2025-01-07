import { ProductsAmountProvider } from './contexts/products-amount';
import { MountProductPage } from './components';
import { IoArrowBack } from 'react-icons/io5';
import { appUseSelector } from '@/redux/hook';
import styles from './index.module.css';
import { useProduct } from './hooks';

export const ProductPage = () => {
  const { selected } = appUseSelector((state) => state.product);
  const { handleRemoveStoreProduct } = useProduct();

  return (
    <div className={styles.product_page_container}>
      <div className={styles.icons_close_product_page}>
        <i onClick={handleRemoveStoreProduct}>
          <IoArrowBack />
        </i>
      </div>
      {selected && (
        <ProductsAmountProvider>
          <MountProductPage datas={selected} />
        </ProductsAmountProvider>
      )}
    </div>
  );
};
