import { ProductsAmountProvider } from './contexts/products-amount';
import { BuyProductControls, ProductInfoItem, ProductPreviewSlide } from './components';
import { IoClose } from 'react-icons/io5';
import styles from './index.module.css';
import { FavoriteButton, PriceStockInfo } from '@/components';
import { useLocation } from 'react-router-dom';
import { useGetOneProduct } from './http/use-get-one-product';
import { useRedirect } from '@/hooks';

export const ProductPage = () => {
  const { pathname } = useLocation();
  const { data: product } = useGetOneProduct({ productId: pathname.split('/')[2] });
  const { handleBackPage } = useRedirect();

  if (!product) return null;

  return (
    <ProductsAmountProvider>
      <div className={styles.product_container}>
        <i
          aria-label="close product page"
          className={styles.icon_close_container}
          onClick={handleBackPage}>
          <IoClose />
        </i>
        <div className={styles.product_content}>
          <div className={styles.product_previews_container}>
            <ProductPreviewSlide img={product.img} model={product.model} slide={product.slide} />
            <FavoriteButton customClass="product_selected" {...product} />
          </div>

          <div className={styles.product_info_container}>
            <h3>{product.model}</h3>
            <ul className={styles.product_descriptions_container}>
              <ProductInfoItem label="Tela" info={product.screen} />
              <ProductInfoItem label="Processador" info={product.processor} />
              <ProductInfoItem label="Memoria" info={product.memory} />
              {product.placeVideo ? (
                <ProductInfoItem label="Placa de video" info={product.placeVideo} />
              ) : (
                <ProductInfoItem label="Bateria" info={product.battery} />
              )}
            </ul>
            <PriceStockInfo
              customClass="product_selected"
              _id={product._id}
              price={product.price}
            />
            <BuyProductControls data={product} />
          </div>
        </div>
      </div>
    </ProductsAmountProvider>
  );
};
