import { act, renderHook } from '@testing-library/react';
import { useContext, type ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { ProductLessContext, ProductsLessProvider } from '../contexts/products-less';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import cartReducer from '@/redux/cart/slice';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { useProduct } from './use-less-product';
import { BROWSER_STORAGE_KEYS } from '@/util/const';

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

describe('product custom hook', () => {
  it('should remove products cart when call handleLessProduct', () => {
    const { result } = renderHook(useProduct, { wrapper });

    const productId = cart.cartProducts[0].data._id;
    act(() => result.current.handleAddProductCount(productId));

    expect(result.current.productsLessCount).toEqual(2);

    act(() => result.current.handleLessProduct({ id: productId, quantity: 3 }));

    const cartProductCache = window.localStorage.getItem(BROWSER_STORAGE_KEYS.CART_PRODUCT);
    expect(cartProductCache).not.toBe(JSON.stringify(cart));
    expect(cartProductCache).toBe(
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
    expect(result.current.productsLessCount).toEqual(1);
  });
});
