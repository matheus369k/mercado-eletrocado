import { PaymentTypeContext } from '../../contexts/payment-type';
import { ComponentProps, useContext } from 'react';
import { PaymentType } from '@/@types/payment';

interface PaymentListItemProps extends ComponentProps<'li'> {
  PaymentType: PaymentType;
}

export const PaymentListItem = ({ PaymentType, children, ...props }: PaymentListItemProps) => {
  const { handleSelectedPaymentType, selectedPaymentType } = useContext(PaymentTypeContext);

  return (
    <li
      {...props}
      onClick={() => handleSelectedPaymentType(PaymentType)}
      className={`${selectedPaymentType === PaymentType ? 'selected' : ''}`}>
      {children}
    </li>
  );
};
