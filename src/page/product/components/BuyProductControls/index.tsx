import { useStockProduct } from '@/hooks/use-stock-product';
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
  const { isStockEmpty } = useStockProduct().handleIsStockEmpty({ id });
  const { hasCartAllProductsOfStock } = useStockProduct().handleCartHasAllProductsOfStock({
    id,
    productsAmount,
  });

  return (
    <div className={styles.buy_product_controls}>
      <Button
        disabled={isStockEmpty}
        title="botão para adicionar ao carrinho"
        onClick={() => handleBuyProduct({ id, price })}
        className={`flex-center ${styles.btn_buy_product} ${isStockEmpty ? styles.without_stock : ''}`}
        type="button"
        id="buy">
        <PiShoppingCartFill />
        adicionar
      </Button>

      <div className={styles.control_count}>
        <Button
          disabled={hasCartAllProductsOfStock}
          onClick={handleAddProduct}
          title="botão para adicionar mais produtos"
          type="button">
          <FaPlus />
        </Button>

        <span>{isStockEmpty ? 0 : productsAmount}</span>

        <Button
          disabled={isStockEmpty}
          onClick={handleRemoveProduct}
          title="botão para remover produtos"
          type="button">
          <FaMinus />
        </Button>
      </div>
    </div>
  );
};
