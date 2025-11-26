import { ProductSlideItemImage, ProductSlideItemRoot } from './ProductPreviewSlideItem';
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
        aria-label="main preview image"
        loading="lazy"
        src={previewImage}
        alt={model}
      />

      <div className={styles.pictures_previews_list}>
        <ProductSlideItemRoot
          slidePreview={slide.slide2}
          handleClick={handleSetNewPreviewImage}
          mainImage={previewImage}>
          <ProductSlideItemImage slidePreview={slide.slide2} model={model} />
        </ProductSlideItemRoot>

        <ProductSlideItemRoot
          handleClick={handleSetNewPreviewImage}
          mainImage={previewImage}
          slidePreview={slide.slide1}>
          <ProductSlideItemImage slidePreview={slide.slide1} model={model} />
        </ProductSlideItemRoot>

        <ProductSlideItemRoot
          handleClick={handleSetNewPreviewImage}
          mainImage={previewImage}
          slidePreview={slide.slide3}>
          <ProductSlideItemImage slidePreview={slide.slide3} model={model} />
        </ProductSlideItemRoot>
      </div>
    </div>
  );
};
