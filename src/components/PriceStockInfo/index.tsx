import { calcDiscountOfProductPrice } from '@/util/calc-discount';
import { ProductType } from '@/@types/product';
import styles from './index.module.css';
import { useLocation } from 'react-router-dom';
import { ROUTES_PATHNAMES } from '@/util/const';

interface PriceStockInfoProps extends Pick<ProductType, 'price' | '_id'> {
  customClass?: string;
}

export const PriceStockInfo = ({ price, _id, customClass }: PriceStockInfoProps) => {
  const { pathname } = useLocation();
  let formattedPrice = price;
  if (pathname.includes(ROUTES_PATHNAMES.USER)) {
    formattedPrice = price / 100;
  }
  const priceInfo = calcDiscountOfProductPrice(50, formattedPrice, _id);

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
    </div>
  );
};
