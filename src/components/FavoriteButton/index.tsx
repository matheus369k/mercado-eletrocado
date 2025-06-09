import { ProductType } from '@/@types/product';
import { useFavoriteProduct } from '@/hooks';
import styles from './index.module.css';
import { TbHeartFilled } from 'react-icons/tb';
import { CiHeart } from 'react-icons/ci';

interface FavoriteButtonProps extends Pick<ProductType, 'id'> {
  customClass?: string;
}

export const FavoriteButton = ({ id: productId, customClass }: FavoriteButtonProps) => {
  const { handleAddRemoveFavoriteProductId, IsFavoriteProduct } = useFavoriteProduct({
    id: productId,
  });

  return (
    <button
      aria-label="adicionar aos favoritos"
      title="Adicionar aos favoritos"
      onClick={handleAddRemoveFavoriteProductId}
      className={`${styles.btn_favorite} ${styles.product_favorite} ${styles[customClass]}`}
      type="button">
      {IsFavoriteProduct ? <TbHeartFilled /> : <CiHeart />}
    </button>
  );
};
