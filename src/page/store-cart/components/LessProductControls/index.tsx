import { useProduct } from '../../hooks/use-less-product';
import { ProductIdType } from '@/@types/product';
import { FaMinus } from 'react-icons/fa6';
import styles from './index.module.css';
import { FaPlus } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';

type RenderButtonsProps = { _id: ProductIdType };

export const LessProductControls = ({ _id }: RenderButtonsProps) => {
  const { handleAddProductCount, handleLessProduct, handleRemoveProductCount, productsLessCount } =
    useProduct();

  return (
    <div className={styles.less_product_controls_container}>
      <div className={styles.control_count}>
        <button
          aria-label="increment count"
          onClick={() => handleAddProductCount(_id)}
          title="Aumentar contador"
          type="button">
          <FaPlus />
        </button>

        <span aria-label="count product">{productsLessCount}</span>

        <button
          aria-label="decrement count"
          disabled={productsLessCount === 1}
          onClick={handleRemoveProductCount}
          title="Diminuir contador"
          type="button">
          <FaMinus />
        </button>
      </div>

      <button
        aria-label="remove product to cart"
        title="Remover produtos do carrinho"
        onClick={() => handleLessProduct({ id: _id, quantity: productsLessCount })}
        className={`flex-center ${styles.btn_less_product}`}
        type="button">
        <FiTrash />
      </button>
    </div>
  );
};
