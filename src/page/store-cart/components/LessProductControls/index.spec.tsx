import { describe, expect, it } from 'vitest';
import { ProductsLessProvider } from '../../contexts/products-less';
import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { LessProductControls } from '.';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import cartReducer from '@/redux/cart/slice';
import { BROWSER_STORAGE_KEYS } from '@/util/const';
import { faker } from '@faker-js/faker/locale/pt_BR';

const cartProducts = Array.from({ length: 3 }).map(() => ({
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
}));
const totalPrice = cartProducts.reduce((acc, curr) => acc + curr.price * 5, 0);
const cart = {
  cartProducts: cartProducts.map((product) => ({
    data: product,
    quantity: 5,
  })),
  totalPrice,
};

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Provider
      store={configureStore({
        reducer: {
          cart: cartReducer,
        },
        preloadedState: {
          cart,
        },
      })}>
      <ProductsLessProvider>{children}</ProductsLessProvider>
    </Provider>
  );
};

describe('less product controls component', () => {
  const userEvents = userEvent.setup();

  it('no should decrement value when is clicked in minus button and value is 1', async () => {
    render(<LessProductControls _id={cartProducts[0]._id} />, { wrapper });

    await userEvents.click(screen.getByLabelText(/decrement count/i));

    expect(screen.getByLabelText(/count product/i)).toHaveTextContent('1');
  });

  it('should decrement value when is clicked in minus button', async () => {
    render(<LessProductControls _id={cartProducts[0]._id} />, { wrapper });

    await userEvents.click(screen.getByLabelText(/increment count/i));
    await userEvents.click(screen.getByLabelText(/increment count/i));

    expect(screen.getByLabelText(/count product/i)).toHaveTextContent('3');

    await userEvents.click(screen.getByLabelText(/decrement count/i));

    expect(screen.getByLabelText(/count product/i)).toHaveTextContent('2');
  });

  it('should increment value when is clicked in plus button', async () => {
    render(<LessProductControls _id={cartProducts[0]._id} />, { wrapper });

    await userEvents.click(screen.getByLabelText(/increment count/i));

    expect(screen.getByLabelText(/count product/i)).toHaveTextContent('2');
  });

  it('should remove product value when is clicked in trash icon', async () => {
    const productId = cartProducts[0]._id;
    render(<LessProductControls _id={productId} />, { wrapper });

    await userEvents.click(screen.getByLabelText(/increment count/i));
    await userEvents.click(screen.getByLabelText(/increment count/i));

    expect(screen.getByLabelText(/count product/i)).toHaveTextContent('3');

    await userEvents.click(screen.getByRole('button', { name: /remove product to cart/i }));

    expect(window.localStorage.getItem(BROWSER_STORAGE_KEYS.CART_PRODUCT)).toBe(
      JSON.stringify({
        cartProducts: cart.cartProducts.map((product) => {
          const isCurrentProduct = product.data._id === productId;
          if (isCurrentProduct) {
            return { ...product, quantity: product.quantity - 3 };
          }
          return product;
        }),
        totalPrice: cart.cartProducts.reduce((acc, curr) => {
          const isCurrentProduct = curr.data._id === productId;
          if (isCurrentProduct) {
            acc = totalPrice - curr.data.price * 3;
          }
          return acc;
        }, 0),
      }),
    );
    expect(screen.getByLabelText(/count product/i)).toHaveTextContent('1');
  });
});
