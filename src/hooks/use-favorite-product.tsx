import { addFavoriteProduct, removeFavoriteProduct } from '@/redux/favorite/slice';
import { ProductType } from '@/@types/product';
import { appUseSelector } from '@/redux/hook';
import { useDispatch } from 'react-redux';
import { useRedirect } from '.';
import { ROUTES_PATHNAMES } from '@/util/const';
import { useProfileAccount } from '@/http/use-profile-account';

export const useFavoriteProduct = (data: ProductType) => {
  const { favoriteProducts } = appUseSelector((state) => state.favorite);
  const notHasAuthorization = useProfileAccount().isError;
  const { handleTogglePage } = useRedirect();
  const IsFavoriteProduct = favoriteProducts.find((product) =>
    product._id === data._id ? true : false,
  );
  const dispatch = useDispatch();

  const handleAddRemoveFavoriteProductId = () => {
    if (notHasAuthorization) {
      handleTogglePage({ pathName: ROUTES_PATHNAMES.USER_LOGIN });
      return;
    }

    if (IsFavoriteProduct) {
      dispatch(removeFavoriteProduct(data._id));
      return;
    }

    dispatch(addFavoriteProduct(data));
  };

  return {
    handleAddRemoveFavoriteProductId,
    IsFavoriteProduct,
  };
};
