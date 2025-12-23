import { vi, describe, expect, it, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { render, screen } from '@testing-library/react';
import { PriceStockInfo } from '.';
import { BROWSER_STORAGE_KEYS } from '@/util/const';
import { afterEach } from 'vitest';

describe('price stock info component', () => {
  const spyMathRandom = vi.spyOn(Math, 'random');
  const product = {
    price: faker.number.int({ min: 150000, max: 300000 }),
    _id: faker.database.mongodbObjectId(),
  };

  beforeEach(() => {
    // implementation return max value when call random number
    spyMathRandom.mockReturnValue(1);
  });

  afterEach(() => {
    window.localStorage.removeItem(BROWSER_STORAGE_KEYS.PERCENT_DISCOUNT);
  });

  it('should calculate and showing product price with discount', () => {
    render(<PriceStockInfo {...product} />);

    const price = product.price / 100;
    const priceWithDiscount = price - (price * 50) / 100;
    screen.getByText(`R$ ${priceWithDiscount.toFixed(2)}`);
  });

  it('should calculate and showing product price without discount', () => {
    render(<PriceStockInfo {...product} />);

    const price = product.price / 100;
    screen.getByText(`R$ ${price.toFixed(2)}`);
  });

  it('should showing percent discount', () => {
    render(<PriceStockInfo {...product} />);

    screen.getByText('50% OFF');
  });

  it('should calculate and showing product price division ten', () => {
    render(<PriceStockInfo {...product} />);

    const price = product.price / 100;
    const priceWithDiscount = price - (price * 50) / 100;
    const priceDivisionForTen = priceWithDiscount / 10;
    screen.getByText(`10X de R$ ${priceDivisionForTen.toFixed(2)} sem juros`);
  });

  it('no should recalculate percent of discount when have data saved in cache', () => {
    window.localStorage.setItem(
      BROWSER_STORAGE_KEYS.PERCENT_DISCOUNT,
      JSON.stringify([
        {
          productId: product._id,
          percentDiscount: 25,
        },
      ]),
    );

    render(<PriceStockInfo {...product} />);

    screen.getByText('25% OFF');
  });
});
