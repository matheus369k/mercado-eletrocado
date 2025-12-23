import { ProductType } from '@/@types/product';
import styles from './index.module.css';
import { memo } from 'react';
import { browserLocalStorage } from '@/util/browser-storage';
import { BROWSER_STORAGE_KEYS } from '@/util/const';

type priceDiscount = {
  productId: string;
  percentDiscount: number;
};

export interface PriceStockInfoProps extends Pick<ProductType, 'price' | '_id'> {
  customClass?: string;
}

export const PriceStockInfo = memo(({ price, _id, customClass }: PriceStockInfoProps) => {
  const calcPricesInfos = ({ price, productId }: { price: number; productId: string }) => {
    const productPrice = price / 100;
    const maxPercentDiscount = 50;
    const percentsDiscountsCache: priceDiscount[] =
      browserLocalStorage.get(BROWSER_STORAGE_KEYS.PERCENT_DISCOUNT) || [];

    const percentDiscountCache = percentsDiscountsCache.find(
      (priceDiscounts) => priceDiscounts.productId === productId,
    )?.percentDiscount;

    if (percentDiscountCache) {
      const priceWithDiscount = productPrice - (productPrice * percentDiscountCache) / 100;
      const divisionForTen = priceWithDiscount / 10;

      return {
        percentDiscount: percentDiscountCache,
        priceWithoutDiscount: productPrice,
        priceWithDiscount,
        divisionForTen,
      };
    }

    const percentDiscount = Math.floor(Math.random() * maxPercentDiscount);
    const priceWithDiscount = productPrice - (productPrice * percentDiscount) / 100;
    const divisionForTen = priceWithDiscount / 10;

    browserLocalStorage.add({
      key: BROWSER_STORAGE_KEYS.PERCENT_DISCOUNT,
      value: JSON.stringify([...percentsDiscountsCache, { productId, percentDiscount }]),
    });

    return {
      priceWithoutDiscount: productPrice,
      priceWithDiscount,
      percentDiscount,
      divisionForTen,
    };
  };

  const priceInfos = calcPricesInfos({ price, productId: _id });

  return (
    <div className={`${styles[customClass]} ${styles.price_stock_display}`}>
      <ul className={styles.price_display}>
        <li className={styles.old_price}>R$ {priceInfos.priceWithoutDiscount.toFixed(2)}</li>
        <li className={styles.new_price}>R$ {priceInfos.priceWithDiscount.toFixed(2)}</li>
        <li className={styles.discount}>{priceInfos.percentDiscount}% OFF</li>
        <li className={styles.plots}>
          em <span>10X de R$ {priceInfos.divisionForTen.toFixed(2)} sem juros</span>
        </li>
      </ul>
    </div>
  );
});
