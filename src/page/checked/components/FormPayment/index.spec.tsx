import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { afterEach, describe, expect, it } from 'vitest';
import cartReducer from '@/redux/cart/slice';
import { vi } from 'vitest';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { render, screen } from '@testing-library/react';
import { FormPayment } from '.';
import userEvent from '@testing-library/user-event';
import { axiosBackEndAPI } from '@/lib/axios';
import axiosMockAdapter from 'axios-mock-adapter';
import { BROWSER_STORAGE_KEYS, ROUTES_PATHNAMES } from '@/util/const';
import { toast } from 'react-toastify';

vi.mock('react-toastify');

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

describe('form payment component', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const userEvents = userEvent.setup();

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('no should submitted shopping when is not selected payment type', async () => {
    render(<FormPayment />, { wrapper });

    const submittedSoppingButton = screen.getByRole('button', { name: /Confirmar/i });
    await userEvents.click(submittedSoppingButton);

    expect(axiosFetch.history[0]).toBeUndefined();
  });

  it('should update state for payment when clicked on the options', async () => {
    render(<FormPayment />, { wrapper });

    await userEvents.click(screen.getByLabelText(/credit card option/i));

    expect(screen.getByLabelText(/payment content/)).toHaveAttribute(
      'data-payment-type',
      'credit-card',
    );

    await userEvents.click(screen.getByLabelText(/debit card option/i));

    expect(screen.getByLabelText(/payment content/)).toHaveAttribute(
      'data-payment-type',
      'debit-card',
    );

    await userEvents.click(screen.getByLabelText(/pix option/i));

    expect(screen.getByLabelText(/payment content/)).toHaveAttribute('data-payment-type', 'pix');

    await userEvents.click(screen.getByLabelText(/ticket option/i));

    expect(screen.getByLabelText(/payment content/)).toHaveAttribute('data-payment-type', 'ticket');
  });

  it('should submitted data', async () => {
    window.localStorage.setItem(
      BROWSER_STORAGE_KEYS.CART_PRODUCT,
      JSON.stringify(cartProductsCache),
    );
    axiosFetch.onPost('/api/products/delivery').reply(201);
    render(<FormPayment />, { wrapper });

    await userEvents.click(screen.getByLabelText(/credit card option/i));
    await userEvents.click(screen.getByRole('button', { name: /Confirmar/i }));

    expect(screen.getByLabelText(/payment content/)).toHaveAttribute(
      'data-payment-type',
      'credit-card',
    );
    expect(axiosFetch.history[0].url).toBe('/api/products/delivery');
    expect(window.localStorage.getItem(BROWSER_STORAGE_KEYS.CART_PRODUCT)).toBeNull();
    expect(mockNavigate).toBeCalledWith(ROUTES_PATHNAMES.HOME);
    expect(toast.success).toBeCalled();
  });
});
