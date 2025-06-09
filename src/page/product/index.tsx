import { ProductsAmountProvider } from './contexts/products-amount';
import { BoyProductControls, ProductInfoList, ProductPreviewSlide } from './components';
import { appUseSelector } from '@/redux/hook';
import { IoClose } from 'react-icons/io5';
import { useProduct } from './hooks';
import styles from './index.module.css';
import { FavoriteButton, PriceStockInfo } from '@/components';

export const ProductPage = () => {
  const { selected } = appUseSelector((state) => state.product);
  const { handleRemoveStoreProduct } = useProduct();

  return (
    <div className={styles.product_container}>
      <i className={styles.product__icons_close_container} onClick={handleRemoveStoreProduct}>
        <IoClose />
      </i>
      {selected && (
        <ProductsAmountProvider>
          <div className={styles.product__content}>
            <h3>{selected.model}</h3>
            <ProductPreviewSlide img={selected.img} model={selected.model} slide={selected.slide} />
            <ProductInfoList
              battery={selected.battery}
              memory={selected.memory}
              placeVideo={selected.placeVideo}
              processor={selected.processor}
              screen={selected.screen}
            />
            <PriceStockInfo
              customClass="product_selected"
              id={selected.id}
              price={selected.price}
            />
            <FavoriteButton customClass="product_selected" id={selected.id} />
            <BoyProductControls data={selected} />
          </div>
        </ProductsAmountProvider>
      )}
    </div>
  );
};
