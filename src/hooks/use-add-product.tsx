import { addSelectProduct } from '@/redux/product/slice';
import { routesPath } from '@/routes/routes-path';
import { ProductType } from '@/@types/product';
import { useRedirect } from './use-redirect';
import { useDispatch } from 'react-redux';

export const useSelectProduct = () => {
  const { handleTogglePage } = useRedirect();
  const dispatch = useDispatch();

  const handleAddStoreProduct = (product: ProductType) => {
    dispatch(addSelectProduct(product));
    handleTogglePage({ pathName: routesPath.PRODUCT.replace(':productId', product.id.toString()) });
  };

  return {
    handleAddStoreProduct,
  };
};
