import { useState, createContext } from 'react';
import { PaymentType } from '@/@types/payment';

interface PaymentTypeContext {
  selectedPaymentType: PaymentType;
  handleSelectedPaymentType: (payment: PaymentType) => void;
}

export const PaymentTypeContext = createContext({} as PaymentTypeContext);

export const PaymentTypeProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType>('pix');

  const handleSelectedPaymentType = (payment: PaymentType) => {
    setSelectedPaymentType(payment);
  };

  return (
    <PaymentTypeContext.Provider value={{ selectedPaymentType, handleSelectedPaymentType }}>
      {children}
    </PaymentTypeContext.Provider>
  );
};
