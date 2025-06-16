import { ProductIdType, QuantityProductType } from '@/@types/product';
import { ProductLessContext } from '../contexts/products-less';
import { removeCartProduct } from '@/redux/cart/slice';
import { useDispatch } from 'react-redux';
import { useSelectProduct } from '@/hooks/';
import { useContext } from 'react';

type HandleLessProductProps = {
  id: ProductIdType;
  quantity: QuantityProductType;
};

export const useProduct = () => {
  const {
    handleAddProductCount,
    handleRemoveProductCount,
    handleResetProductsCount,
    productsLessCount,
  } = useContext(ProductLessContext);
  const { handleAddStoreProduct } = useSelectProduct();
  const dispatch = useDispatch();

  const handleLessProduct = ({ id, quantity }: HandleLessProductProps) => {
    dispatch(removeCartProduct({ id, quantity }));
    handleResetProductsCount();
  };

  return {
    handleAddStoreProduct,
    handleLessProduct,
    handleAddProductCount,
    handleRemoveProductCount,
    productsLessCount,
  };
};
