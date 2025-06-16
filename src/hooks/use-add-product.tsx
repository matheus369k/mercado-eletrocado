import { addSelectProduct } from '@/redux/product/slice';
import { ProductType } from '@/@types/product';
import { useRedirect } from './use-redirect';
import { useDispatch } from 'react-redux';
import { ROUTES_PATHNAMES } from '@/util/const';

export const useSelectProduct = () => {
  const { handleTogglePage } = useRedirect();
  const dispatch = useDispatch();

  const handleAddStoreProduct = (product: ProductType) => {
    dispatch(addSelectProduct(product));
    handleTogglePage({
      pathName: ROUTES_PATHNAMES.PRODUCT.replace(':productId', product.id.toString()),
    });
  };

  return {
    handleAddStoreProduct,
  };
};
