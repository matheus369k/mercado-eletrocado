import { describe, expect, it } from 'vitest';
import { ProductsAmountProvider } from '../../contexts/products-amount';
import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { BoyProductControls } from '.';
import { faker } from '@faker-js/faker/locale/pt_BR';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import cartReducer from '@/redux/cart/slice';
import { BROWSER_STORAGE_KEYS } from '@/util/const';

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ProductsAmountProvider>
      <Provider
        store={configureStore({
          reducer: {
            cart: cartReducer,
          },
        })}>
        {children}
      </Provider>
    </ProductsAmountProvider>
  );
};

describe('buy products controls component', () => {
  const userEvents = userEvent.setup();
  const product = {
    _id: faker.database.mongodbObjectId(),
    price: faker.number.int({ min: 156899, max: 347499 }),
    model: faker.commerce.productName(),
    img: faker.image.url(),
    slide: {
      slide1: faker.image.url(),
      slide2: faker.image.url(),
      slide3: faker.image.url(),
    },
    screen: faker.commerce.productMaterial(),
    processor: faker.commerce.productMaterial(),
    memory: faker.commerce.productMaterial(),
    placeVideo: faker.commerce.productMaterial(),
    battery: faker.commerce.productMaterial(),
    category: faker.commerce.department(),
  };

  it('should increment value when is clicked in plus button', async () => {
    render(<BoyProductControls data={product} />, { wrapper });

    await userEvents.click(screen.getByLabelText(/aumenta contador/i));

    expect(screen.getByLabelText(/count product/i)).toHaveTextContent('2');
  });

  it('should decrement value when is clicked in minus button', async () => {
    render(<BoyProductControls data={product} />, { wrapper });

    await userEvents.click(screen.getByLabelText(/aumenta contador/i));
    await userEvents.click(screen.getByLabelText(/aumenta contador/i));

    expect(screen.getByLabelText(/count product/i)).toHaveTextContent('3');

    await userEvents.click(screen.getByLabelText(/diminui contador/i));

    expect(screen.getByLabelText(/count product/i)).toHaveTextContent('2');
  });

  it('should increment value when is clicked in plus button', async () => {
    render(<BoyProductControls data={product} />, { wrapper });

    await userEvents.click(screen.getByLabelText(/aumenta contador/i));

    expect(screen.getByLabelText(/count product/i)).toHaveTextContent('2');
  });

  it('should saved value when is clicked in adicionar', async () => {
    render(<BoyProductControls data={product} />, { wrapper });

    await userEvents.click(screen.getByLabelText(/aumenta contador/i));
    await userEvents.click(screen.getByLabelText(/aumenta contador/i));

    expect(screen.getByLabelText(/count product/i)).toHaveTextContent('3');

    await userEvents.click(screen.getByRole('button', { name: /adicionar/i }));

    const cartProducts = Array.from({ length: 2 }).map(() => product);
    expect(window.localStorage.getItem(BROWSER_STORAGE_KEYS.CART_PRODUCT)).toBe(
      JSON.stringify({
        cartProducts: [
          {
            data: cartProducts[0],
            quantity: 3,
          },
        ],
        totalPrice: cartProducts[0].price * 3,
      }),
    );
    expect(screen.getByLabelText(/count product/i)).toHaveTextContent('1');
  });
});
