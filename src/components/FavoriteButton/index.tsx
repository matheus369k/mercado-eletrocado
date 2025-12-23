import { ProductType } from '@/@types/product';
import { useFavoriteProduct, useRedirect } from '@/hooks';
import styles from './index.module.css';
import { TbHeartFilled } from 'react-icons/tb';
import { useCreateFavoriteProduct } from '@/http/use-create-favorite-products';
import { useDeleteFavoriteProduct } from '@/http/use-delete-favorite-products';
import { useGetAllFavoriteProduct } from '@/http/use-get-all-favorite-products';
import { useProfileAccount } from '@/http/use-profile-account';
import { ROUTES_PATHNAMES } from '@/util/const';
import { toast } from 'react-toastify';
import { useCallback, useMemo } from 'react';

export interface FavoriteButtonProps extends Pick<ProductType, '_id' | 'img' | 'model' | 'price'> {
  customClass?: string;
}

export const FavoriteButton = ({ customClass, ...data }: FavoriteButtonProps) => {
  const { mutateAsync: createFavoriteProduct } = useCreateFavoriteProduct();
  const { mutateAsync: deleteFavoriteProduct } = useDeleteFavoriteProduct();
  const { data: favoriteProducts } = useGetAllFavoriteProduct();
  const IsFavoriteProduct = useMemo(
    () => favoriteProducts?.some((favorite) => favorite.productId === data._id),
    [favoriteProducts],
  );
  const unauthorized = useProfileAccount().isError;

  const { handleTogglePage } = useRedirect();

  const handleAddRemoveFavoriteProductId = useCallback(async () => {
    try {
      if (unauthorized) {
        handleTogglePage({ pathName: ROUTES_PATHNAMES.USER_LOGIN });
        return;
      }
      const favoriteProduct = {
        productId: data._id,
        image: data.img,
        name: data.model,
        price: data.price,
      };

      if (IsFavoriteProduct) {
        await deleteFavoriteProduct({
          productId: favoriteProduct.productId,
        });
      } else {
        await createFavoriteProduct(favoriteProduct);
      }
    } catch (error) {
      toast.error('Error ao tentar adicionar favorito');
      console.error(error);
    }
  }, [unauthorized]);

  const labelTitleTextButton = (IsFavoriteProduct ? 'remover dos' : 'adicionar aos').concat(
    ' favoritos',
  );
  return (
    <button
      aria-label={labelTitleTextButton}
      data-is-favorite={!!IsFavoriteProduct}
      title={labelTitleTextButton}
      onClick={handleAddRemoveFavoriteProductId}
      className={`${styles.btn_favorite} ${styles.product_favorite} ${styles[customClass]}`}
      type="button">
      <TbHeartFilled />
    </button>
  );
};
