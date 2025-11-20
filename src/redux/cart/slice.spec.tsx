import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { appUseSelector } from '../hook';
import * as reducers from './slice';
import { BROWSER_STORAGE_KEYS } from '@/util/const';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice';

const cartProductsCache = {
  cartProducts: Array.from({ length: 2 }).map(() => {
    return {
      data: {
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
      },
      quantity: faker.number.int({ min: 1, max: 3 }),
    };
  }),
  totalPrice: faker.number.int({ min: 1590, max: 3579 }),
};

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Provider
      store={configureStore({
        reducer: {
          cart: cartReducer,
        },
      })}>
      {children}
    </Provider>
  );
};

const calcProductTotalPrice = (data: typeof cartProductsCache.cartProducts) => {
  return data.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.quantity * currentValue.data.price,
    0,
  );
};

describe('redux cart slice', () => {
  it('should return initial value', () => {
    const { result } = renderHook(
      () => {
        return appUseSelector((state) => state.cart);
      },
      { wrapper },
    );
    expect(result.current).toMatchObject({
      cartProducts: [],
      totalPrice: 0,
    });
  });

  it('should restore old cart when is called restoreCartProducts and have cache saved', () => {
    window.localStorage.setItem(
      BROWSER_STORAGE_KEYS.CART_PRODUCT,
      JSON.stringify(cartProductsCache),
    );
    const { result } = renderHook(
      () => {
        const dispatch = useDispatch();
        dispatch(reducers.restoreCartProducts());

        return appUseSelector((state) => state.cart);
      },
      { wrapper },
    );

    expect(result.current).toMatchObject(cartProductsCache);

    window.localStorage.removeItem(BROWSER_STORAGE_KEYS.CART_PRODUCT);
  });

  it('should add products to cart and saved cache in localStorage when is called addCartProducts', () => {
    const { result } = renderHook(
      () => {
        const dispatch = useDispatch();
        dispatch(reducers.addCartProducts(cartProductsCache.cartProducts));

        return appUseSelector((state) => state.cart);
      },
      { wrapper },
    );

    const cartProducts = {
      cartProducts: cartProductsCache.cartProducts,
      totalPrice: calcProductTotalPrice(cartProductsCache.cartProducts),
    };

    expect(result.current).toMatchObject(cartProducts);
    expect(window.localStorage[BROWSER_STORAGE_KEYS.CART_PRODUCT]).toBe(
      JSON.stringify(cartProducts),
    );

    window.localStorage.removeItem(BROWSER_STORAGE_KEYS.CART_PRODUCT);
  });

  it('should remove products to cart and saved cache in localStorage when is called removeCartProduct', () => {
    const { data, quantity } = cartProductsCache.cartProducts[0];
    const { result } = renderHook(
      () => {
        const dispatch = useDispatch();
        dispatch(reducers.addCartProducts(cartProductsCache.cartProducts));
        dispatch(reducers.removeCartProduct({ id: data._id, quantity }));

        return appUseSelector((state) => state.cart);
      },
      { wrapper },
    );

    const cartProductWithoutSelectedProduct = cartProductsCache.cartProducts.filter(
      (cartProduct) => {
        const cartProductIsDiffOfCurrent = data._id !== cartProduct.data._id;
        if (cartProductIsDiffOfCurrent) {
          return cartProduct;
        }
      },
    );

    expect(result.current).toMatchObject({
      cartProducts: cartProductWithoutSelectedProduct,
      totalPrice: calcProductTotalPrice(cartProductWithoutSelectedProduct),
    });
    expect(window.localStorage[BROWSER_STORAGE_KEYS.CART_PRODUCT]).toBe(
      JSON.stringify({
        cartProducts: cartProductWithoutSelectedProduct,
        totalPrice: calcProductTotalPrice(cartProductWithoutSelectedProduct),
      }),
    );

    window.localStorage.removeItem(BROWSER_STORAGE_KEYS.CART_PRODUCT);
  });

  it('should remove all products to cart and remove cache in localStorage when is called removeAllCartProducts', () => {
    const { result } = renderHook(
      () => {
        const dispatch = useDispatch();
        dispatch(reducers.addCartProducts(cartProductsCache.cartProducts));
        dispatch(reducers.removeAllCartProducts());

        return appUseSelector((state) => state.cart);
      },
      { wrapper },
    );

    expect(result.current).toMatchObject({
      cartProducts: [],
      totalPrice: 0,
    });
    expect(window.localStorage[BROWSER_STORAGE_KEYS.CART_PRODUCT]).toBeUndefined();
  });
});
