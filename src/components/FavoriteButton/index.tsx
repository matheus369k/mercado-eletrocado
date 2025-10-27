import { ProductType } from '@/@types/product';
import { useFavoriteProduct } from '@/hooks';
import styles from './index.module.css';
import { TbHeartFilled } from 'react-icons/tb';

interface FavoriteButtonProps extends Pick<ProductType, '_id' | 'img' | 'model' | 'price'> {
  customClass?: string;
}

export const FavoriteButton = ({ customClass, ...data }: FavoriteButtonProps) => {
  const { handleAddRemoveFavoriteProductId, IsFavoriteProduct } = useFavoriteProduct(data);

  return (
    <button
      aria-label="adicionar aos favoritos"
      data-is-favorite={!!IsFavoriteProduct}
      title="Adicionar aos favoritos"
      onClick={handleAddRemoveFavoriteProductId}
      className={`${styles.btn_favorite} ${styles.product_favorite} ${styles[customClass]}`}
      type="button">
      <TbHeartFilled />
    </button>
  );
};
