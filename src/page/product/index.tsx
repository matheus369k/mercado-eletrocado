import { ProductsAmountProvider } from './contexts/products-amount';
import { BoyProductControls, ProductInfoItem, ProductPreviewSlide } from './components';
import { appUseSelector } from '@/redux/hook';
import { IoClose } from 'react-icons/io5';
import { useProduct } from './hooks';
import styles from './index.module.css';
import { FavoriteButton, PriceStockInfo } from '@/components';

export const ProductPage = () => {
  const { selected } = appUseSelector((state) => state.product);
  const { handleRemoveStoreProduct } = useProduct();

  if (!selected) return null;

  return (
    <ProductsAmountProvider>
      <div className={styles.product_container}>
        <i className={styles.icon_close_container} onClick={handleRemoveStoreProduct}>
          <IoClose />
        </i>
        <div className={styles.product_content}>
          <div className={styles.product_previews_container}>
            <ProductPreviewSlide img={selected.img} model={selected.model} slide={selected.slide} />
            <FavoriteButton customClass="product_selected" {...selected} />
          </div>

          <div className={styles.product_info_container}>
            <h3>{selected.model}</h3>
            <ul className={styles.product_descriptions_container}>
              <ProductInfoItem label="Tela" info={selected.screen} />
              <ProductInfoItem label="Processador" info={selected.processor} />
              <ProductInfoItem label="Memoria" info={selected.memory} />
              {selected.placeVideo ? (
                <ProductInfoItem label="Placa de video" info={selected.placeVideo} />
              ) : (
                <ProductInfoItem label="Bateria" info={selected.battery} />
              )}
            </ul>
            <PriceStockInfo
              customClass="product_selected"
              _id={selected._id}
              price={selected.price}
            />
            <BoyProductControls data={selected} />
          </div>
        </div>
      </div>
    </ProductsAmountProvider>
  );
};
