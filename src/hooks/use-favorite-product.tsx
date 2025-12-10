import { ProductType } from '@/@types/product';
import { useRedirect } from '.';
import { ROUTES_PATHNAMES } from '@/util/const';
import { useProfileAccount } from '@/http/use-profile-account';
import { useCreateFavoriteProduct } from '@/http/use-create-favorite-products';
import { useDeleteFavoriteProduct } from '@/http/use-delete-favorite-products';
import { useGetAllFavoriteProduct } from '@/http/use-get-all-favorite-products';
import { toast } from 'react-toastify';

interface UseFavoriteProductProps extends Pick<ProductType, '_id' | 'img' | 'model' | 'price'> {}

export const useFavoriteProduct = (props: UseFavoriteProductProps) => {
  const { mutateAsync: createFavoriteProduct } = useCreateFavoriteProduct();
  const { mutateAsync: deleteFavoriteProduct } = useDeleteFavoriteProduct();
  const { data: favoriteProducts } = useGetAllFavoriteProduct();
  const IsFavoriteProduct = favoriteProducts?.some((favorite) => favorite.productId === props._id);
  const unauthorized = useProfileAccount().isError;

  const { handleTogglePage } = useRedirect();

  const handleAddRemoveFavoriteProductId = async () => {
    try {
      if (unauthorized) {
        handleTogglePage({ pathName: ROUTES_PATHNAMES.USER_LOGIN });
        return;
      }
      const favoriteProduct = {
        productId: props._id,
        image: props.img,
        name: props.model,
        price: props.price,
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
  };

  return {
    handleAddRemoveFavoriteProductId,
    IsFavoriteProduct,
  };
};
