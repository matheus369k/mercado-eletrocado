import { PaymentTypeContext } from '../contexts/payment-type';
import { removeAllCartProducts } from '@/redux/cart/slice';
import { addEnvoyProducts } from '@/redux/envoy/slice';
import { routesPath } from '@/routes/routes-path';
import { appUseSelector } from '@/redux/hook';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRedirect } from '@/hooks';
import { useContext } from 'react';

export const useProductBuy = () => {
  const { cartProducts } = appUseSelector((state) => state.cart);
  const { selectedPaymentType } = useContext(PaymentTypeContext);
  const { handleTogglePage } = useRedirect();

  const dispatch = useDispatch();

  const handleConfirmBuy = () => {
    console.log(selectedPaymentType);

    dispatch(addEnvoyProducts(cartProducts));
    dispatch(removeAllCartProducts());

    toast.success('Compra feita com sucesso');

    handleTogglePage({ pathName: routesPath.HOME });
  };

  return {
    handleConfirmBuy,
  };
};
