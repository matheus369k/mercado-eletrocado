import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { describe } from 'vitest';
import { CheckedPage } from '.';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/cart/slice';
import userEvent from '@testing-library/user-event';
import { axiosBackEndAPI } from '@/lib/axios';
import axiosMockAdapter from 'axios-mock-adapter';
import { ROUTES_PATHNAMES } from '@/util/const';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => mockNavigate),
}));

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

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider
        store={configureStore({
          reducer: {
            cart: cartReducer,
          },
          preloadedState: { cart: cartProductsCache },
        })}>
        {children}
      </Provider>
    </QueryClientProvider>
  );
};

describe('checked page', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const userEvents = userEvent.setup();
  const userProfileAccountRoute = '/api/users/profile';
  const userProfileAccount = {
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    cep: faker.location.zipCode(),
    id: faker.database.mongodbObjectId(),
  };

  it('should close page when is clicked in X icon', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    render(<CheckedPage />, { wrapper });

    await userEvents.click(screen.getByLabelText(/close checked page/i));

    expect(mockNavigate).toBeCalledWith(ROUTES_PATHNAMES.CAR);
  });
});
