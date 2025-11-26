import type { ReactNode } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import cartReducer from '@/redux/cart/slice';
import { faker } from '@faker-js/faker/locale/pt_BR';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { axiosBackEndAPI } from '@/lib/axios';
import axiosMockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
import { ProductPage } from '.';
import { ROUTES_PATHNAMES } from '@/util/const';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
    },
  },
});
const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider
        store={configureStore({
          reducer: {
            cart: cartReducer,
          },
        })}>
        {children}
      </Provider>
    </QueryClientProvider>
  );
};

const productId = faker.database.mongodbObjectId();

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => mockNavigate),
  useLocation: vi.fn(() => ({
    pathname: ROUTES_PATHNAMES.PRODUCT.replace(':productId', productId),
  })),
}));

describe('product page', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const userEvents = userEvent.setup();
  const productRoute = `/api/products?productId=${productId}`;
  const product = {
    _id: productId,
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

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should back old page when is clicked in X icon', async () => {
    const spyHistoryBack = vi.spyOn(window.history, 'back');
    axiosFetch.onGet(productRoute).reply(200, product);
    render(<ProductPage />, { wrapper });

    await userEvents.click(await screen.findByLabelText(/close product page/i));

    expect(spyHistoryBack).toBeCalled();
  });
});
