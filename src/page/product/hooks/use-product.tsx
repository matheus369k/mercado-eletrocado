import { addSelectProduct, removeSelectProduct } from '@/redux/product/slice';
import { ProductAmountContext } from '../contexts/products-amount';
import { addCartProducts } from '@/redux/cart/slice';
import { SliceProductCartType } from '@/@types/product';
import { appUseSelector } from '@/redux/hook';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRedirect } from '@/hooks';

export const useProduct = () => {
  const { handleAddProduct, handleRemoveProduct, productsAmount, handleResetProducts } =
    useContext(ProductAmountContext);
  const { selected } = appUseSelector((state) => state.product);
  const { handleBackPage } = useRedirect();

  const dispatch = useDispatch();

  useEffect(() => {
    if (selected) return;

    const productCacheData = JSON.parse(localStorage.getItem('selectedProduct'));

    if (productCacheData) {
      dispatch(addSelectProduct(productCacheData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
