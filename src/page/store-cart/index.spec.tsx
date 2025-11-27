import { render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { describe } from 'vitest';
import { StoreCart } from '.';
import { faker } from '@faker-js/faker/locale/pt_BR';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/cart/slice';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { axiosBackEndAPI } from '@/lib/axios';
import axiosMockAdapter from 'axios-mock-adapter';
import userEvent from '@testing-library/user-event';
import { ROUTES_PATHNAMES } from '@/util/const';

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
const preloadedState = {
  cart: {
    cartProducts: cartProducts.map((product) => ({
      data: product,
      quantity: faker.number.int({ min: 3, max: 5 }),
    })),
    totalPrice: cartProducts.reduce((acc, curr) => acc + curr.price, 0),
  },
};
const queryClient = new QueryClient();

type PreloadedStateType = typeof preloadedState;

const wrapper = ({
  children,
  preloadedState,
}: {
  children: ReactNode;
  preloadedState?: PreloadedStateType;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider
        store={configureStore({
          reducer: {
            cart: cartReducer,
          },
          preloadedState,
        })}>
        {children}
      </Provider>
    </QueryClientProvider>
  );
};

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => mockNavigate),
}));

describe('store cart page', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const userProfileAccountRoute = '/api/users/profile';
  const userEvents = userEvent.setup();
  const userProfileAccount = {
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    cep: faker.location.zipCode(),
    id: faker.database.mongodbObjectId(),
  };

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should render empty component when no have datas', () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    render(<StoreCart />, { wrapper: ({ children }) => wrapper({ children }) });

    screen.findByText(/Adicione produtos ao carrinho.../i);
  });

  it('should render cart product component when have datas', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    render(<StoreCart />, { wrapper: ({ children }) => wrapper({ children, preloadedState }) });

    await screen.findByLabelText(/cart products list/i);
    expect(screen.queryByText(/Adicione produtos ao carrinho.../i)).toBeNull();
  });

  it('should remove cart products when clicked in trash icon in product card', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    render(<StoreCart />, { wrapper: ({ children }) => wrapper({ children, preloadedState }) });

    const product = preloadedState.cart.cartProducts[0];
    await screen.findByLabelText(product.data.model);

    for (let index = 0; index < product.quantity - 1; index++) {
      await userEvents.click(screen.getAllByLabelText(/increment count/i)[0]);
    }
    await userEvents.click(screen.getAllByLabelText(/remove product to cart/i)[0]);

    expect(screen.queryByLabelText(product.data.model)).toBeNull();
  });

  it('should disabled checked button when not have cart products', () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    render(<StoreCart />, { wrapper: ({ children }) => wrapper({ children }) });

    expect(screen.getByText(/Verificar/i)).toBeDisabled();
  });

  it('should redirected login page when call handleRedirectionRoute and not have account', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(401);
    render(<StoreCart />, { wrapper: ({ children }) => wrapper({ children, preloadedState }) });

    await userEvents.click(screen.getByText(/Verificar/i));

    expect(mockNavigate).toBeCalledWith(ROUTES_PATHNAMES.USER_LOGIN);
  });

  it('should redirected checked page when call handleRedirectionRoute and have account', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    render(<StoreCart />, { wrapper: ({ children }) => wrapper({ children, preloadedState }) });

    await userEvents.click(screen.getByText(/Verificar/i));

    expect(mockNavigate).toBeCalledWith(ROUTES_PATHNAMES.CHECKED);
  });
});
