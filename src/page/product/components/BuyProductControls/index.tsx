import { PiShoppingCartFill } from 'react-icons/pi';
import { SliceProductCartType } from '@/@types/product';
import { FaMinus } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa';
import styles from './index.module.css';
import { Button } from '@/components';
import { useContext } from 'react';
import { ProductAmountContext } from '../../contexts/products-amount';
import { useDispatch } from 'react-redux';
import { addCartProducts } from '@/redux/cart/slice';

export const BoyProductControls = ({ data }: Omit<SliceProductCartType, 'quantity'>) => {
  const { productsAmount, handleResetProducts, handleAddProduct, handleRemoveProduct } =
    useContext(ProductAmountContext);
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
