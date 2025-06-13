import { addFavoriteProduct, removeFavoriteProduct } from '@/redux/favorite/slice';
import { ProductType } from '@/@types/product';
import { appUseSelector } from '@/redux/hook';
import { useDispatch } from 'react-redux';
import { useRedirect } from '.';
import { routesPath } from '@/routes/routes-path';

export const useFavoriteProduct = (data: ProductType) => {
  const { favoriteProducts } = appUseSelector((state) => state.favorite);
  const { userDatas } = appUseSelector((state) => state.user);
  const { handleTogglePage } = useRedirect();
  const IsFavoriteProduct = favoriteProducts.find((product) =>
    product.id === data.id ? true : false,
  );
  const dispatch = useDispatch();

  const handleAddRemoveFavoriteProductId = () => {
    if (!userDatas) {
      handleTogglePage({ pathName: routesPath.USER_LOGIN });
      return;
    }

    if (IsFavoriteProduct) {
      dispatch(removeFavoriteProduct(data.id));
      return;
    }

    dispatch(addFavoriteProduct(data));
  };

  return {
    handleAddRemoveFavoriteProductId,
    IsFavoriteProduct,
  };
};
