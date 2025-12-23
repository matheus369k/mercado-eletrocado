import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { afterEach, describe, expect, it, vi } from 'vitest';
import cartReducer from '@/redux/cart/slice';
import { BROWSER_STORAGE_KEYS } from '@/util/const';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { CartNavbarItem } from '.';
import { render, screen } from '@testing-library/react';
import { beforeEach } from 'vitest';
import { HashRouter, Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider
        store={configureStore({
          reducer: {
            cart: cartReducer,
          },
        })}>
        <HashRouter>
          <Routes>
            <Route path="*" element={children} />
          </Routes>
        </HashRouter>
      </Provider>
    </QueryClientProvider>
  );
};

describe('cart navbar item component', () => {
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

  beforeEach(() => {
    window.localStorage.setItem(
      BROWSER_STORAGE_KEYS.CART_PRODUCT,
      JSON.stringify(cartProductsCache),
    );
  });

  afterEach(() => {
    window.localStorage.removeItem(BROWSER_STORAGE_KEYS.CART_PRODUCT);
    queryClient.clear();
  });

  it('should render component at the mobile mode ', () => {
    render(<CartNavbarItem device="mobile" />, {
      wrapper,
    });

    screen.getByLabelText(/dropdown navbarMenu item/i);
  });

  it('should render component at the desktop mode ', () => {
    render(<CartNavbarItem device="desktop" />, {
      wrapper,
    });

    expect(screen.queryByLabelText(/dropdown navbarMenu item/i)).toBeNull();
  });

  it('should restore carts datas when is user already account and have cache saved', async () => {
    render(<CartNavbarItem device="desktop" hasAuthorization={true} />, {
      wrapper,
    });

    await screen.findByLabelText(/carts count/i);
  });

  it('no should restore carts datas when user not have account', async () => {
    render(<CartNavbarItem device="desktop" />, {
      wrapper,
    });

    expect(screen.queryByLabelText(/carts count/i)).toBeNull();
  });
});
