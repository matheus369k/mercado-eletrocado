import { calcDiscountOfProductPrice } from '@/functions';
import { ProductType } from '@/@types/product';
import { FaBox } from 'react-icons/fa';
import styles from './index.module.css';

interface PriceStockInfoProps extends Pick<ProductType, 'price' | 'id' | 'stock'> {
  customClass?: string;
}

export const PriceStockInfo = ({ price, id, stock, customClass }: PriceStockInfoProps) => {
  const priceInfo = calcDiscountOfProductPrice(50, price, id);

  const priceWithoutDiscount = 'R$' + priceInfo.priceDiscount.toFixed(2);
  const priceWithDiscount = 'R$' + priceInfo.price.toFixed(2);
  const percentualDiscount = priceInfo.percent + '% OFF';
  const priceDivisionForTen = 'R$' + priceInfo.divisionTen.toFixed(2);

  return (
    <div className={`${styles[customClass]} ${styles.price_stock_display}`}>
      <ul className={styles.price_display}>
        <li className={styles.old_price}>{priceWithoutDiscount}</li>
        <li className={styles.new_price}>{priceWithDiscount}</li>
        <li className={styles.discount}>{percentualDiscount}</li>
        <li className={styles.plots}>
          em <span>10X de {priceDivisionForTen} sem juros</span>
        </li>
      </ul>
      <span className={styles.stock_display}>
        <FaBox />
        Pcd:{stock}
      </span>
    </div>
  );
};
