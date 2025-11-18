import { vi, describe, expect, it, beforeEach } from 'vitest';
import { calcDiscountOfProductPrice, generateRandomNumber } from './calc-discount';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { BROWSER_STORAGE_KEYS } from './const';

describe('generate random number', () => {
  it('generate random number lowest of 25', () => {
    const randomNumber = generateRandomNumber(25);

    expect(randomNumber).lessThan(25);
  });
});

describe('calc discount product function', () => {
  const spyMathRandom = vi.spyOn(Math, 'random');
  const calcDiscountOfProductPriceProps = {
    id: faker.database.mongodbObjectId(),
    limite: 10,
    price: 135056,
  };
  const productDiscountValues = [
    {
      idProduct: calcDiscountOfProductPriceProps.id,
      percentDiscount: 10,
    },
  ];

  beforeEach(() => {
    spyMathRandom.mockReturnValue(1);
  });

  it('should get cache discount saved in localStorage when is have', () => {
    window.localStorage.setItem(
      BROWSER_STORAGE_KEYS.PERCENT_DISCOUNT,
      JSON.stringify(productDiscountValues),
    );
    const { percent } = calcDiscountOfProductPrice(
      10,
      calcDiscountOfProductPriceProps.price,
      calcDiscountOfProductPriceProps.id,
    );

    expect(percent).toEqual(productDiscountValues[0].percentDiscount);
  });

  it('should discount price randomized and saved in localStorage', () => {
    spyMathRandom.mockReset();
    window.localStorage.removeItem(BROWSER_STORAGE_KEYS.PERCENT_DISCOUNT);
    const { percent } = calcDiscountOfProductPrice(
      10,
      calcDiscountOfProductPriceProps.price,
      calcDiscountOfProductPriceProps.id,
    );

    expect(percent).not.toEqual(productDiscountValues[0].percentDiscount);
    expect(window.localStorage.getItem(BROWSER_STORAGE_KEYS.PERCENT_DISCOUNT)).include(
      calcDiscountOfProductPriceProps.id,
    );
  });
});
