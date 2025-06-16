import { appUseSelector } from '@/redux/hook';
import { useRedirect } from '@/hooks';
import { addEnvoyProducts } from '@/redux/envoy/slice';
import { removeAllCartProducts } from '@/redux/cart/slice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import styles from './index.module.css';
import { useState } from 'react';
import { Button } from '@/components';
import { Title } from '../Title';
import { ROUTES_PATHNAMES } from '@/util/const';

type PaymentType = 'credit-card' | 'debit-card' | 'pix' | 'ticket';

export const FormPayment = () => {
  const { cartProducts, totalPrice } = appUseSelector((state) => state.cart);
  const [payment, setPayment] = useState<PaymentType>();
  const { handleTogglePage } = useRedirect();
  const dispatch = useDispatch();
  const TAX = 23.0;

  const handleSubmitPayment = () => {
    if (!payment) return;
    dispatch(addEnvoyProducts({ products: cartProducts, payment_type: payment }));
    dispatch(removeAllCartProducts());
    toast.success('Compra feita com sucesso');
    handleTogglePage({ pathName: ROUTES_PATHNAMES.HOME });
  };

  const handleAddPayment = (type: PaymentType) => {
    setPayment(type);
  };

  return (
    <form className={styles.form_container} onSubmit={handleSubmitPayment}>
      <div className={styles.form__header_container}>
        <Title>Forma de pagamento</Title>
        <span>Selecione abaixo a forma de pagamento.</span>
      </div>

      <div className={styles.form__options_container}>
        <div
          className={styles.form__options__items}
          onClick={() => handleAddPayment('credit-card')}>
          <input type="radio" name="payment_type" />
          Cart Credito
        </div>
        <div className={styles.form__options__items} onClick={() => handleAddPayment('debit-card')}>
          <input type="radio" name="payment_type" />
          Cart Debito
        </div>
        <div className={styles.form__options__items} onClick={() => handleAddPayment('pix')}>
          <input type="radio" name="payment_type" />
          Pix
        </div>
        <div className={styles.form__options__items} onClick={() => handleAddPayment('ticket')}>
          <input type="radio" name="payment_type" />
          Boleto
        </div>
      </div>

      <div className={styles.form__info_prices_container}>
        <p className={styles.form__info_prices__items}>
          <strong>Taxa de envio:</strong>
          R$ {TAX.toFixed(2)}
        </p>
        <p className={styles.form__info_prices__items}>
          <strong>Total dos produtos:</strong>
          R$ {totalPrice.toFixed(2)}
        </p>
        <p className={styles.form__info_prices__items}>
          <strong>Total final:</strong>
          R$ {(totalPrice + TAX).toFixed(2)}
        </p>
      </div>

      <Button disabled={!payment} type="submit">
        Confirmar
      </Button>
    </form>
  );
};
