import { ProductType } from '@/@types/product';
import { useRedirect } from '.';
import { ROUTES_PATHNAMES } from '@/util/const';
import { useProfileAccount } from '@/http/use-profile-account';
import { useCreateFavoriteProduct } from '@/http/use-create-favorite-products';
import { useDeleteFavoriteProduct } from '@/http/use-delete-favorite-products';
import { useQueryClient } from '@tanstack/react-query';
import { useGetAllFavoriteProduct } from '@/http/use-get-all-favorite-products';

interface UseFavoriteProductProps extends Pick<ProductType, '_id' | 'img' | 'model' | 'price'> {}

export const useFavoriteProduct = (props: UseFavoriteProductProps) => {
  const { mutateAsync: createFavoriteProduct } = useCreateFavoriteProduct();
  const { mutateAsync: deleteFavoriteProduct } = useDeleteFavoriteProduct();
  const IsFavoriteProduct = useGetAllFavoriteProduct().data?.some(
    (favorite) => favorite.productId === props._id,
  );
  const unauthorized = useProfileAccount().isError;

  const { handleTogglePage } = useRedirect();
  const queryClient = useQueryClient();

  const handleAddRemoveFavoriteProductId = async () => {
    try {
      if (unauthorized) {
        handleTogglePage({ pathName: ROUTES_PATHNAMES.USER_LOGIN });
        return;
      }

      if (IsFavoriteProduct) {
        await deleteFavoriteProduct({
          productId: props._id,
        });
      } else {
        await createFavoriteProduct({
          productId: props._id,
          image: props.img,
          name: props.model,
          price: props.price,
        });
      }

      queryClient.invalidateQueries({
        queryKey: ['favorite-products', 'all-favorites-products'],
      });

      queryClient.invalidateQueries({
        queryKey: ['favorite-products', props._id],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleAddRemoveFavoriteProductId,
    IsFavoriteProduct,
  };
};
