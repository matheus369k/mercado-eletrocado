import { FaBitcoin, FaCreditCard } from 'react-icons/fa';
import { PaymentListItem } from './PaymentListItem';
import { IoReceiptSharp } from 'react-icons/io5';
import { BsBank2 } from 'react-icons/bs';
import styles from './index.module.css';
import { FaPix } from 'react-icons/fa6';
import { Title } from '../Title/';

export const PaymentSection = () => {
  return (
    <section className={styles.payment_display}>
      <Title customClass="payment_title">
        Forma de <BsBank2 />
        pagamento
      </Title>
      <p>Selecione abaixo a forma de pagamento.</p>
      <ul className={styles.payment_options}>
        <PaymentListItem PaymentType="card">
          <FaCreditCard />
          Cartão
        </PaymentListItem>
        <PaymentListItem PaymentType="pix">
          <FaPix />
          Pix
        </PaymentListItem>
        <PaymentListItem PaymentType="boleto">
          <IoReceiptSharp />
          Boleto
        </PaymentListItem>
        <PaymentListItem PaymentType="bitcoin">
          <FaBitcoin />
          Bitcoin
        </PaymentListItem>
      </ul>
    </section>
  );
};
