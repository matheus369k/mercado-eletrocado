import type { ComponentProps } from 'react';
import styles from './index.module.css';

interface ProductSlideItemRootProps extends ComponentProps<'div'> {
  mainImage: string;
  slidePreview: string;
  handleClick: (slidePreview: string) => void;
}

export const ProductSlideItemRoot = ({
  mainImage,
  slidePreview,
  handleClick,
  ...props
}: ProductSlideItemRootProps) => {
  return (
    <div
      {...props}
      aria-label="preview product item"
      onClick={() => handleClick(slidePreview)}
      className={`${styles.pictures_previews_items} ${mainImage === slidePreview ? styles.current_slide : ''}`}
    />
  );
};

interface ProductSlideItemImageProps extends ComponentProps<'img'> {
  model: string;
  slidePreview: string;
}

export const ProductSlideItemImage = ({
  slidePreview,
  model,
  ...props
}: ProductSlideItemImageProps) => {
  return (
    <img
      {...props}
      src={slidePreview}
      alt={model}
      loading="lazy"
      aria-label="images product item"
    />
  );
};
