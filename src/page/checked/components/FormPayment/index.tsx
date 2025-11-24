import { appUseSelector } from '@/redux/hook';
import { useRedirect } from '@/hooks';
import { removeAllCartProducts } from '@/redux/cart/slice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import styles from './index.module.css';
import { useState } from 'react';
import { Button } from '@/components';
import { Title } from '../Title';
import { ROUTES_PATHNAMES } from '@/util/const';
import {
  useCreateDeliveriesProducts,
  type UseCreateDeliveriesProductsRequest,
} from '../../http/use-create-delivery';

type PaymentType = 'credit-card' | 'debit-card' | 'pix' | 'ticket';

export const FormPayment = () => {
  const { cartProducts, totalPrice } = appUseSelector((state) => state.cart);
  const [payment, setPayment] = useState<PaymentType>();
  const { mutateAsync: createDeliveriesProducts } = useCreateDeliveriesProducts();
  const { handleTogglePage } = useRedirect();
  const dispatch = useDispatch();
  const TAX = 23.0;

  const handleSubmitPayment = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      if (!payment) return;

      const deliveriesProducts = cartProducts.reduce((acc, curr) => {
        for (let index = 0; index < curr.quantity; index++) {
          acc.push({
            productId: curr.data._id,
            price: curr.data.price,
            name: curr.data.model,
            image: curr.data.img,
          });
        }

        return acc;
      }, [] as UseCreateDeliveriesProductsRequest);

      await createDeliveriesProducts(deliveriesProducts);
      dispatch(removeAllCartProducts());

      toast.success('Compra feita com sucesso');
      handleTogglePage({ pathName: ROUTES_PATHNAMES.HOME });
    } catch (error) {
      toast.error('Error ao tentar compar');
      console.error(error);
    }
  };

  const handleAddPayment = (type: PaymentType) => {
    setPayment(type);
  };

  return (
    <form className={styles.form_container} onSubmit={handleSubmitPayment}>
      <div className={styles.description_container}>
        <Title>Forma de pagamento</Title>
        <span>Selecione abaixo a forma de pagamento.</span>
      </div>

      <div
        aria-label="payment content"
        data-payment-type={payment}
        className={styles.options_container}>
        <div
          aria-label="credit card option"
          className={styles.options_items}
          onClick={() => handleAddPayment('credit-card')}>
          <input type="radio" name="payment_type" />
          Cart Credito
        </div>
        <div
          aria-label="debit card option"
          className={styles.options_items}
          onClick={() => handleAddPayment('debit-card')}>
          <input type="radio" name="payment_type" />
          Cart Debito
        </div>
        <div
          aria-label="pix option"
          className={styles.options_items}
          onClick={() => handleAddPayment('pix')}>
          <input type="radio" name="payment_type" />
          Pix
        </div>
        <div
          aria-label="ticket option"
          className={styles.options_items}
          onClick={() => handleAddPayment('ticket')}>
          <input type="radio" name="payment_type" />
          Boleto
        </div>
      </div>

      <div className={styles.info_prices_container}>
        <p className={styles.info_prices_items}>
          <strong>Valor dos produtos:</strong>
          R$ {totalPrice.toFixed(2)}
        </p>

        <p className={styles.info_prices_items}>
          <strong>Taxa de envio:</strong>
          R$ {TAX.toFixed(2)}
        </p>

        <p className={styles.info_prices_items}>
          <strong>Valor final:</strong>
          R$ {(totalPrice + TAX).toFixed(2)}
        </p>
      </div>

      <Button disabled={!payment} type="submit">
        Confirmar
      </Button>
    </form>
  );
};
