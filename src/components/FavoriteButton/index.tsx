import { ProductType } from '@/@types/product';
import { useFavoriteProduct } from '@/hooks';
import { MdFavorite } from 'react-icons/md';
import styles from './index.module.css';
import { Button } from '..';

interface FavoriteButtonProps extends Pick<ProductType, 'id'> {
  customClass?: string;
}

export const FavoriteButton = ({ id: productId, customClass }: FavoriteButtonProps) => {
  const { handleAddRemoveFavoriteProductId, IsFavoriteProduct } = useFavoriteProduct({
    id: productId,
  });

  return (
    <Button
      title="botão para adicionar aos favoritos"
      onClick={handleAddRemoveFavoriteProductId}
      className={`${styles.btn_favorite} ${IsFavoriteProduct ? styles.product_favorite : ''} ${styles[customClass]}`}
      type="button">
      <MdFavorite />
    </Button>
  );
};
