import { ProductCartAndEnvoyType } from '@/@types/product';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import { useFocusProduct } from '@/hooks';
import styles from './index.module.css';
import 'slick-carousel/slick/slick.css';

export const ProductsCardsSlides = ({
  dataProducts,
  handleSetSlide,
  showSlider,
}: {
  dataProducts: ProductCartAndEnvoyType[];
  handleSetSlide: (sliderPops: Slider | null) => void;
  showSlider: number;
}) => {
  const { handleAddStoreProduct } = useFocusProduct();
  const settings: Settings = {
    dots: false,
    speed: 500,
    infinite: false,
    initialSlide: 0,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    waitForAnimate: false,
    rows: showSlider,
    useCSS: false,
  };

  return (
    <Slider ref={handleSetSlide} {...settings}>
      {dataProducts.map((product) => {
        return (
          <div key={product.id}>
            <div className={`card-product ${styles.card_products_slide}`}>
              <h3>{product.data.model}</h3>
              <span>PcD: {product.quantity}</span>
              <img
                onClick={() => handleAddStoreProduct({ ...product.data, id: product.id })}
                src={product.data.img}
                alt={product.data.model}
              />
            </div>
          </div>
        );
      })}
    </Slider>
  );
};
