import { useProduct } from '../../hooks/use-less-product';
import { ProductIdType } from '@/@types/product';
import { FaMinus } from 'react-icons/fa6';
import styles from './index.module.css';
import { FaPlus } from 'react-icons/fa';

type RenderButtonsProps = { id: ProductIdType };

export const LessProductDisplay = ({ id }: RenderButtonsProps) => {
  const { handleAddProductCount, handleLessProduct, handleRemoveProductCount, productsLessCount } =
    useProduct();

  return (
    <div className={styles.less_product_controls_container}>
      <div className={styles.control_count}>
        <button
          aria-label="Aumentar"
          onClick={() => handleAddProductCount(id)}
          title="Aumentar contador"
          type="button">
          <FaPlus />
        </button>

        <span>{productsLessCount}</span>

        <button
          aria-label="Diminuir"
          disabled={productsLessCount === 1}
          onClick={handleRemoveProductCount}
          title="Diminuir contador"
          type="button">
          <FaMinus />
        </button>
      </div>

      <button
        aria-label="Remover produtos do carrinho"
        title="Remover produtos do carrinho"
        onClick={() => handleLessProduct({ id, quantity: productsLessCount })}
        className={`flex-center ${styles.btn_less_product}`}
        type="button"
        id="buy">
        remover
      </button>
    </div>
  );
};
