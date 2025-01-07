import { useProduct } from '../../hooks/use-less-product';
import { PiShoppingCartFill } from 'react-icons/pi';
import { ProductIdType } from '@/@types/product';
import { FaMinus } from 'react-icons/fa6';
import { useStockProduct } from '@/hooks';
import styles from './index.module.css';
import { FaPlus } from 'react-icons/fa';
import { Button } from '@/components';

type RenderButtonsProps = { id: ProductIdType };

export const LessProductDisplay = ({ id }: RenderButtonsProps) => {
  const { handleAddProductCount, handleLessProduct, handleRemoveProductCount, productsLessCount } =
    useProduct();
  const { isGetAllProductToRemove } = useStockProduct().handleIsSelectAllProductToRemove({
    id,
    productsLessCount,
  });

  return (
    <div className={styles.less_product_controls_container}>
      <Button
        title="botão para adicionar aos favoritos"
        onClick={() => handleLessProduct({ id, quantity: productsLessCount })}
        className={`flex-center ${styles.btn_less_product}`}
        type="button"
        id="buy">
        <PiShoppingCartFill />
        remover
      </Button>

      <div className={styles.control_count}>
        <Button
          disabled={isGetAllProductToRemove}
          onClick={handleAddProductCount}
          title="botão para adicionar mais produtos"
          type="button">
          <FaPlus />
        </Button>

        <span>{productsLessCount}</span>

        <Button
          disabled={productsLessCount === 1}
          onClick={handleRemoveProductCount}
          title="botão para remover produtos"
          type="button">
          <FaMinus />
        </Button>
      </div>
    </div>
  );
};
