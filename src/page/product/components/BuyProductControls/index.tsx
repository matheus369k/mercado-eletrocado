import { useProduct } from '../../hooks/use-product';
import { PiShoppingCartFill } from 'react-icons/pi';
import { ProductIdType } from '@/@types/product';
import { FaMinus } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa';
import styles from './index.module.css';
import { Button } from '@/components';

interface RenderButtonsProps {
  id: ProductIdType;
  price: number;
}

export const BoyProductControls = ({ id, price }: RenderButtonsProps) => {
  const { handleAddProduct, handleBuyProduct, handleRemoveProduct, productsAmount } = useProduct();
  //const { isStockEmpty } = useStockProduct().handleIsStockEmpty({ id });
  //const { hasCartAllProductsOfStock } = useStockProduct().handleCartHasAllProductsOfStock({
  //  id,
  //  productsAmount,
  //});

  return (
    <div className={styles.buy_controls_container}>
      <div className={styles.control_count}>
        <Button onClick={handleAddProduct} title="botão para adicionar mais produtos" type="button">
          <FaPlus />
        </Button>

        <span>{productsAmount}</span>

        <Button onClick={handleRemoveProduct} title="botão para remover produtos" type="button">
          <FaMinus />
        </Button>
      </div>
      <Button
        title="botão para adicionar ao carrinho"
        onClick={() => handleBuyProduct({ id, price })}
        className={`flex-center ${styles.btn_buy_product}`}
        type="button"
        id="buy">
        <PiShoppingCartFill />
        adicionar
      </Button>
    </div>
  );
};
