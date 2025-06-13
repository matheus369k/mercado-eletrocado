import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { ProductsCardsSlides } from './ProductsCardsSlide';
import { useSlide, useGetProducts } from '@/hooks';
import styles from './index.module.css';
import { appUseSelector } from '@/redux/hook';

export const ProductsSlider = ({
  storeType,
  showSlider,
  customClass,
}: {
  storeType: 'cart' | 'envoy';
  showSlider: number;
  customClass?: string;
}) => {
  const { cartProducts } = appUseSelector((state) => state.cart);
  const { envoyProducts } = appUseSelector((state) => state.envoy);
  //const { dataProducts } = useGetProducts().handleEnvoyAndCartDatas(selectedData);

  const { handleNextSlider, handlePreviousSlider, handleSetSlider } = useSlide();

  return (
    <>
      {dataProducts.length > 0 && (
        <div className={`${styles.products_slide} ${styles[customClass]}`}>
          <ProductsCardsSlides
            showSlider={showSlider}
            handleSetSlide={handleSetSlider}
            dataProducts={dataProducts}
          />
          {dataProducts.length > showSlider && (
            <>
              <button
                onClick={handleNextSlider}
                className={`${styles.slide_buttons} ${styles.slide_button_next}`}
                type="button">
                <BsChevronDown />
              </button>
              <button
                onClick={handlePreviousSlider}
                className={`${styles.slide_buttons} ${styles.slide_button_prev}`}
                type="button">
                <BsChevronUp />
              </button>
            </>
          )}
        </div>
      )}
      {dataProducts.length === 0 && (
        <div className="is_empty_container">
          <p>Não há produtos...</p>
        </div>
      )}
    </>
  );
};
