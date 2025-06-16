import type { ProductIdType } from '@/@types/product';
import { browserLocalStorage } from './browser-storage';
import { BROWSER_STORAGE_KEYS } from './const';

type priceDiscount = {
  idProduct: ProductIdType;
  percentDiscount: number;
};

export const generateRandomNumber = (limite: number) => {
  return Math.floor(Math.random() * limite);
};

export const calcDiscountOfProductPrice = (limite: number, price: number, id: ProductIdType) => {
  const percentsDiscountsCache: priceDiscount[] =
    browserLocalStorage.get(BROWSER_STORAGE_KEYS.PERCENT_DISCOUNT) || [];

  const percentDiscountCache = percentsDiscountsCache.find(
    (priceDiscount) => priceDiscount.idProduct === id,
  );

  if (percentDiscountCache) {
    const calcDiscountPrice = (price * percentDiscountCache.percentDiscount) / 100 + price;
    const divisionTen = calcDiscountPrice / 10;

    return {
      divisionTen: divisionTen,
      priceDiscount: calcDiscountPrice,
      price: price,
      percent: percentDiscountCache.percentDiscount,
    };
  }

  const generatePercentDiscount = generateRandomNumber(limite);
  const calcDesCountPrice = (price * generatePercentDiscount) / 100 + price;
  const divisionTen = calcDesCountPrice / 10;

  browserLocalStorage.add({
    key: BROWSER_STORAGE_KEYS.PERCENT_DISCOUNT,
    value: JSON.stringify([
      ...percentsDiscountsCache,
      { idProduct: id, percentDiscount: generatePercentDiscount },
    ]),
  });

  return {
    divisionTen: divisionTen,
    priceDiscount: calcDesCountPrice,
    price: price,
    percent: generatePercentDiscount,
  };
};
