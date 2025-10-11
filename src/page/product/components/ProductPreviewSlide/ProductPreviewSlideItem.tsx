import styles from './index.module.css';

interface ProductSlideItemProps {
  mainImage: string;
  SlidePreview: string;
  model: string;
  handleSetNewPreviewImage: (SlidePreview: string) => void;
}

export const ProductSlideItem = ({
  mainImage,
  SlidePreview,
  model,
  handleSetNewPreviewImage,
}: ProductSlideItemProps) => {
  return (
    <li
      onClick={() => handleSetNewPreviewImage(SlidePreview)}
      className={`${styles.pictures_previews_items} ${mainImage === SlidePreview ? styles.current_slide : ''}`}>
      <img src={SlidePreview} alt={model} loading="lazy" />
    </li>
  );
};
