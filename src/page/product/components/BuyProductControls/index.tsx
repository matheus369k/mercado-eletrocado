import { useProduct } from '../../hooks/use-product';
import { PiShoppingCartFill } from 'react-icons/pi';
import { SliceProductCartType } from '@/@types/product';
import { FaMinus } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa';
import styles from './index.module.css';
import { Button } from '@/components';

export const BoyProductControls = ({ data }: Omit<SliceProductCartType, 'quantity'>) => {
  const { handleAddProduct, handleBuyProduct, handleRemoveProduct, productsAmount } = useProduct();

  return (
    <div className={styles.buy_controls_container}>
      <div className={styles.control_count}>
        <button
          onClick={handleAddProduct}
          aria-label="aumenta contador"
          title="Adicionar"
          type="button">
          <FaPlus />
        </button>

        <span>{productsAmount}</span>

        <button
          onClick={handleRemoveProduct}
          aria-label="diminui contador"
          title="Remover"
          type="button">
          <FaMinus />
        </button>
      </div>
      <Button
        title="botão para adicionar ao carrinho"
        onClick={() => handleBuyProduct({ data })}
        className={`flex-center ${styles.btn_buy_product}`}
        type="button">
        <PiShoppingCartFill />
        adicionar
      </Button>
    </div>
  );
};
