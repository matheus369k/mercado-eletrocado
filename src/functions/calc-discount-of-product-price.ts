import type { ProductIdType } from '@/@types/product';

type priceDiscount = {
  idProduct: ProductIdType;
  percentDiscount: number;
};

export const generateRandomNumber = (limite: number) => {
  return Math.floor(Math.random() * limite);
};

export const calcDiscountOfProductPrice = (limite: number, price: number, id: ProductIdType) => {
  const percentsDiscountsCache: priceDiscount[] =
    JSON.parse(localStorage.getItem('percentDiscount')) || [];

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

  console.log(generateRandomNumber(limite));
  const generatePercentDiscount = generateRandomNumber(limite);
  const calcDesCountPrice = (price * generatePercentDiscount) / 100 + price;
  const divisionTen = calcDesCountPrice / 10;

  localStorage.setItem(
    'percentDiscount',
    JSON.stringify([
      ...percentsDiscountsCache,
      { idProduct: id, percentDiscount: generatePercentDiscount },
    ]),
  );

  return {
    divisionTen: divisionTen,
    priceDiscount: calcDesCountPrice,
    price: price,
    percent: generatePercentDiscount,
  };
};
