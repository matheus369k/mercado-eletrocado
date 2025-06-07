import { ProductSlideItem } from './ProductPreviewSlideItem';
import { usePreview } from '../../hooks/use-preview';
import { ProductType } from '@/@types/product';
import styles from './index.module.css';

type ProductPreviewSlideProps = Pick<ProductType, 'model' | 'img' | 'slide'>;

export const ProductPreviewSlide = ({ img, model, slide }: ProductPreviewSlideProps) => {
  const {
    handleFinishLoadingPreviewImage,
    handleSetNewPreviewImage,
    state: { isLoading, previewImage },
  } = usePreview({
    img,
  });

  return (
    <div className={styles.pictures_container}>
      <img
        onLoad={handleFinishLoadingPreviewImage}
        className={`${styles.image_main} ${isLoading ? styles.animation_switch_img : ''}`}
        loading="lazy"
        src={previewImage}
        alt={model}
      />

      <ul className={styles.pictures__slide_list}>
        <ProductSlideItem
          handleSetNewPreviewImage={handleSetNewPreviewImage}
          mainImage={previewImage}
          SlidePreview={slide.slide2}
          model={model}
        />
        <ProductSlideItem
          handleSetNewPreviewImage={handleSetNewPreviewImage}
          mainImage={previewImage}
          SlidePreview={slide.slide1}
          model={model}
        />
        <ProductSlideItem
          handleSetNewPreviewImage={handleSetNewPreviewImage}
          mainImage={previewImage}
          SlidePreview={slide.slide3}
          model={model}
        />
      </ul>
    </div>
  );
};
