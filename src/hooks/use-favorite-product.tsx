import { addFavoriteProduct, removeFavoriteProduct } from '@/redux/favorite/slice';
import { detectFavoriteProduct } from '@/functions';
import { ProductType } from '@/@types/product';
import { appUseSelector } from '@/redux/hook';
import { useDispatch } from 'react-redux';
import { useRedirectionPage } from '.';

type UseFavoriteProduct = Pick<ProductType, 'id'>;

export const useFavoriteProduct = ({ id: productId }: UseFavoriteProduct) => {
  const { favoriteProducts } = appUseSelector((state) => state.favorite);
  const { handleVerificationUserHasAccount } = useRedirectionPage();
  const { IsFavoriteProduct } = detectFavoriteProduct({
    id: productId,
    stateDatas: favoriteProducts,
  });

  const dispatch = useDispatch();

  const handleAddRemoveFavoriteProductId = () => {
    handleVerificationUserHasAccount();

    if (IsFavoriteProduct) {
      dispatch(removeFavoriteProduct(productId));
      return;
    }

    dispatch(addFavoriteProduct([productId]));
  };

  return {
    handleAddRemoveFavoriteProductId,
    IsFavoriteProduct,
  };
};
