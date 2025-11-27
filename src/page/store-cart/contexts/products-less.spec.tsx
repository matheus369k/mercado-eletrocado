import { act, renderHook } from '@testing-library/react';
import { useContext, type ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { ProductLessContext, ProductsLessProvider } from './products-less';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import cartReducer from '@/redux/cart/slice';
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
const totalPrice = cartProducts.reduce((acc, curr) => acc + curr.price, 0);

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Provider
      store={configureStore({
        reducer: {
          cart: cartReducer,
        },
        preloadedState: {
          cart: {
            cartProducts: cartProducts.map((product) => ({
              data: product,
              quantity: faker.number.int({ min: 3, max: 5 }),
            })),
            totalPrice,
          },
        },
      })}>
      <ProductsLessProvider>{children}</ProductsLessProvider>
    </Provider>
  );
};

describe('product less context', () => {
  it('should returned productsLessCount as initial value', () => {
    const { result } = renderHook(() => useContext(ProductLessContext), { wrapper });

    expect(result.current.productsLessCount).toEqual(1);
  });

  it('no should less value when is equal 1', () => {
    const { result } = renderHook(() => useContext(ProductLessContext), { wrapper });

    expect(result.current.productsLessCount).toEqual(1);

    act(() => result.current.handleRemoveProductCount());

    expect(result.current.productsLessCount).toEqual(1);
  });

  it('should increment value when call handleAddProductCount', () => {
    const { result } = renderHook(() => useContext(ProductLessContext), { wrapper });

    expect(result.current.productsLessCount).toEqual(1);

    act(() => result.current.handleAddProductCount(cartProducts[0]._id));

    expect(result.current.productsLessCount).toEqual(2);
  });

  it('should decrement value when call handleRemoveProductCount', () => {
    const { result } = renderHook(() => useContext(ProductLessContext), { wrapper });

    expect(result.current.productsLessCount).toEqual(1);

    const productId = cartProducts[0]._id;
    act(() => result.current.handleAddProductCount(productId));

    expect(result.current.productsLessCount).toEqual(2);

    act(() => result.current.handleAddProductCount(productId));

    expect(result.current.productsLessCount).toEqual(3);

    act(() => result.current.handleRemoveProductCount());

    expect(result.current.productsLessCount).toEqual(2);
  });

  it('should reset value to initial state when is call handleResetProductsCount', () => {
    const { result } = renderHook(() => useContext(ProductLessContext), { wrapper });

    expect(result.current.productsLessCount).toEqual(1);

    const productId = cartProducts[0]._id;
    act(() => result.current.handleAddProductCount(productId));

    expect(result.current.productsLessCount).toEqual(2);

    act(() => result.current.handleAddProductCount(productId));

    expect(result.current.productsLessCount).toEqual(3);

    act(() => result.current.handleResetProductsCount());

    expect(result.current.productsLessCount).toEqual(1);
  });
});
