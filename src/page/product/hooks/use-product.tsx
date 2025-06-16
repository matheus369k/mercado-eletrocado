import { removeSelectProduct } from '@/redux/product/slice';
import { ProductAmountContext } from '../contexts/products-amount';
import { addCartProducts } from '@/redux/cart/slice';
import { SliceProductCartType } from '@/@types/product';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useRedirect } from '@/hooks';

export const useProduct = () => {
  const { handleAddProduct, handleRemoveProduct, productsAmount, handleResetProducts } =
    useContext(ProductAmountContext);
  const { handleBackPage } = useRedirect();

  const dispatch = useDispatch();

  const handleBuyProduct = ({ data }: Omit<SliceProductCartType, 'quantity'>) => {
    dispatch(
      addCartProducts([
        {
          data,
          quantity: productsAmount,
        },
      ]),
    );

    handleResetProducts();
  };

  const handleRemoveStoreProduct = () => {
    handleBackPage();
    dispatch(removeSelectProduct());
  };

  return {
    handleRemoveStoreProduct,
    handleAddProduct,
    handleRemoveProduct,
    productsAmount,
    handleBuyProduct,
    handleResetProducts,
  };
};
